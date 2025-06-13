import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { z } from 'zod';
import { sanitizeInput, validateEmail, validatePhone } from '@/lib/api/payu/hash';

// Input validation schema
const createGuestUserSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  shippingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipcode: z.string().min(1, 'ZIP code is required'),
    country: z.string().default('India'),
  }).optional(),
  billingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipcode: z.string().min(1, 'ZIP code is required'),
    country: z.string().default('India'),
  }).optional(),
  sameAsShipping: z.boolean().default(true),
});

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  // Try various headers for IP detection
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return '127.0.0.1'; // Fallback
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = createGuestUserSchema.parse(body);

    // Additional validation
    if (!validateEmail(validatedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!validatePhone(validatedData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeInput(validatedData.fullName),
      email: sanitizeInput(validatedData.email),
      phone: validatedData.phone.replace(/\D/g, ''), // Keep only digits
      shippingAddress: validatedData.shippingAddress ? {
        street: sanitizeInput(validatedData.shippingAddress.street),
        city: sanitizeInput(validatedData.shippingAddress.city),
        state: sanitizeInput(validatedData.shippingAddress.state),
        zipcode: sanitizeInput(validatedData.shippingAddress.zipcode),
        country: sanitizeInput(validatedData.shippingAddress.country),
      } : null,
      billingAddress: validatedData.billingAddress ? {
        street: sanitizeInput(validatedData.billingAddress.street),
        city: sanitizeInput(validatedData.billingAddress.city),
        state: sanitizeInput(validatedData.billingAddress.state),
        zipcode: sanitizeInput(validatedData.billingAddress.zipcode),
        country: sanitizeInput(validatedData.billingAddress.country),
      } : null,
    };

    // If billing same as shipping, copy shipping address
    if (validatedData.sameAsShipping && sanitizedData.shippingAddress) {
      sanitizedData.billingAddress = { ...sanitizedData.shippingAddress };
    }

    const supabase = await createClient();
    const clientIP = getClientIP(request);

    // Check if guest user already exists with this email (recent session)
    const { data: existingGuestUser, error: fetchError } = await supabase
      .rpc('get_guest_user_by_email_recent', {
        p_email: sanitizedData.email,
        p_hours_limit: 24
      });

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing guest user:', fetchError);
    }

    let guestUserResult;

    if (existingGuestUser && existingGuestUser.length > 0 && !existingGuestUser[0].is_expired) {
      // Update existing valid session
      const sessionId = existingGuestUser[0].guest_session_id;
      
      const { error: updateError } = await supabase
        .rpc('update_guest_user_secure', {
          p_session_id: sessionId,
          p_full_name: sanitizedData.fullName,
          p_phone: sanitizedData.phone,
          p_shipping_address: sanitizedData.shippingAddress,
          p_billing_address: sanitizedData.billingAddress,
        });

      if (updateError) {
        console.error('Error updating guest user:', updateError);
        return NextResponse.json(
          { error: 'Failed to update guest user information' },
          { status: 500 }
        );
      }

      guestUserResult = {
        user_id: existingGuestUser[0].user_id,
        session_id: sessionId,
        expires_at: existingGuestUser[0].expires_at,
      };
    } else {
      // Create new secure guest user
      const { data: createResult, error: createError } = await supabase
        .rpc('create_guest_user_secure_v2', {
          p_full_name: sanitizedData.fullName,
          p_email: sanitizedData.email,
          p_phone: sanitizedData.phone,
          p_shipping_address: sanitizedData.shippingAddress,
          p_billing_address: sanitizedData.billingAddress,
          p_client_ip: clientIP,
        });

      if (createError) {
        console.error('Error creating guest user:', createError);
        return NextResponse.json(
          { 
            error: 'Failed to create guest user',
            details: createError.message 
          },
          { status: 500 }
        );
      }

      guestUserResult = createResult[0];
    }

    // Set secure session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: guestUserResult.user_id,
        fullName: sanitizedData.fullName,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        shippingAddress: sanitizedData.shippingAddress,
        billingAddress: sanitizedData.billingAddress,
        isGuest: true,
        guestSessionId: guestUserResult.session_id,
        userType: 'guest',
        sessionExpiresAt: guestUserResult.expires_at,
      },
    });

    // Set secure httpOnly cookie with session ID
    response.cookies.set('guest-session-id', guestUserResult.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error in create-or-get-guest API:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors.map((e: z.ZodIssue) => ({ path: e.path, message: e.message }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method to retrieve guest user by session (secure)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionIdFromQuery = searchParams.get('sessionId');
    
    // Try to get session ID from secure cookie first, then query param
    const sessionIdFromCookie = request.cookies.get('guest-session-id')?.value;
    const sessionId = sessionIdFromCookie || sessionIdFromQuery;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: guestUserData, error } = await supabase
      .rpc('get_guest_user_secure', {
        p_session_id: sessionId
      });

    if (error) {
      console.error('Error fetching guest user:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    if (!guestUserData || guestUserData.length === 0) {
      return NextResponse.json(
        { error: 'Guest user not found' },
        { status: 404 }
      );
    }

    const userData = guestUserData[0];

    if (userData.is_expired) {
      return NextResponse.json(
        { error: 'Guest session has expired' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userData.user_id,
        fullName: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        shippingAddress: userData.billing_address,
        billingAddress: userData.shipping_address,
        isGuest: true,
        guestSessionId: sessionId,
        createdAt: userData.created_at,
        expiresAt: userData.expires_at,
        userType: 'guest',
      },
    });

  } catch (error) {
    console.error('Error in get guest user API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 