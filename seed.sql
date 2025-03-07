-- Seed data for categories table
INSERT INTO categories (id, name, slug)
VALUES
  ('89679ec7-9957-423d-bbed-942df8a4a43e', 'Sweet', 'sweet'),
  ('ee08265c-a555-462c-8c3d-7bb8a329af34', 'Spicy', 'spicy'),
  ('0b7463ed-dea4-4917-9a2a-779a565b6bf0', 'Tangy', 'tangy'),
  ('e44ea4dd-a51c-4807-895a-f5005539f86d', 'Mixed', 'mixed');

-- Seed data for products table
INSERT INTO products (id, name, slug, description, price, category_id, inventory, images, featured, created_at)
VALUES
  (
    '7b739c11-3ab5-46db-9dd8-2d5e72f396fe',
    'Sweet Fennel Mukhwas',
    'sweet-fennel-mukhwas',
    'A traditional sweet fennel-based mouth freshener with colorful sugar coated fennel seeds. Perfect after a hearty meal or as a sweet treat anytime. Made with high-quality ingredients following our family''s century-old recipe.',
    129.99,
    '89679ec7-9957-423d-bbed-942df8a4a43e',
    50,
    ARRAY['/images/products/mukhwas-1-1.jpg', '/images/products/mukhwas-1-2.jpg', '/images/products/mukhwas-1-3.jpg'],
    TRUE,
    '2023-01-15T10:00:00Z'
  ),
  (
    'f41e4b47-197f-47ec-ba58-e5a9c884db94',
    'Spicy Saunf Delight',
    'spicy-saunf-delight',
    'A tantalizing blend of sweet and spicy fennel seeds with a hint of mint. This mouth freshener is perfect for those who love a bit of spice in their life. Helps in digestion and freshens breath instantly.',
    149.99,
    'ee08265c-a555-462c-8c3d-7bb8a329af34',
    35,
    ARRAY['/images/products/mukhwas-2-1.jpg', '/images/products/mukhwas-2-2.jpg'],
    FALSE,
    '2023-01-20T11:00:00Z'
  ),
  (
    '4d7c89a5-e656-43c3-888f-d2263e3d7e5c',
    'Tangy Imli Mixture',
    'tangy-imli-mixture',
    'A unique blend of sweet and tangy flavors featuring tamarind, fennel and sesame seeds. This mouth freshener provides a burst of tangy goodness while aiding digestion. A perfect balance of traditional ingredients with modern flavors.',
    169.99,
    '0b7463ed-dea4-4917-9a2a-779a565b6bf0',
    40,
    ARRAY['/images/products/mukhwas-3-1.jpg', '/images/products/mukhwas-3-2.jpg'],
    TRUE,
    '2023-02-05T09:30:00Z'
  ),
  (
    '5e685984-6a0b-461c-8f3d-9a53a4cb91c2',
    'Royal Mix Mukhwas',
    'royal-mix-mukhwas',
    'Our premium mixture features a blend of fennel, sesame, anise and coconut flakes. Enjoyed by royalty for generations, this exquisite mukhwas is now available for everyone. Perfect for special occasions and celebrations.',
    199.99,
    'e44ea4dd-a51c-4807-895a-f5005539f86d',
    25,
    ARRAY['/images/products/mukhwas-4-1.jpg', '/images/products/mukhwas-4-2.jpg'],
    FALSE,
    '2023-02-15T14:00:00Z'
  ),
  (
    '646797ab-c3d5-4d9f-bb05-684d1ff22ee7',
    'Sweet Rose Delight',
    'sweet-rose-delight',
    'A delicate blend of rose-flavored fennel seeds with coconut flakes and cardamom. This aromatic mukhwas provides a floral sweetness that lingers pleasantly. Made using traditional techniques passed down through generations.',
    159.99,
    '89679ec7-9957-423d-bbed-942df8a4a43e',
    30,
    ARRAY['/images/products/mukhwas-5-1.jpg', '/images/products/mukhwas-5-2.jpg'],
    FALSE,
    '2023-03-01T10:30:00Z'
  ),
  (
    'f897e142-ed4d-4e47-8e72-ea0bda13996b',
    'Fiery Fennel Blast',
    'fiery-fennel-blast',
    'For the spice lovers! This mukhwas combines the heat of red chili with the coolness of fennel for an explosive taste experience. A bold choice that sets us apart from typical sweet varieties. Excellent for stimulating appetite.',
    149.99,
    'ee08265c-a555-462c-8c3d-7bb8a329af34',
    20,
    ARRAY['/images/products/mukhwas-6-1.jpg', '/images/products/mukhwas-6-2.jpg'],
    TRUE,
    '2023-03-15T12:00:00Z'
  ),
  (
    '2622ae91-bd82-4f42-9fad-d089d95dc2c3',
    'Lemon Zest Freshness',
    'lemon-zest-freshness',
    'A refreshing blend of lemon-flavored seeds and dried mint leaves. This citrus-infused mukhwas is perfect for a refreshing after-meal experience. The tangy lemon flavor combined with cooling mint provides ultimate freshness.',
    139.99,
    '0b7463ed-dea4-4917-9a2a-779a565b6bf0',
    45,
    ARRAY['/images/products/mukhwas-7-1.jpg', '/images/products/mukhwas-7-2.jpg'],
    FALSE,
    '2023-04-01T15:30:00Z'
  ),
  (
    '7420b357-e70a-4c9d-8dc7-c36e96107c8a',
    'Festive Assortment Pack',
    'festive-assortment-pack',
    'A premium collection of our four best-selling mukhwas varieties in one elegant gift box. Perfect for festivities, celebrations, or as a thoughtful gift. Experience the full spectrum of traditional flavors with this special assortment.',
    399.99,
    'e44ea4dd-a51c-4807-895a-f5005539f86d',
    15,
    ARRAY['/images/products/mukhwas-8-1.jpg', '/images/products/mukhwas-8-2.jpg'],
    TRUE,
    '2023-04-15T10:00:00Z'
  );

