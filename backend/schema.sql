-- ============================================================
-- ADH Hardware Store – Complete MySQL Schema + Seed Data
-- Run this file once to set up the database:
--   mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS adh_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE adh_store;

-- ── categories ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  hindi_name VARCHAR(200) NOT NULL,
  image      VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── subcategories ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subcategories (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name        VARCHAR(100) NOT NULL,
  hindi_name  VARCHAR(200) NOT NULL,
  image       VARCHAR(500) DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── products ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  category_id       INT NOT NULL,
  subcategory_id    INT,
  name              VARCHAR(200) NOT NULL,
  hindi_name        VARCHAR(300) NOT NULL,
  description       TEXT,
  hindi_description TEXT,
  brand             VARCHAR(100),
  litres            VARCHAR(50),          -- e.g. "1L", "5L", "20kg", "50kg"
  price             DECIMAL(10,2) NOT NULL,
  discount          DECIMAL(10,2) DEFAULT 0,
  stock             INT DEFAULT 0,
  image             VARCHAR(500),
  is_new            TINYINT(1) DEFAULT 0,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id)    REFERENCES categories(id)    ON DELETE CASCADE,
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── users ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  phone      VARCHAR(15)  NOT NULL UNIQUE,
  email      VARCHAR(200),
  password   VARCHAR(255) NOT NULL,
  role       ENUM('customer','painter','carpenter','electrician','plumber','skilled_workman','admin')
             DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── cart_items ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  product_id INT NOT NULL,
  quantity   INT NOT NULL DEFAULT 1,
  UNIQUE KEY uq_user_product (user_id, product_id),
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── orders ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT NOT NULL,
  total_amount   DECIMAL(12,2) NOT NULL,
  discount_total DECIMAL(12,2) DEFAULT 0,
  payment_method ENUM('cod','upi','card') DEFAULT 'cod',
  address        TEXT NOT NULL,
  status         ENUM('Order Placed','Processing','Shipped','Delivered','Cancelled')
                 DEFAULT 'Order Placed',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── order_items ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   INT NOT NULL,
  product_id INT NOT NULL,
  quantity   INT NOT NULL,
  price      DECIMAL(10,2) NOT NULL,    -- price at time of purchase
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Categories
INSERT INTO categories (id, name, hindi_name, image) VALUES
(1, 'Plywood', 'प्लाईवुड',  'https://placehold.co/400x400/f97316/ffffff?text=Plywood'),
(2, 'Paint',   'पेंट',      'https://placehold.co/400x400/fb923c/ffffff?text=Paint'),
(3, 'Hardware','हार्डवेयर', 'https://placehold.co/400x400/78716c/ffffff?text=Hardware'),
(4, 'Cement & Putti','सीमेंट और पुट्टी', 'https://placehold.co/400x400/6b7280/ffffff?text=Cement');

-- Subcategories – Plywood (cat 1)
INSERT INTO subcategories (id, category_id, name, hindi_name) VALUES
(1,  1, 'Door',  'दरवाजा'),
(2,  1, 'Ply',   'प्लाई'),
(3,  1, 'Mica',  'माइका');

-- Subcategories – Paint (cat 2)
INSERT INTO subcategories (id, category_id, name, hindi_name) VALUES
(4,  2, 'Oil Paint',     'ऑयल पेंट'),
(5,  2, 'Primer',        'प्राइमर'),
(6,  2, 'Plastic Paint', 'प्लास्टिक पेंट'),
(7,  2, 'Distemper',     'डिस्टेम्पर');

-- Subcategories – Hardware (cat 3)
INSERT INTO subcategories (id, category_id, name, hindi_name) VALUES
(8,  3, 'Door Kit',       'डोर किट'),
(9,  3, 'Pidilite',       'पिडिलाइट'),
(10, 3, 'Woodgrip',       'वुडग्रिप'),
(11, 3, 'Beading',        'बीडिंग'),
(12, 3, 'Paper Tape',     'पेपर टेप'),
(13, 3, 'Water Tank',     'वॉटर टैंक'),
(14, 3, 'Tap',            'नल'),
(15, 3, 'Pipe',           'पाइप'),
(16, 3, 'Valve',          'वाल्व'),
(17, 3, 'Elbow',          'एल्बो'),
(18, 3, 'T Joint',        'टी जॉइंट'),
(19, 3, 'Socket',         'सॉकेट'),
(20, 3, 'Nali',           'नाली'),
(21, 3, 'Iron Items',     'लोहे का सामान'),
(22, 3, 'Jhadu',          'झाड़ू'),
(23, 3, 'Plastic Tagari', 'प्लास्टिक तगारी');

