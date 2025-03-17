# Toast Notification Implementation Guide

This document outlines our approach to implementing toast notifications throughout the Raja Wadu e-commerce platform.

## Toast Types & Usage Guidelines

### Success Toasts

- **Color Scheme**: Green (#10B981)
- **Icon**: Checkmark
- **Use for**: Successful actions (item added to cart, order placed, profile updated)
- **Duration**: 3 seconds
- **Example**: "Item successfully added to cart"

### Error Toasts

- **Color Scheme**: Red (#EF4444)
- **Icon**: Alert triangle
- **Use for**: Failed actions, errors (payment failed, item out of stock)
- **Duration**: 5 seconds (user might need time to read error)
- **Example**: "Payment processing failed. Please try again."

### Warning Toasts

- **Color Scheme**: Amber (#F59E0B)
- **Icon**: Warning
- **Use for**: Important notices that require attention but aren't errors
- **Duration**: 4 seconds
- **Example**: "Only 2 items left in stock"

### Info Toasts

- **Color Scheme**: Blue (#3B82F6)
- **Icon**: Information
- **Use for**: Neutral information, updates, tips
- **Duration**: 3 seconds
- **Example**: "Your order is being processed"

## Required Toast Implementations (Page by Page)

### Homepage

- [ ] Product added to wishlist
- [ ] Newsletter subscription success/error
- [ ] Quick add to cart

### Product Listing

- [ ] Product added to cart
- [ ] Filter applied notification
- [ ] Sort applied notification

### Product Detail

- [ ] Product added to cart
- [ ] Product added to wishlist
- [ ] Product out of stock
- [ ] Variant selection required
- [ ] Product notification set up

### Cart

- [ ] Item quantity updated
- [ ] Item removed from cart
- [ ] Coupon applied/invalid
- [ ] Cart saved
- [ ] Item moved to wishlist

### Checkout

- [ ] Address validation issues
- [ ] Payment processing status
- [ ] Order placed successfully
- [ ] Checkout error notification
- [ ] Required fields missing

### User Account

- [ ] Profile updated
- [ ] Password changed
- [ ] Address added/modified/deleted
- [ ] Login/logout notifications
- [ ] Account verification notices

## Technical Implementation

### Component Structure

```typescript
interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Toast Context API

```typescript
interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}
```

### Function Usage Examples

```typescript
// Success toast
addToast({
  title: "Success!",
  description: "Item added to your cart",
  type: "success",
});

// Error toast with action
addToast({
  title: "Error",
  description: "Could not process payment",
  type: "error",
  action: {
    label: "Try Again",
    onClick: () => processPayment(),
  },
});
```

## Accessibility Considerations

- [ ] Ensure toasts are announced by screen readers using aria-live
- [ ] Provide sufficient color contrast (WCAG AA compliance)
- [ ] Allow keyboard dismissal (Escape key)
- [ ] Focus management consideration for action buttons
- [ ] Consider reduced motion preferences
- [ ] Allow configuration for increased duration for users who need more time

## Mobile Considerations

- [ ] Position at the bottom on mobile devices (easier thumb access)
- [ ] Increase touch target size for dismiss button
- [ ] Adjust width for smaller screens
- [ ] Test on various mobile devices and browsers
- [ ] Consider toast stacking behavior on small screens

## Implementation Checklist

- [ ] Create base Toast component using Shadcn UI toast primitive
- [ ] Implement ToastProvider context
- [ ] Create useToast hook for easy access
- [ ] Add animation for entry/exit
- [ ] Implement automatic duration-based dismissal
- [ ] Add manual dismiss capability
- [ ] Test across all supported browsers
- [ ] Implement proper z-index management
- [ ] Ensure toasts appear above all other UI elements
- [ ] Add documentation for the team
