-- ============================================================
-- ADH Hardware Store - Complete Database
-- Run this FRESH:
--   mysql -u root -p < adh_complete.sql
-- ============================================================

DROP DATABASE IF EXISTS adh_store;
CREATE DATABASE adh_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE adh_store;

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subcategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subcategory_id INT NOT NULL,
    brand VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    size VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image TEXT,
    is_featured TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password VARCHAR(255),
    role ENUM('customer','painter','carpenter','electrician','plumber','skilled_workman','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    UNIQUE KEY uq_user_product (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10,2),
    status ENUM('Pending','Processing','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
    address TEXT,
    payment_method VARCHAR(50) DEFAULT 'cod',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (id, name, slug, image) VALUES
(1,  'Paints',          'paints',         'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800'),
(2,  'Plywood',         'plywood',        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800'),
(3,  'Hardware',        'hardware',       'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800'),
(4,  'Cement & Putty',  'cement-putty',   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'),
(5,  'Iron Materials',  'iron-materials', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'),
(6,  'Water Fittings',  'water-fittings', 'https://www.induskart.co.in/wp-content/uploads/2025/02/12.-The-Importance-of-Proper-Pipe-Fitting-Installation-in-Preventing-Leaks-.webp'),
(7,  'Light Fittings',  'light-fittings', 'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg'),
(8,  'Adhesive',        'adhesive',       'https://truewholesale.in/storage/product-images/17407342450.jpg');

-- ============================================================
-- SUBCATEGORIES
-- ============================================================

-- PAINTS (category_id = 1)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(1, 'Primer',        'primer',        'https://tiimg.tistatic.com/fp/1/009/010/high-gloss-premium-primer-paint-162.jpg'),
(1, 'Plastic Paint', 'plastic-paint', 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800'),
(1, 'Oil Paint',     'oil-paint',     'https://lntsufin.com/storage/mediafiles/catalog/live/15877-243/original/15877-243_image_0.jpg'),
(1, 'Distemper',     'distemper',     'https://assets.birlaopus.com/is/image/grasimindustries/pic1_distemperpaint?ts=1765189180810');

-- PLYWOOD (category_id = 2)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(2, 'Doors',          'doors',          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800'),
(2, 'Mica / Laminate','mica',           'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800'),
(2, 'Plywood Sheets', 'plywood-sheets', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800');

-- HARDWARE (category_id = 3)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(3, 'Door Kit',     'door-kit',     'https://placehold.co/400x300/78716c/ffffff?text=Door+Kit'),
(3, 'Door Handles', 'door-handles', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800'),
(3, 'Locks',        'locks',        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800');

-- CEMENT & PUTTY (category_id = 4)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(4, 'Wall Putty',   'wall-putty',   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'),
(4, 'Cement Bags',  'cement-bags',  'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800');

-- IRON MATERIALS (category_id = 5)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(5, 'TMT Bars',     'tmt-bars',     'https://placehold.co/400x300/374151/ffffff?text=TMT+Bars'),
(5, 'Angle Iron',   'angle-iron',   'https://placehold.co/400x300/374151/ffffff?text=Angle+Iron'),
(5, 'MS Pipe',      'ms-pipe',      'https://placehold.co/400x300/374151/ffffff?text=MS+Pipe');

-- WATER FITTINGS (category_id = 6)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(6, 'CPVC Fittings', 'cpvc-fitting', 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp'),
(6, 'UPVC Fittings', 'upvc-fitting', 'https://5.imimg.com/data5/SELLER/Default/2022/5/SG/AU/WU/22985054/upvc-pipe-and-fittings-378-500x500.jpg'),
(6, 'Water Tanks',   'water-tanks',  'https://placehold.co/400x300/0369a1/ffffff?text=Water+Tank'),
(6, 'Taps & Valves', 'taps-valves',  'https://placehold.co/400x300/0369a1/ffffff?text=Taps');

-- LIGHT FITTINGS (category_id = 7)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(7, 'LED Bulbs',       'led-bulbs',       'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg'),
(7, 'Ceiling Lights',  'ceiling-lights',  'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg'),
(7, 'Switches & MCB',  'switches-mcb',    'https://placehold.co/400x300/374151/ffffff?text=Switches');

-- ADHESIVE (category_id = 8)
INSERT INTO subcategories (category_id, name, slug, image) VALUES
(8, 'Wood Glue',     'wood-glue',     'https://truewholesale.in/storage/product-images/17407342450.jpg'),
(8, 'Tile Adhesive', 'tile-adhesive', 'https://image.made-in-china.com/202f0j00uQAkcztqREgR/Maydos-White-Cement-Based-Flexible-Glue-for-Ceramic-Tiles.webp'),
(8, 'PVC Solvent',   'pvc-solvent',   'https://tiimg.tistatic.com/fp/1/007/382/kisan-pvc-cpvc-solvent-cement-for-industrial-use-594.jpg');

-- ============================================================
-- PRODUCTS
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- PAINTS → PRIMER  (subcategory_id = 1)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(1, 'Asian Paints', 'Asian Wall Primer 20L',    'Alkali resistant wall primer. Excellent coverage for interior and exterior surfaces. Fast drying formula.',    '20 Litre',  2500, 30, 'https://images.unsplash.com/photo-1581092160607-ee22731d8c6b?q=80&w=800', 1),
(1, 'Asian Paints', 'Asian Wall Primer 4L',     'Alkali resistant wall primer 4L. Good adhesion on plastered and concrete surfaces.',                          '4 Litre',    600, 50, 'https://images.unsplash.com/photo-1581092160607-ee22731d8c6b?q=80&w=800', 0),
(1, 'Berger',       'Berger Primer 10L',         'Berger interior/exterior primer 10L. Seals porous surfaces. Good coverage.',                                  '10 Litre',  1400, 40, 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg',       0),
(1, 'Berger',       'Berger Primer 4L',          'Berger wall primer 4L. Easy application, quick drying.',                                                      '4 Litre',    680, 60, 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg',       0),
(1, 'Nerolac',      'Nerolac Wall Primer 10L',   'Nerolac economy primer 10L. For large area coverage. Smooth base for topcoat.',                               '10 Litre',  1300, 45, 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg',       0),
(1, 'Nerolac',      'Nerolac Wood Primer 1L',    'Wood primer 1L. Prevents absorption, improves topcoat adhesion on wood surfaces.',                            '1 Litre',    290, 80, 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg',       0),
(1, 'Birla Opus',   'Birla Wall Primer 20L',     'Premium wall primer with anti-fungal protection. Ideal for moisture-prone areas.',                            '20 Litre',  2800, 20, 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg',       0);

-- ──────────────────────────────────────────────────────────
-- PAINTS → PLASTIC PAINT  (subcategory_id = 2)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(2, 'Asian Paints', 'Apex Exterior Emulsion 20L',  'Premium exterior emulsion. 100% waterproof, UV resistant, 6-year warranty. Weather resistant.',             '20 Litre',  3800, 25, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 1),
(2, 'Asian Paints', 'Apex Exterior Emulsion 4L',   'Premium exterior emulsion 4L. Excellent rain protection.',                                                   '4 Litre',    950, 40, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 0),
(2, 'Asian Paints', 'Tractor Emulsion 10L',         'Economy interior emulsion 10L. Smooth washable finish, good coverage.',                                     '10 Litre',  1400, 50, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 0),
(2, 'Asian Paints', 'Tractor Emulsion 4L',          'Economy interior emulsion 4L. Best value for large rooms.',                                                 '4 Litre',    650, 70, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 0),
(2, 'Berger',       'WeatherCoat All Guard 10L',    'Exterior waterproof paint 10L. Protects against rain, sun, and cracking. Anti-algae formula.',              '10 Litre',  2200, 30, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 0),
(2, 'Berger',       'WeatherCoat All Guard 4L',     'Exterior waterproof paint 4L. Excellent hiding power.',                                                      '4 Litre',    950, 45, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 0),
(2, 'Nerolac',      'Nerolac Excel 10L',             'Interior plastic emulsion 10L. Low odour, smooth finish, easy application.',                               '10 Litre',  1800, 35, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 0),
(2, 'Birla Opus',   'Birla Platinum 20L',            'Premium interior emulsion 20L. Silk finish, highly washable, anti-bacterial.',                             '20 Litre',  4200, 15, 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg', 1);

-- ──────────────────────────────────────────────────────────
-- PAINTS → OIL PAINT  (subcategory_id = 3)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(3, 'Asian Paints', 'Asian Enamel Gloss 4L',     'High gloss enamel oil paint 4L. For wood, metal, doors, windows. Durable hard film.',                         '4 Litre',   1350, 50, 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg', 1),
(3, 'Asian Paints', 'Asian Enamel Gloss 1L',     'High gloss enamel 1L. Quick drying, excellent coverage on metal and wood.',                                    '1 Litre',    380, 80, 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg', 0),
(3, 'Berger',       'Berger Luxol Enamel 4L',    'Premium enamel paint 4L. High sheen finish, washable, corrosion resistant.',                                   '4 Litre',   1280, 45, 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg', 0),
(3, 'Berger',       'Berger Luxol Enamel 1L',    'Berger Luxol enamel 1L. For grills, gates, furniture. Excellent gloss.',                                       '1 Litre',    340, 90, 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg', 0),
(3, 'Nerolac',      'Nerolac Enamel 1L',          'Economy synthetic enamel 1L. Good coverage for grills, pipes, gates.',                                        '1 Litre',    290, 100,'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg', 0),
(3, 'Nerolac',      'Nerolac Enamel 4L',          'Nerolac synthetic enamel 4L. Durable glossy finish for all metal and wood surfaces.',                         '4 Litre',   1100, 40, 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg', 0);

-- ──────────────────────────────────────────────────────────
-- PAINTS → DISTEMPER  (subcategory_id = 4)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(4, 'Asian Paints', 'Tractor Distemper 5kg',     'Economy dry distemper 5kg. Smooth chalky finish for interior walls. Easy application with brush or roller.',  '5 kg',       420, 80, 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg', 0),
(4, 'Asian Paints', 'Tractor Distemper 10kg',    'Economy dry distemper 10kg. Uniform coverage, good for large rooms.',                                          '10 kg',      780, 60, 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg', 1),
(4, 'Berger',       'Bison Distemper 5kg',        'Berger Bison distemper 5kg. Better washability than regular dry distemper.',                                   '5 kg',       450, 70, 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg', 0),
(4, 'Berger',       'Bison Distemper 20kg',       'Berger Bison distemper 20kg bulk pack. Best value for large projects.',                                        '20 kg',     1600, 30, 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg', 0),
(4, 'Nerolac',      'Nerolac Acrylic Distemper 10kg', 'Washable acrylic distemper 10kg. Better durability than dry distemper. Slightly glossy finish.',          '10 kg',      900, 50, 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg', 0);

-- ──────────────────────────────────────────────────────────
-- PLYWOOD → DOORS  (subcategory_id = 5)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(5, 'Black Cobra',  'Black Cobra Flush Door',    'Black Cobra premium flush door. 72×32 inch. BWP grade, waterproof, termite resistant. Smooth factory finish.', '72×32 inch',  3200, 20, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 1),
(5, 'Black Cobra',  'Black Cobra Flush Door',    'Black Cobra premium flush door. 78×36 inch. BWP grade, waterproof, termite resistant. For main entrance.',     '78×36 inch',  3800, 15, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 1),
(5, 'Black Cobra',  'Black Cobra Flush Door',    'Black Cobra premium flush door. 84×42 inch. Extra wide, for double doors and main gate.',                      '84×42 inch',  4500, 10, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Greenply',     'Greenply BWP Flush Door',   'Greenply Gold BWP flush door. 78×36 inch. ISI marked, boiling water resistant, smooth surface.',               '78×36 inch',  4800, 15, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 1),
(5, 'Greenply',     'Greenply BWP Flush Door',   'Greenply Gold BWP flush door. 84×42 inch. Premium quality for main entrance.',                                  '84×42 inch',  5500, 8,  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Greenply',     'Greenply MR Flush Door',    'Greenply moisture resistant flush door. 78×36 inch. Good for interior rooms.',                                  '78×36 inch',  3200, 20, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Century',      'Century BWR Flush Door',    'Century BWR flush door. 78×36 inch. ISI marked, boiling water resistant.',                                     '78×36 inch',  4200, 18, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Century',      'Century BWR Flush Door',    'Century BWR flush door. 84×42 inch. Heavy duty for wide frame openings.',                                      '84×42 inch',  5000, 10, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Sintex',       'Sintex PVC Door',            'Sintex waterproof PVC door. 78×36 inch. No swelling, no termites. Best for bathrooms and toilets.',            '78×36 inch',  3200, 25, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Sintex',       'Sintex PVC Door',            'Sintex waterproof PVC door. 84×36 inch. Heavy duty, moisture proof.',                                          '84×36 inch',  3600, 15, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Novapan',      'Novapan Flush Door',         'Novapan economy flush door. 78×30 inch. Good for interior rooms, affordable.',                                 '78×30 inch',  2200, 30, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0),
(5, 'Novapan',      'Novapan Flush Door',         'Novapan economy flush door. 78×36 inch. MR grade, smooth surface.',                                            '78×36 inch',  2600, 25, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- PLYWOOD → MICA  (subcategory_id = 6)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(6, 'Merino',    'Merino High Gloss White Mica',    'High gloss white laminate. Scratch resistant. Ideal for kitchen cabinets and wardrobes.',             '8×4 ft',  950, 80, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 1),
(6, 'Merino',    'Merino Matte Grey Mica',           'Soft matte grey laminate. Fingerprint resistant. Modern look for modular furniture.',                '8×4 ft',  980, 60, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 0),
(6, 'Merino',    'Merino High Gloss Black Mica',    'High gloss black laminate. Anti-fingerprint coating. Premium look.',                                  '8×4 ft', 1050, 40, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 0),
(6, 'Greenlam',  'Greenlam Oak Wood Finish Mica',   'Realistic oak wood grain texture. Matte finish. Perfect for luxury furniture and panels.',           '8×4 ft', 1150, 45, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 1),
(6, 'Greenlam',  'Greenlam Walnut Finish Mica',     'Walnut wood grain texture laminate. Rich brown tone. Elegant finish.',                                '8×4 ft', 1100, 50, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 0),
(6, 'Greenlam',  'Greenlam Beige Solid Mica',       'Plain beige solid colour laminate. Smooth surface. Good for simple clean designs.',                  '8×4 ft',  850, 70, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 0),
(6, 'Century',   'Century Laminates White Mica',    'Century laminates white gloss 1mm. ISI marked. For kitchen and wardrobe shutters.',                  '8×4 ft',  880, 90, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 0),
(6, 'Century',   'Century Laminates Teak Mica',     'Century teak wood finish laminate 1mm. Natural wood look at affordable price.',                       '8×4 ft',  920, 65, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- PLYWOOD → PLYWOOD SHEETS  (subcategory_id = 7)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(7, 'Greenply', 'Greenply BWR Ply 19mm',   'Greenply boiling water resistant plywood 19mm. ISI certified. Best for kitchen and bathroom furniture.',   '8×4 ft, 19mm', 3200, 50, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 1),
(7, 'Greenply', 'Greenply BWR Ply 12mm',   'Greenply BWR plywood 12mm. For cabinets, shelves and light furniture.',                                     '8×4 ft, 12mm', 2100, 60, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Greenply', 'Greenply BWR Ply 6mm',    'Greenply BWR ply 6mm. For back panels and thin partitions.',                                                '8×4 ft, 6mm',  1200, 80, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Greenply', 'Greenply MR Ply 19mm',    'Greenply moisture resistant ply 19mm. Economy grade for interior furniture.',                               '8×4 ft, 19mm', 2400, 40, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Greenply', 'Greenply MR Ply 12mm',    'Greenply MR ply 12mm. Good value for light furniture and interior applications.',                           '8×4 ft, 12mm', 1600, 55, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Century',  'Century BWR Ply 19mm',    'Century BWR plywood 19mm. ISI certified, uniform thickness, smooth surface.',                               '8×4 ft, 19mm', 3000, 45, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 1),
(7, 'Century',  'Century BWR Ply 12mm',    'Century BWR ply 12mm. Good bond strength, suitable for modular furniture.',                                 '8×4 ft, 12mm', 2000, 50, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Century',  'Century MR Ply 19mm',     'Century MR plywood 19mm. Economy grade, smooth surface, good for interior furniture.',                      '8×4 ft, 19mm', 2200, 35, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Kitply',   'Kitply Gold BWR 19mm',    'Kitply Gold BWR ply 19mm. Premium quality, 0% core gap. For high-end furniture.',                           '8×4 ft, 19mm', 3500, 25, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Local',    'Commercial Ply 12mm',     'Economy commercial plywood 12mm. For packaging, temporary partitions, and light use.',                      '8×4 ft, 12mm',  900, 100,'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Greenply', 'Marine Ply 19mm',         'IS 710 certified marine plywood 19mm. Extreme water resistance. For outdoor and boat use.',                 '8×4 ft, 19mm', 4800, 20, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0),
(7, 'Century',  'Block Board 19mm',        'Solid block board 19mm. For doors, tables, heavy shelves. Rigid and strong.',                               '8×4 ft, 19mm', 2100, 30, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- HARDWARE → DOOR KIT  (subcategory_id = 8)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(8, 'Generic',  'Full SS Door Kit Set',          'Complete stainless steel door fitting kit. Includes: 3 hinges, 1 mortise lock, 1 handle, 2 stoppers, tower bolts.', 'Full Set', 850, 50, 'https://placehold.co/400x400/78716c/ffffff?text=Door+Kit', 1),
(8, 'Generic',  'Economy Door Kit Set',          'Economy door fitting set. Includes: 3 hinges, 1 basic lock, 1 handle. Suitable for interior room doors.',           'Full Set', 480, 80, 'https://placehold.co/400x400/78716c/ffffff?text=Door+Kit', 0),
(8, 'Hettich',  'Hettich Concealed Hinges (Pair)', 'Hettich 110° concealed cabinet hinges. Self-closing, soft close. For wardrobe and cabinet doors.',              'Pair',     350, 100,'https://placehold.co/400x400/78716c/ffffff?text=Hinges', 0),
(8, 'Generic',  'SS Tower Bolt 6-inch',           'Stainless steel tower bolt 6 inch. For doors and windows. Rust free.',                                           '6 inch',    85, 200,'https://placehold.co/400x400/78716c/ffffff?text=Tower+Bolt', 0),
(8, 'Generic',  'SS Tower Bolt 12-inch',          'Stainless steel tower bolt 12 inch. Heavy duty, for main gate and entrance doors.',                             '12 inch',   130, 150,'https://placehold.co/400x400/78716c/ffffff?text=Tower+Bolt', 0),
(8, 'PVC',      'PVC Beading 8ft White',          'White PVC edge beading 8 ft. For plywood and furniture edge finishing.',                                        '8 ft',       45, 500,'https://placehold.co/400x400/a8a29e/ffffff?text=Beading', 0),
(8, 'Generic',  'Paper Tape 2-inch Roll',         'Self-adhesive paper tape 2 inch × 50m. For joint filling and plastering before painting.',                       '2in × 50m', 35, 400,'https://placehold.co/400x400/d6d3d1/44403c?text=Paper+Tape', 0);

-- ──────────────────────────────────────────────────────────
-- HARDWARE → DOOR HANDLES  (subcategory_id = 9)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(9, 'Godrej',   'Godrej SS Mortise Handle Set',   'Godrej stainless steel mortise handle set. Smooth operation, rust-free. Complete with screws.',               'Standard',  650, 60, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800', 1),
(9, 'Dorset',   'Dorset Brass Handle Set',         'Dorset brass mortise handle. Gold finish, heavy duty, smooth operation.',                                    'Standard',  750, 40, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800', 0),
(9, 'Generic',  'Economy SS Handle Set',           'Economy stainless steel handle set. Good for interior doors.',                                                'Standard',  280, 100,'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800', 0),
(9, 'Hettich',  'Hettich Cabinet Handle 128mm',    'Hettich cabinet pull handle 128mm. Stainless steel, matte finish. For kitchen and wardrobe.',                '128mm',     180, 150,'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- HARDWARE → LOCKS  (subcategory_id = 10)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(10, 'Godrej',  'Godrej 3-Lever Mortise Lock',    'Godrej 3-lever mortise lock. ISI marked. High security, smooth operation. Best seller.',                     'Standard',  680, 80, 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', 1),
(10, 'Godrej',  'Godrej 7-Lever Mortise Lock',    'Godrej 7-lever ultra high security mortise lock. ISI marked. For main entrance.',                           'Standard', 1200, 40, 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', 0),
(10, 'Godrej',  'Godrej Digital Lock with Key',   'Godrej smart digital lock. Keypad + key backup. PIN + key access. Easy installation. For main door.',       'Standard', 3500, 15, 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', 1),
(10, 'Dorset',  'Dorset Lever Handle Lock',        'Dorset lever handle mortise lock. Smooth operation, stainless steel finish.',                                'Standard',  850, 50, 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', 0),
(10, 'Kich',    'Kich Mortise Lock',               'Kich premium mortise lock. European standard. Heavy duty for main entrance doors.',                          'Standard', 1500, 20, 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- CEMENT → WALL PUTTY  (subcategory_id = 11)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(11, 'Birla White',  'Birla White Wall Putty 40kg',  'Birla White wall care putty 40kg. Smooth base before paint. Excellent whiteness and coverage.',           '40 kg',  1450, 60, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', 1),
(11, 'Birla White',  'Birla White Wall Putty 20kg',  'Birla White wall care putty 20kg. White marble finish. Ideal base coat for all paints.',                  '20 kg',   780, 80, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', 0),
(11, 'Asian Paints', 'Asian Wall Putty 20kg',         'Asian wall putty 20kg. Smooth finish, water resistant. Good adhesion on concrete surfaces.',              '20 kg',   820, 70, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', 0),
(11, 'Asian Paints', 'Asian Wall Putty 40kg',         'Asian wall putty 40kg bulk. Best value for large construction projects.',                                 '40 kg',  1550, 40, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', 0),
(11, 'JK',           'JK Wall Putty 40kg',            'JK wall putty 40kg. White marble finish, water resistant, easy sanding.',                                 '40 kg',  1350, 50, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- CEMENT → CEMENT BAGS  (subcategory_id = 12)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(12, 'Ultratech', 'Ultratech OPC 53 Cement',  'Ultratech OPC 53 grade portland cement. ISI marked. High early strength for RCC, columns, beams.',  '50 kg', 420, 200, 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800', 1),
(12, 'Ultratech', 'Ultratech PPC Cement',     'Ultratech Portland Pozzolana Cement. Better workability, more durable. Good for plastering and masonry.','50 kg', 400, 180, 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800', 0),
(12, 'ACC',       'ACC Gold Cement',           'ACC Gold OPC cement. High strength, quick setting. ISI marked. Trusted brand.',                       '50 kg', 415, 150, 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800', 0),
(12, 'Ambuja',    'Ambuja Plus Cement',        'Ambuja Plus cement. Strong, durable. Weather resistant. Good for all construction purposes.',          '50 kg', 418, 160, 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800', 0),
(12, 'Shree',     'Shree Cement',              'Shree Cement. Economy grade. Good for plastering, brickwork and general construction.',                '50 kg', 395, 120, 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800', 0);

-- ──────────────────────────────────────────────────────────
-- IRON → TMT BARS  (subcategory_id = 13)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(13, 'TATA Tiscon', 'TATA Tiscon TMT Bar Fe-500D', 'TATA Tiscon TMT bar Fe-500D. 8mm, 12m length. ISI marked. For RCC construction.',   '8mm, 12m',   680, 100, 'https://placehold.co/400x400/374151/ffffff?text=TMT+Bar', 1),
(13, 'TATA Tiscon', 'TATA Tiscon TMT Bar Fe-500D', 'TATA Tiscon TMT bar Fe-500D. 10mm, 12m length. Most common size for house construction.','10mm, 12m', 980, 120, 'https://placehold.co/400x400/374151/ffffff?text=TMT+Bar', 1),
(13, 'TATA Tiscon', 'TATA Tiscon TMT Bar Fe-500D', 'TATA Tiscon TMT bar Fe-500D. 12mm, 12m length. For beams and columns.',             '12mm, 12m', 1350, 80, 'https://placehold.co/400x400/374151/ffffff?text=TMT+Bar', 0),
(13, 'Jindal',      'Jindal TMT Bar Fe-500',       'Jindal Panther TMT bar Fe-500. 10mm, 12m. Good quality, affordable.',               '10mm, 12m',  920, 90, 'https://placehold.co/400x400/374151/ffffff?text=TMT+Bar', 0),
(13, 'Jindal',      'Jindal TMT Bar Fe-500',       'Jindal Panther TMT bar Fe-500. 12mm, 12m. Trusted brand for structural work.',      '12mm, 12m', 1280, 60, 'https://placehold.co/400x400/374151/ffffff?text=TMT+Bar', 0);

-- ──────────────────────────────────────────────────────────
-- IRON → ANGLE IRON  (subcategory_id = 14)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(14, 'Generic', 'MS Angle Iron 25×25mm', 'Mild steel equal angle 25×25×3mm, 6m. For light structural work, grills, racks.',   '25×25mm, 6m',  850, 50, 'https://placehold.co/400x400/374151/ffffff?text=Angle+Iron', 0),
(14, 'Generic', 'MS Angle Iron 40×40mm', 'Mild steel equal angle 40×40×4mm, 6m. For structural fabrication, gates, frames.',  '40×40mm, 6m', 1400, 40, 'https://placehold.co/400x400/374151/ffffff?text=Angle+Iron', 1),
(14, 'Generic', 'MS Angle Iron 50×50mm', 'Mild steel equal angle 50×50×5mm, 6m. Heavy duty structural use.',                  '50×50mm, 6m', 1900, 30, 'https://placehold.co/400x400/374151/ffffff?text=Angle+Iron', 0);

-- ──────────────────────────────────────────────────────────
-- IRON → MS PIPE  (subcategory_id = 15)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(15, 'Generic', 'MS Square Pipe 1-inch',  'Mild steel square hollow pipe 1 inch, 6m. For furniture frames, gates, grills.',   '1 inch, 6m',  850, 60, 'https://placehold.co/400x400/374151/ffffff?text=MS+Pipe', 0),
(15, 'Generic', 'MS Round Pipe 1.5-inch', 'Mild steel round hollow pipe 1.5 inch, 6m. For railing, handrail, scaffolding.',  '1.5 inch, 6m',1100, 50, 'https://placehold.co/400x400/374151/ffffff?text=MS+Pipe', 1),
(15, 'Generic', 'MS Flat Bar 50×6mm',     'Mild steel flat bar 50×6mm, 6m. For gate frames, grills, brackets.',              '50×6mm, 6m',  780, 40, 'https://placehold.co/400x400/374151/ffffff?text=Flat+Bar', 0);

-- ──────────────────────────────────────────────────────────
-- WATER → CPVC  (subcategory_id = 16)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(16, 'Astral', 'Astral CPVC Pipe 0.5-inch', 'Astral CPVC pipe 0.5 inch, 3m. For hot and cold water supply.',          '0.5in × 3m',  160, 150, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 0),
(16, 'Astral', 'Astral CPVC Pipe 0.75-inch','Astral CPVC pipe 0.75 inch, 3m. Most common bathroom plumbing size.',     '0.75in × 3m', 220, 120, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 0),
(16, 'Astral', 'Astral CPVC Pipe 1-inch',   'Astral CPVC pipe 1 inch, 3m. For main supply lines.',                    '1in × 3m',    320, 100, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 1),
(16, 'Astral', 'Astral CPVC Elbow 90° 1in', 'Astral CPVC 90 degree elbow 1 inch. For direction change in plumbing.',  '1 inch',       28, 500, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 0),
(16, 'Astral', 'Astral CPVC T-Joint 1in',   'Astral CPVC equal T-joint 1 inch. For branch connections.',              '1 inch',       32, 400, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 0),
(16, 'Astral', 'Astral CPVC Socket 1in',    'Astral CPVC coupling socket 1 inch. For joining two pipes.',             '1 inch',       18, 600, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 0),
(16, 'Astral', 'Astral CPVC Ball Valve 1in','Astral CPVC ball valve 1 inch. Full bore, for shut-off of water supply.','1 inch',      320, 80, 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp', 0);

-- ──────────────────────────────────────────────────────────
-- WATER → WATER TANKS  (subcategory_id = 18)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(18, 'Sintex', 'Sintex Triple Layer Tank 500L',  'Sintex triple layer UV stabilised water tank 500L. Food grade, ISI marked, strong lid.',   '500 Litre',  2800, 15, 'https://placehold.co/400x400/0369a1/ffffff?text=500L+Tank', 0),
(18, 'Sintex', 'Sintex Triple Layer Tank 1000L', 'Sintex triple layer UV stabilised water tank 1000L. Food grade, ISI marked.',             '1000 Litre', 5200, 10, 'https://placehold.co/400x400/0369a1/ffffff?text=1000L+Tank',1),
(18, 'Sintex', 'Sintex Triple Layer Tank 2000L', 'Sintex triple layer water tank 2000L. For large homes and commercial use.',              '2000 Litre', 9500, 5,  'https://placehold.co/400x400/0369a1/ffffff?text=2000L+Tank',0),
(18, 'Penguin','Penguin Water Tank 1000L',        'Penguin triple layer ISI water storage tank 1000L. UV resistant.',                       '1000 Litre', 4800, 8,  'https://placehold.co/400x400/0369a1/ffffff?text=Penguin+Tank',0);

-- ──────────────────────────────────────────────────────────
-- WATER → TAPS  (subcategory_id = 19)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(19, 'Jaquar',   'Jaquar Bib Cock Chrome',      'Jaquar chrome plated bib cock tap. 0.5 inch. Premium quality, long life.',     '0.5 inch', 1600, 30, 'https://placehold.co/400x400/0369a1/ffffff?text=Jaquar+Tap', 1),
(19, 'Parryware','Parryware Pillar Cock',        'Parryware pillar cock for washbasin. Chrome plated, ISI marked.',               '0.5 inch',  850, 50, 'https://placehold.co/400x400/0369a1/ffffff?text=Tap',         0),
(19, 'Generic',  'Brass Bib Cock ISI 0.5 inch', 'ISI marked brass bib cock 0.5 inch. Chrome plated, corrosion resistant.',      '0.5 inch',  280, 80, 'https://placehold.co/400x400/0369a1/ffffff?text=Tap',         0),
(19, 'Generic',  'Brass Ball Valve 0.75 inch',  'Full bore brass ball valve 0.75 inch. For water line shut-off.',               '0.75 inch', 190, 100,'https://placehold.co/400x400/0369a1/ffffff?text=Valve',       0);

-- ──────────────────────────────────────────────────────────
-- ADHESIVE → WOOD GLUE  (subcategory_id = 20)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(20, 'Pidilite', 'Fevicol SH 1kg',   'Pidilite Fevicol SH 1kg. Industry standard synthetic resin wood adhesive. Strong permanent bond.', '1 kg',  290, 200, 'https://truewholesale.in/storage/product-images/17407342450.jpg', 1),
(20, 'Pidilite', 'Fevicol SH 5kg',   'Pidilite Fevicol SH 5kg bulk. For large carpentry and furniture projects.',                       '5 kg', 1200, 100, 'https://truewholesale.in/storage/product-images/17407342450.jpg', 0),
(20, 'Pidilite', 'Fevicol Marine 1kg','Fevicol Marine 1kg. Waterproof adhesive for outdoor and marine plywood bonding.',               '1 kg',  420, 80,  'https://truewholesale.in/storage/product-images/17407342450.jpg', 0),
(20, 'Woodgrip', 'Woodgrip 500ml',    'Woodgrip high strength wood bonding adhesive 500ml. For laminate and plywood edge bonding.',     '500 ml',180, 150, 'https://5.imimg.com/data5/SELLER/Default/2023/1/MC/WX/AY/156837198/piditile-adhesive-wood-grip.jpg', 0);

-- ──────────────────────────────────────────────────────────
-- ADHESIVE → PVC SOLVENT  (subcategory_id = 22)
-- ──────────────────────────────────────────────────────────
INSERT INTO products (subcategory_id, brand, name, description, size, price, stock, image, is_featured) VALUES
(22, 'Pidilite', 'Feviweld CPVC Solvent 50ml',  'Pidilite CPVC pipe solvent cement 50ml. For joining CPVC pipes and fittings.',   '50 ml',  95, 200, 'https://tiimg.tistatic.com/fp/1/007/382/kisan-pvc-cpvc-solvent-cement-for-industrial-use-594.jpg', 1),
(22, 'Pidilite', 'Feviweld CPVC Solvent 500ml', 'Pidilite CPVC solvent cement 500ml bulk. For plumbers and contractors.',         '500 ml', 650, 80,  'https://tiimg.tistatic.com/fp/1/007/382/kisan-pvc-cpvc-solvent-cement-for-industrial-use-594.jpg', 0),
(22, 'Astral',   'Astral CPVC Solvent 50ml',    'Astral CPVC pipe solvent cement 50ml. Fast setting, strong joint.',               '50 ml',  85, 250, 'https://tiimg.tistatic.com/fp/1/007/382/kisan-pvc-cpvc-solvent-cement-for-industrial-use-594.jpg', 0);

-- ============================================================
-- ADMIN USER (password: admin123)
-- ============================================================
INSERT INTO users (name, email, phone, password, role) VALUES
('ADH Admin', 'admin@adh.com', '9999999999',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4oZ.VuLJoq',
 'admin');