-- Products – Plywood / Door
INSERT INTO products (category_id, subcategory_id, name, hindi_name, description, hindi_description, brand, litres, price, discount, stock, image, is_new) VALUES
(1, 1, 'Greenply Gold Door 7ft',   'ग्रीनप्लाई गोल्ड दरवाजा 7फीट', 'Premium quality flush door, 7ft x 3ft, 32mm. Waterproof and termite resistant.', 'प्रीमियम फ्लश दरवाजा, 7 फुट x 3 फुट, 32mm। वाटरप्रूफ और दीमक प्रतिरोधी।', 'Greenply', '7ft', 4500.00, 200.00, 15, 'https://placehold.co/400x400/f97316/ffffff?text=Door', 1),
(1, 2, 'Century BWR Ply 19mm',     'सेंचुरी BWR प्लाई 19mm',        'Boiling water resistant plywood, 8x4 ft, 19mm. For furniture and cabinets.',   'उबलते पानी प्रतिरोधी प्लाईवुड, 8x4 फुट, 19mm। फर्नीचर के लिए।',    'Century', '19mm', 2800.00, 0,    40, 'https://placehold.co/400x400/ea580c/ffffff?text=Ply',  0),
(1, 2, 'Greenply MR Ply 12mm',     'ग्रीनप्लाई MR प्लाई 12mm',      'Moisture resistant plywood, 8x4 ft, 12mm. For interior applications.',          'नमी प्रतिरोधी प्लाईवुड, 8x4 फुट, 12mm।',                             'Greenply','12mm', 1600.00, 0,    60, 'https://placehold.co/400x400/c2410c/ffffff?text=MR+Ply', 0),
(1, 3, 'Merino White Mica Sheet',  'मेरिनो व्हाइट माइका शीट',       'High gloss laminate sheet, 8x4 ft. Scratch resistant.',                         'हाई ग्लॉस लैमिनेट शीट, 8x4 फुट। खरोंच प्रतिरोधी।',                  'Merino',  '8x4ft',950.00,  50.00, 80, 'https://placehold.co/400x400/9a3412/ffffff?text=Mica', 1),
(1, 3, 'Greenlam Oak Mica',        'ग्रीनलैम ओक माइका',             'Oak wood finish laminate. Realistic wood grain texture.',                       'ओक वुड फिनिश लैमिनेट। वास्तविक लकड़ी की बनावट।',                    'Greenlam','8x4ft',1100.00, 0,    50, 'https://placehold.co/400x400/7c2d12/ffffff?text=Oak+Mica', 0);

-- Products – Paint
INSERT INTO products (category_id, subcategory_id, name, hindi_name, description, hindi_description, brand, litres, price, discount, stock, image, is_new) VALUES
(2, 4, 'Asian Paints Oil Paint 1L',    'एशियन पेंट्स ऑयल पेंट 1लीटर', 'High gloss enamel oil paint, 1 litre. For wood and metal surfaces.',    'हाई ग्लॉस ऑयल पेंट, 1 लीटर। लकड़ी और धातु के लिए।', 'Asian Paints', '1L',   380.00, 20.00,  100, 'https://placehold.co/400x400/f97316/ffffff?text=Oil+Paint',    0),
(2, 5, 'Berger Primer 4L',             'बर्जर प्राइमर 4लीटर',          'Wall primer for interior and exterior use, 4 litre.',                  'दीवार प्राइमर, 4 लीटर, इंटीरियर और एक्सटीरियर के लिए।', 'Berger',       '4L',   650.00, 0,      75,  'https://placehold.co/400x400/fb923c/ffffff?text=Primer',       0),
(2, 6, 'Asian Apex Plastic Paint 20L', 'एशियन एपेक्स प्लास्टिक पेंट 20लीटर', 'Exterior emulsion paint, 20 litre. Weather resistant.',        'एक्सटीरियर पेंट, 20 लीटर। मौसम प्रतिरोधी।', 'Asian Paints',  '20L',  3200.00, 150.00, 30,  'https://placehold.co/400x400/fdba74/ffffff?text=Plastic+Paint', 1),
(2, 7, 'Nerolac Distemper 5kg',        'नेरोलैक डिस्टेम्पर 5किग्रा',  'Economy distemper paint, 5 kg. Smooth finish for interior walls.',     'इकॉनमी डिस्टेम्पर पेंट, 5 किग्रा। दीवारों के लिए।',  'Nerolac',      '5kg',  420.00, 0,      90,  'https://placehold.co/400x400/fed7aa/f97316?text=Distemper',    0);

