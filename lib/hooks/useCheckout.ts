"use client";

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ui/use-toast';
import { PayUPaymentRequest } from '@/types/payu';

interface CheckoutData {
  // Customer information
  fullName: string;
  email: string;
  phone: string;
  
  // Address information
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  sameAsShipping: boolean;
  
  // Order information
  orderNotes?: string;
}

interface PaymentData {
  paymentUrl: string;
  formData: PayUPaymentRequest;
  orderId: string;
  txnid: string;
  amount: number;
}

interface CheckoutState {
  isProcessing: boolean;
  currentStep: 'customer' | 'payment' | 'processing';
  error: string | null;
  userId: string | null;
  userType: 'guest' | 'registered' | null;
  orderId: string | null;
  paymentData: PaymentData | null;
}

export function useCheckout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();
  
  const [state, setState] = useState<CheckoutState>({
    isProcessing: false,
    currentStep: 'customer',
    error: null,
    userId: null,
    userType: null,
    orderId: null,
    paymentData: null,
  });

  const calculateOrderTotal = () => {
    const cartTotal = totalPrice();
    const shippingCost = cartTotal >= 500 ? 0 : 50;
    return {
      subtotal: cartTotal,
      shippingCost,
      total: cartTotal + shippingCost,
    };
  };

  const createGuestUser = async (data: CheckoutData): Promise<{id: string, type: 'guest' | 'registered'}> => {
    const response = await fetch('/api/users/create-or-get-guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        shippingAddress: data.shippingAddress,
        billingAddress: data.sameAsShipping ? data.shippingAddress : data.billingAddress,
        sameAsShipping: data.sameAsShipping,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }

    const result = await response.json();
    return {
      id: result.user.id,
      type: result.user.userType || 'guest'
    };
  };

  const createOrder = async (userId: string, userType: 'guest' | 'registered', data: CheckoutData): Promise<string> => {
    const orderTotals = calculateOrderTotal();
    
    // Use the userType parameter directly instead of relying on state
    const isGuestUser = userType === 'guest';
    
    const orderData = {
      // Use guestUserId if it's a guest user, otherwise use userId
      ...(isGuestUser ? { guestUserId: userId } : { userId }),
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      customerDetails: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
      },
      shippingAddress: data.shippingAddress,
      billingAddress: data.sameAsShipping ? data.shippingAddress : data.billingAddress,
      shippingCost: orderTotals.shippingCost,
      taxAmount: 0,
      discountAmount: 0,
      orderNotes: data.orderNotes,
    };

    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create order');
    }

    const result = await response.json();
    return result.order.id;
  };

  const initiatePayment = async (orderId: string): Promise<PaymentData> => {
    const response = await fetch('/api/payu/initiate-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to initiate payment');
    }

    const result = await response.json();
    return result.payment;
  };

  const processCheckout = async (data: CheckoutData) => {
    try {
      setState(prev => ({ 
        ...prev, 
        isProcessing: true, 
        error: null, 
        currentStep: 'processing' 
      }));

      // Step 1: Create or get guest user
      addToast({
        title: "Processing checkout...",
        description: "Creating user account",
        type: "info",
      });

      const userResult = await createGuestUser(data);
      setState(prev => ({ 
        ...prev, 
        userId: userResult.id,
        userType: userResult.type 
      }));

      // Step 2: Create order
      addToast({
        title: "Creating order...",
        description: "Processing your order details",
        type: "info",
      });

      const orderId = await createOrder(userResult.id, userResult.type, data);
      setState(prev => ({ ...prev, orderId }));

      // Step 3: Initiate payment
      addToast({
        title: "Preparing payment...",
        description: "Redirecting to payment gateway",
        type: "info",
      });

      const paymentData = await initiatePayment(orderId);
      setState(prev => ({ 
        ...prev, 
        paymentData, 
        currentStep: 'payment',
        isProcessing: false 
      }));

      // Success toast
      addToast({
        title: "Redirecting to payment",
        description: "You will be redirected to PayU payment gateway",
        type: "success",
      });

    } catch (error) {
      console.error('Checkout error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: errorMessage,
        currentStep: 'customer'
      }));

      addToast({
        title: "Checkout failed",
        description: errorMessage,
        type: "error",
        action: {
          label: "Try Again",
          onClick: () => setState(prev => ({ ...prev, error: null }))
        }
      });
    }
  };

  const resetCheckout = () => {
    setState({
      isProcessing: false,
      currentStep: 'customer',
      error: null,
      userId: null,
      userType: null,
      orderId: null,
      paymentData: null,
    });
  };

  const goBackToCustomerDetails = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'customer',
      error: null,
    }));
  };

  const onPaymentSubmit = () => {
    // Store cart data in localStorage before redirect (in case user comes back)
    if (typeof window !== 'undefined') {
      localStorage.setItem('rajawadu-checkout-data', JSON.stringify({
        orderId: state.orderId,
        userId: state.userId,
        timestamp: Date.now(),
      }));
    }
  };

  return {
    // State
    ...state,
    
    // Computed values
    orderTotals: calculateOrderTotal(),
    hasItems: items.length > 0,
    
    // Actions
    processCheckout,
    resetCheckout,
    goBackToCustomerDetails,
    onPaymentSubmit,
    
    // Cart actions
    clearCart,
  };
} 