# Project Configurations

## Current Status

### ✅ Configured

- Next.js
- Shadcn UI
- Project Structure
- Supabase Setup
- Basic Layout Structure
- Homepage UI
- Static Pages (Privacy, Terms, etc.)

### 🔄 In Progress

- Theme Configuration
- Component Library
- Database Schema Implementation
- Product Pages Enhancement
- Cart Functionality

### ⏳ Pending

- Product Management System
- Shopping Cart Enhancements
- Checkout Process
- Order Management
- Analytics Integration

## Supabase Configuration Steps

1. Create Supabase Client Utility
2. Implement Database Schema
3. Configure Storage for Product Images
4. Set up Row Level Security Policies

## Required Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# General
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (Future)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

## Supabase Setup

### 1. Installation

```bash
# Install required Supabase packages
npm install @supabase/supabase-js
```

### 2. Environment Variables

Create or update `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Supabase Client Setup

Create `utils/supabase/client.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 4. Server-Side Setup

Create `utils/supabase/server.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
```

## Pending Configurations

### 1. Product Management

- [ ] Set up product CRUD operations
- [ ] Configure image upload and storage
- [ ] Implement product search and filtering

### 2. Storage

- [ ] Configure storage buckets for product images
- [ ] Set up storage policies

### 3. Database Policies

- [ ] Configure RLS policies for:
  - Products table
  - Orders table
  - Categories table

### 4. API Routes

- [ ] Set up API routes for:
  - Product management
  - Order processing
  - Cart operations

## Third-Party Services (To Be Configured)

### 1. Stripe

- [ ] Install dependencies
- [ ] Set up webhook endpoints
- [ ] Configure payment flow

### 2. Zeptomail

- [ ] Install SDK
- [ ] Set up email templates
- [ ] Configure transactional emails

### 3. Google Analytics

- [ ] Add tracking code
- [ ] Set up event tracking
- [ ] Configure e-commerce tracking

## Development Guidelines

### 1. File Structure

```
├── app/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── shared/
├── utils/
│   └── supabase/
├── lib/
└── public/
```

### 2. Styling Guidelines

- Use Tailwind CSS for styling
- Follow the design system from Shadcn UI
- Implement custom theme variables for the funky, cheerful design
- Use Framer Motion for animations

### 3. Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use proper component organization
- Implement proper error handling
