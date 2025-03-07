# Supabase Integration Documentation

This document provides detailed information about how Supabase is integrated into our application and how to work with it.

## Overview

We use Supabase as our backend database and authentication provider. The integration includes:

1. Database tables for products, categories, users, orders, and order items
2. API layer to interact with the database
3. Authentication for user management
4. Storage for product images (planned)

## Environment Setup

Make sure your `.env.local` file has the following Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema

The database consists of the following tables:

1. **categories**

   - id (UUID)
   - name (varchar)
   - slug (varchar)

2. **products**

   - id (UUID)
   - name (varchar)
   - slug (varchar)
   - description (text)
   - price (numeric)
   - category_id (UUID) - Foreign key to categories.id
   - inventory (int)
   - images (\_text) - Array of image URLs
   - featured (bool)
   - created_at (timestamp)

3. **users**

   - id (UUID) - Connected to auth.users.id
   - full_name (varchar)
   - avatar_url (text)
   - billing_address (jsonb)
   - shipping_address (jsonb)
   - created_at (timestamp)

4. **orders**

   - id (UUID)
   - user_id (UUID) - Foreign key to users.id
   - total (numeric)
   - status (varchar)
   - payment_id (text)
   - created_at (timestamp)

5. **order_items**
   - id (UUID)
   - order_id (UUID) - Foreign key to orders.id
   - product_id (UUID) - Foreign key to products.id
   - quantity (int)
   - price (numeric)

## API Layer Structure

The API layer is organized as follows:

### Client Setup

We have two client configurations:

1. **Server-side Client** (`lib/supabase/server.ts`):

   - Used in server components or API routes
   - Uses cookies for authentication

2. **Client-side Client** (`lib/supabase/client.ts`):
   - Used in client components
   - Maintains session client-side

### API Functions

All API functions are organized by entity in the `lib/api` directory:

1. **Products API** (`lib/api/products.ts`):

   - `getProducts()` - Get all products
   - `getProductBySlug(slug)` - Get a product by slug
   - `getFeaturedProducts()` - Get featured products
   - `getProductsByCategory(categoryId)` - Filter products by category
   - `searchProducts(query)` - Search products by text

2. **Categories API** (`lib/api/categories.ts`):

   - `getCategories()` - Get all categories
   - `getCategoryBySlug(slug)` - Get a category by slug
   - `getCategoryById(id)` - Get a category by ID

3. **Orders API** (`lib/api/orders.ts`):

   - `getOrders()` - Get all orders
   - `getOrderById(id)` - Get an order by ID with all items
   - `getOrdersByUser(userId)` - Get orders for a user
   - `createOrder(userId, items, total)` - Create a new order
   - `updateOrderStatus(orderId, status)` - Update order status

4. **Users API** (`lib/api/users.ts`):
   - `getUserById(userId)` - Get user profile
   - `upsertUser(userId, userData)` - Create or update user
   - `updateBillingAddress(userId, address)` - Update billing address
   - `updateShippingAddress(userId, address)` - Update shipping address

## Authentication Integration (To Be Implemented)

We plan to implement Supabase Auth for user management:

1. **Sign Up Flow**:

   - Collect user information
   - Create auth account
   - Create user profile in users table

2. **Sign In Flow**:

   - Authenticate with Supabase Auth
   - Manage session with cookies

3. **User Profile Management**:
   - Update profile information
   - Manage addresses

## Seeding Data

We've created a seed script (`seed.sql`) that can be executed in the Supabase SQL Editor to populate the database with initial data. This includes:

- Categories for product classification
- Sample products with details and images
- Sample users and orders for testing

## Using in Components

### Server Components

```tsx
// Example: Fetching products in a server component
import { getProducts } from "@/lib/api/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return <div>{/* Render products */}</div>;
}
```

### Client Components

```tsx
"use client";

import { useState, useEffect } from "react";
import { getProductsByCategory } from "@/lib/api/products";

export function ProductFilter({ categoryId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const categoryProducts = await getProductsByCategory(categoryId);
      setProducts(categoryProducts);
    }

    loadProducts();
  }, [categoryId]);

  return <div>{/* Render filtered products */}</div>;
}
```

## Next Steps

Future enhancements to the Supabase integration:

1. **Authentication Implementation**:

   - Complete sign up, sign in, sign out flows
   - Protected routes for user-specific pages

2. **Admin Panel**:

   - CRUD operations for products and categories
   - Order management

3. **Image Storage**:

   - Upload product images to Supabase Storage
   - Implement proper image management

4. **Real-time Updates**:

   - Implement Supabase realtime subscriptions for order status

5. **Optimizations**:
   - Implement caching strategies
   - Add pagination for large data sets

## Troubleshooting

Common issues and solutions:

1. **Authentication Issues**:

   - Ensure cookies are properly configured
   - Check server vs. client usage of Supabase client

2. **Database Errors**:

   - Verify that all columns match expected types
   - Check foreign key constraints

3. **Performance Concerns**:
   - Use indexes for frequently queried columns
   - Optimize joins and select only needed data
