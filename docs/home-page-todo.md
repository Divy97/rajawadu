# Home Page Optimization To-Do List

## SEO Optimization

- [x] Enhanced metadata with proper title, description, and keywords
- [x] Added Open Graph metadata for social sharing
- [x] Added Twitter card metadata
- [x] Set up robots metadata
- [x] Add structured data (JSON-LD) for organization and website
- [ ] **URGENT**: Create OG image file at `/public/images/og-image.jpg` (1200x630px) for social sharing
- [ ] Need to update values in home page.tsc JSONLD schema

## Image Optimization

- [x] Optimize hero image implementation using Next.js Image component with priority prop
- [ ] **URGENT**: Create hero image files:
  - [ ] `/public/images/hero-product.webp` - Main product showcase image
  - [ ] `/public/images/spice-fennel.webp` - Decorative spice image
  - [ ] `/public/images/spice-cardamom.webp` - Decorative spice image
  - [ ] `/public/images/logo.png` - Company logo (referenced in structured data)
- [ ] Implement proper image dimensions and responsive sizes
- [ ] Add WebP format for all images with fallbacks
- [ ] Ensure all images have descriptive alt text

## Performance Optimization

- [ ] Implement lazy loading for below-the-fold content
- [ ] Convert inline SVG patterns to optimized image files
- [ ] Optimize font loading strategy
- [ ] Reduce JavaScript bundle size

## Accessibility

- [x] Ensure proper contrast ratios for all text
- [x] Add proper ARIA labels for interactive elements (newsletter form)
- [x] Implement keyboard navigation for interactive elements (newsletter form)
- [x] Ensure proper heading hierarchy throughout the page
- [x] Add screen reader text and improve form accessibility

## Toast Notifications

- [x] Implement toast notification for newsletter subscription
- [x] Add success/error toast for user actions

## Error Handling

- [x] Add error state for newsletter form submission
- [x] Implement error boundary for product grid