-- Create sample user data
INSERT INTO users (id, full_name, avatar_url, billing_address, shipping_address, created_at)
VALUES
  (
    '2cc4c876-223b-47d2-b946-51c1440a71ba', -- User 1 UUID
    'John Doe',
    'https://randomuser.me/api/portraits/men/1.jpg',
    '{"street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA"}',
    '{"street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA"}',
    '2023-01-01T00:00:00Z'
  ),
  (
    '3a1eece6-365f-4185-a976-a058126d5f45', -- User 2 UUID
    'Jane Smith',
    'https://randomuser.me/api/portraits/women/1.jpg',
    '{"street": "456 Elm St", "city": "Los Angeles", "state": "CA", "postal_code": "90001", "country": "USA"}',
    '{"street": "456 Elm St", "city": "Los Angeles", "state": "CA", "postal_code": "90001", "country": "USA"}',
    '2023-01-15T00:00:00Z'
  );

-- Create sample orders
INSERT INTO orders (id, user_id, total, status, payment_id, created_at)
VALUES
  (
    '2cc4c876-223b-47d2-b946-51c1440a71ba', -- Order 1 UUID
    '2cc4c876-223b-47d2-b946-51c1440a71ba', -- User John Doe
    279.98,
    'completed',
    'pay_sample123456',
    '2023-02-15T14:30:00Z'
  ),
  (
    '3a1eece6-365f-4185-a976-a058126d5f45', -- Order 2 UUID
    '3a1eece6-365f-4185-a976-a058126d5f45', -- User Jane Smith
    399.99,
    'processing',
    'pay_sample789012',
    '2023-03-01T09:15:00Z'
  );

-- Create sample order items
INSERT INTO order_items (id, order_id, product_id, quantity, price)
VALUES
  (
    'db682e60-0246-4244-bdda-dd219b36b249', -- Order item 1 UUID
    '2cc4c876-223b-47d2-b946-51c1440a71ba', -- First order
    '7b739c11-3ab5-46db-9dd8-2d5e72f396fe', -- Sweet Fennel Mukhwas
    1,
    129.99
  ),
  (
    '180fde3e-3470-4f96-b985-533ec18c78b9', -- Order item 2 UUID
    '2cc4c876-223b-47d2-b946-51c1440a71ba', -- First order
    'f41e4b47-197f-47ec-ba58-e5a9c884db94', -- Spicy Saunf Delight
    1,
    149.99
  ),
  (
    '02399e0b-439e-4cfe-a54b-51c73a6391b5', -- Order item 3 UUID
    '3a1eece6-365f-4185-a976-a058126d5f45', -- Second order
    '7420b357-e70a-4c9d-8dc7-c36e96107c8a', -- Festive Assortment Pack
    1,
    399.99
  ); 