-- Products – Hardware
INSERT INTO products (category_id, subcategory_id, name, hindi_name, description, hindi_description, brand, litres, price, discount, stock, image, is_new) VALUES
(3, 8,  'Door Kit Set (Full)',        'डोर किट सेट (पूर्ण)',     'Complete door fitting kit: hinges, lock, handle, stopper. Stainless steel.', 'दरवाजे का पूर्ण किट: हिंज, ताला, हैंडल, स्टॉपर। स्टेनलेस स्टील।', 'Generic',  NULL,    850.00,  50.00,  45,  'https://placehold.co/400x400/78716c/ffffff?text=Door+Kit',    1),
(3, 9,  'Pidilite Fevicol SH 1kg',   'पिडिलाइट फेविकोल SH 1किग्रा', 'Synthetic resin adhesive, 1 kg. Industry standard wood glue.',     'सिंथेटिक रेजिन गोंद, 1 किग्रा।',              'Pidilite', '1kg',   290.00,  0,      200, 'https://placehold.co/400x400/57534e/ffffff?text=Pidilite',    0),
(3, 10, 'Woodgrip Adhesive 500ml',   'वुडग्रिप एडहेसिव 500ml',  'High strength wood bonding adhesive, 500ml.',                     'हाई स्ट्रेंथ वुड एडहेसिव, 500ml।',             'Woodgrip', '500ml', 180.00,  0,      150, 'https://placehold.co/400x400/44403c/ffffff?text=Woodgrip',    0),
(3, 11, 'PVC Beading 8ft',           'PVC बीडिंग 8फीट',         'White PVC edge beading strip, 8 feet.',                           'सफेद PVC बीडिंग स्ट्रिप, 8 फीट।',             'Generic',  '8ft',   45.00,   0,      500, 'https://placehold.co/400x400/78716c/ffffff?text=Beading',     0),
(3, 12, 'Paper Tape 2-inch Roll',    'पेपर टेप 2 इंच रोल',      'Self-adhesive paper tape, 2 inch x 50m.',                         'सेल्फ-एडहेसिव पेपर टेप, 2 इंच x 50 मीटर।',    'Generic',  '50m',   35.00,   0,      300, 'https://placehold.co/400x400/a8a29e/ffffff?text=Paper+Tape',  0),
(3, 13, 'Sintex Water Tank 1000L',   'सिंटेक्स वॉटर टैंक 1000लीटर', 'Triple-layer water tank, 1000 litre. UV stabilised.',          'ट्रिपल-लेयर वाटर टैंक, 1000 लीटर।',          'Sintex',   '1000L', 5200.00, 200.00, 10,  'https://placehold.co/400x400/0369a1/ffffff?text=Water+Tank',  0),
(3, 14, 'Brass Bib Tap Half Inch',   'ब्रास बिब नल आधा इंच',    'ISI marked brass bib cock, half inch.',                           'ISI मार्क्ड ब्रास बिब कॉक, आधा इंच।',          'Generic',  '1/2"',  280.00,  0,      80,  'https://placehold.co/400x400/0284c7/ffffff?text=Tap',         0),
(3, 15, 'CPVC Pipe 1-inch 3m',       'CPVC पाइप 1 इंच 3मीटर',   'Chlorinated PVC pipe, 1 inch x 3 metre.',                        'CPVC पाइप, 1 इंच x 3 मीटर।',                  'Astral',   '3m',    320.00,  0,      120, 'https://placehold.co/400x400/0ea5e9/ffffff?text=Pipe',        1),
(3, 16, 'Ball Valve 3/4 Inch',       'बॉल वाल्व 3/4 इंच',        'Full bore brass ball valve, 3/4 inch.',                           'फुल बोर ब्रास बॉल वाल्व, 3/4 इंच।',           'Generic',  '3/4"',  190.00,  0,      100, 'https://placehold.co/400x400/38bdf8/ffffff?text=Valve',       0),
(3, 17, 'CPVC Elbow 90deg 1-inch',   'CPVC एल्बो 90° 1 इंच',    '90-degree CPVC elbow fitting, 1 inch.',                           'CPVC एल्बो फिटिंग, 90°, 1 इंच।',               'Astral',   '1"',    28.00,   0,      500, 'https://placehold.co/400x400/7dd3fc/ffffff?text=Elbow',       0),
(3, 18, 'CPVC T-Joint 1-inch',       'CPVC टी जॉइंट 1 इंच',     'Equal T-joint fitting, 1 inch CPVC.',                            'CPVC टी जॉइंट, 1 इंच।',                       'Astral',   '1"',    32.00,   0,      400, 'https://placehold.co/400x400/bae6fd/0369a1?text=T+Joint',     0),
(3, 19, 'CPVC Socket 1-inch',        'CPVC सॉकेट 1 इंच',         'Coupling socket, 1 inch CPVC.',                                  'CPVC सॉकेट, 1 इंच।',                           'Astral',   '1"',    18.00,   0,      600, 'https://placehold.co/400x400/e0f2fe/0369a1?text=Socket',      0),
(3, 20, 'PVC Nali 4-inch 1m',        'PVC नाली 4 इंच 1मीटर',    'PVC drainage channel, 4 inch, 1 metre.',                         'PVC नाली, 4 इंच, 1 मीटर।',                    'Generic',  '1m',    95.00,   0,      200, 'https://placehold.co/400x400/0369a1/ffffff?text=Nali',        0),
(3, 21, 'MS Angle Iron 40x40mm 6m',  'MS एंगल आयरन 40x40mm 6मीटर', 'Mild steel equal angle, 40x40x4mm, 6 metre.',                'MS एंगल आयरन, 40x40mm, 6 मीटर।',              'Generic',  '6m',    1800.00, 0,      25,  'https://placehold.co/400x400/374151/ffffff?text=Angle+Iron',  0),
(3, 22, 'Phool Jhadu Big',           'फूल झाड़ू बड़ा',           'Natural grass broom, big size.',                                  'प्राकृतिक घास की झाड़ू, बड़ी।',                'Generic',  NULL,    60.00,   0,      300, 'https://placehold.co/400x400/84cc16/ffffff?text=Jhadu',       0),
(3, 23, 'Plastic Tagari 16L',        'प्लास्टिक तगारी 16लीटर',  'Heavy duty plastic mortar tub, 16 litre.',                        'हेवी ड्यूटी प्लास्टिक तगारी, 16 लीटर।',       'Generic',  '16L',   120.00,  0,      100, 'https://placehold.co/400x400/65a30d/ffffff?text=Tagari',      0);

-- Products – Cement
INSERT INTO products (category_id, subcategory_id, name, hindi_name, description, hindi_description, brand, litres, price, discount, stock, image, is_new) VALUES
(4, NULL, 'Ultratech Cement 50kg', 'अल्ट्राटेक सीमेंट 50किग्रा', 'OPC 53 grade portland cement, 50 kg bag.', 'OPC 53 ग्रेड पोर्टलैंड सीमेंट, 50 किग्रा।', 'Ultratech', '50kg', 420.00, 10.00, 200, 'https://placehold.co/400x400/6b7280/ffffff?text=Cement', 0),
(4, NULL, 'Birla White Putty 20kg', 'बिरला व्हाइट पुट्टी 20किग्रा', 'Wall care putty, 20 kg bag. Smooth base coat before paint.', 'वॉल केयर पुट्टी, 20 किग्रा। पेंट से पहले बेस कोट।', 'Birla White', '20kg', 780.00, 30.00, 80, 'https://placehold.co/400x400/9ca3af/ffffff?text=Putty', 1);
