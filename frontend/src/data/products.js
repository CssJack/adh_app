// src/data/products.js
// Complete ADH product data — works 100% without any backend

// ─── CATEGORIES (used by HomePage) ───────────────────────────────────────────
export const categories = [
  {
    id: 1, name: 'Paints', slug: 'paints',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2, name: 'Plywood', slug: 'plywood',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3, name: 'Hardware', slug: 'hardware',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4, name: 'Cement & Putty', slug: 'cement-putty',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5, name: 'Iron Materials', slug: 'iron-materials',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
  },
  {
    id: 6, name: 'Light Fittings', slug: 'light-fittings',
    image: 'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg',
  },
  {
    id: 7, name: 'Adhesive', slug: 'adhesive',
    images: [
      'https://truewholesale.in/storage/product-images/17407342450.jpg',
      'https://5.imimg.com/data5/SELLER/Default/2023/1/MC/WX/AY/156837198/piditile-adhesive-wood-grip.jpg',
      'https://image.made-in-china.com/202f0j00uQAkcztqREgR/Maydos-White-Cement-Based-Flexible-Glue-for-Ceramic-Tiles.webp',
      'https://tiimg.tistatic.com/fp/1/007/382/kisan-pvc-cpvc-solvent-cement-for-industrial-use-594.jpg',
    ],
  },
  {
    id: 8, name: 'Water Fittings', slug: 'water-fittings',
    image: 'https://www.induskart.co.in/wp-content/uploads/2025/02/12.-The-Importance-of-Proper-Pipe-Fitting-Installation-in-Preventing-Leaks-.webp',
  },
];

// ─── SUBCATEGORIES (used by SubcategoryPage) ──────────────────────────────────
export const subcategories = [
  // Paints
  { id: 1, categorySlug: 'paints', name: 'Primer', slug: 'primer',
    image: 'https://tiimg.tistatic.com/fp/1/009/010/high-gloss-premium-primer-paint-162.jpg' },
  { id: 2, categorySlug: 'paints', name: 'Plastic Paint', slug: 'plastic-paint',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, categorySlug: 'paints', name: 'Oil Paint', slug: 'oil-paint',
    image: 'https://lntsufin.com/storage/mediafiles/catalog/live/15877-243/original/15877-243_image_0.jpg' },
  { id: 4, categorySlug: 'paints', name: 'Distemper', slug: 'distemper',
    image: 'https://assets.birlaopus.com/is/image/grasimindustries/pic1_distemperpaint?ts=1765189180810' },

  // Plywood
  { id: 5, categorySlug: 'plywood', name: 'Doors', slug: 'doors',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, categorySlug: 'plywood', name: 'Mica / Laminate', slug: 'mica',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop' },
  { id: 7, categorySlug: 'plywood', name: 'Plywood Sheets', slug: 'plywood-sheets',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop' },

  // Hardware
  { id: 8, categorySlug: 'hardware', name: 'Door Handles', slug: 'door-handles',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop' },
  { id: 9, categorySlug: 'hardware', name: 'Locks', slug: 'locks',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop' },
  { id: 15, categorySlug: 'hardware', name: 'Door Kit', slug: 'door-kit',
    image: 'https://placehold.co/400x300/78716c/ffffff?text=Door+Kit' },

  // Cement
  { id: 10, categorySlug: 'cement-putty', name: 'Wall Putty', slug: 'wall-putty',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop' },
  { id: 11, categorySlug: 'cement-putty', name: 'Cement Bags', slug: 'cement-bags',
    image: 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=1200&auto=format&fit=crop' },

  // Water Fittings
  { id: 12, categorySlug: 'water-fittings', name: 'UPVC', slug: 'upvc-fitting',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/5/SG/AU/WU/22985054/upvc-pipe-and-fittings-378-500x500.jpg' },
  { id: 13, categorySlug: 'water-fittings', name: 'CPVC', slug: 'cpvc-fitting',
    image: 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp' },
  { id: 14, categorySlug: 'water-fittings', name: 'GI Fittings', slug: 'gi-fitting',
    image: 'https://s.alicdn.com/@sc04/kf/H3d32b7c327a94b31a1c6981d07e6a835m.jpg_300x300.jpg' },

  // Adhesive
  { id: 16, categorySlug: 'adhesive', name: 'Fevicol / Wood Glue', slug: 'wood-glue',
    image: 'https://truewholesale.in/storage/product-images/17407342450.jpg' },
  { id: 17, categorySlug: 'adhesive', name: 'Tile Adhesive', slug: 'tile-adhesive',
    image: 'https://image.made-in-china.com/202f0j00uQAkcztqREgR/Maydos-White-Cement-Based-Flexible-Glue-for-Ceramic-Tiles.webp' },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
// All fields: id, subcategorySlug, name, hindiName, brand, size, price,
//             discount, stock, image, description, hindiDescription, isNew
export const products = [

  // ═══ PRIMER ═══
  {
    id: 1, subcategorySlug: 'primer',
    name: 'Asian Paints Wall Primer 20L', hindiName: 'एशियन पेंट्स वॉल प्राइमर 20लीटर',
    brand: 'Asian Paints', size: '20 Litre',
    price: 2500, discount: 100, stock: 40, isNew: false,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22731d8c6b?q=80&w=800&auto=format&fit=crop',
    description: 'Alkali resistant wall primer. Excellent coverage for interior and exterior surfaces.',
    hindiDescription: 'एल्काली प्रतिरोधी वॉल प्राइमर। इंटीरियर और एक्सटीरियर के लिए।',
  },
  {
    id: 2, subcategorySlug: 'primer',
    name: 'Berger Primer 10L', hindiName: 'बर्जर प्राइमर 10लीटर',
    brand: 'Berger', size: '10 Litre',
    price: 1400, discount: 50, stock: 60, isNew: false,
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Berger wall primer 10L. Good adhesion on plastered and concrete surfaces.',
    hindiDescription: 'बर्जर वॉल प्राइमर 10 लीटर।',
  },
  {
    id: 3, subcategorySlug: 'primer',
    name: 'Nerolac Primer 4L', hindiName: 'नेरोलैक प्राइमर 4लीटर',
    brand: 'Nerolac', size: '4 Litre',
    price: 680, discount: 0, stock: 80, isNew: false,
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Economy wall primer. Fast drying, smooth base for topcoat.',
    hindiDescription: 'इकॉनमी वॉल प्राइमर। फास्ट ड्राईंग।',
  },

  // ═══ PLASTIC PAINT ═══
  {
    id: 4, subcategorySlug: 'plastic-paint',
    name: 'Asian Apex Exterior 20L', hindiName: 'एशियन एपेक्स एक्सटीरियर 20लीटर',
    brand: 'Asian Paints', size: '20 Litre',
    price: 3200, discount: 150, stock: 30, isNew: true,
    image: 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium exterior emulsion. 100% waterproof, UV resistant, 6 year warranty.',
    hindiDescription: 'प्रीमियम एक्सटीरियर इमल्शन। 100% वाटरप्रूफ।',
  },
  {
    id: 5, subcategorySlug: 'plastic-paint',
    name: 'Asian Tractor Emulsion 10L', hindiName: 'एशियन ट्रैक्टर इमल्शन 10लीटर',
    brand: 'Asian Paints', size: '10 Litre',
    price: 1400, discount: 50, stock: 60, isNew: false,
    image: 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Economy interior emulsion. Smooth finish, washable, good coverage.',
    hindiDescription: 'इकॉनमी इंटीरियर इमल्शन। स्मूथ फिनिश।',
  },
  {
    id: 6, subcategorySlug: 'plastic-paint',
    name: 'Berger WeatherCoat 4L', hindiName: 'बर्जर वेदरकोट 4लीटर',
    brand: 'Berger', size: '4 Litre',
    price: 1250, discount: 0, stock: 45, isNew: false,
    image: 'https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Exterior waterproof paint. Protects against rain, sun, and cracking.',
    hindiDescription: 'एक्सटीरियर वाटरप्रूफ पेंट। बारिश और धूप से सुरक्षा।',
  },

  // ═══ OIL PAINT ═══
  {
    id: 7, subcategorySlug: 'oil-paint',
    name: 'Nerolac Enamel Oil Paint 1L', hindiName: 'नेरोलैक इनेमल ऑयल पेंट 1लीटर',
    brand: 'Nerolac', size: '1 Litre',
    price: 380, discount: 20, stock: 100, isNew: false,
    image: 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'High gloss enamel oil paint. For wood, metal, and grills. Durable, washable.',
    hindiDescription: 'हाई ग्लॉस इनेमल पेंट। लकड़ी और धातु के लिए।',
  },
  {
    id: 8, subcategorySlug: 'oil-paint',
    name: 'Asian Enamel Paint 4L', hindiName: 'एशियन इनेमल पेंट 4लीटर',
    brand: 'Asian Paints', size: '4 Litre',
    price: 1350, discount: 50, stock: 60, isNew: false,
    image: 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium enamel 4L. High sheen, hard film, excellent coverage for all surfaces.',
    hindiDescription: 'प्रीमियम इनेमल 4 लीटर। हाई शीन।',
  },
  {
    id: 9, subcategorySlug: 'oil-paint',
    name: 'Berger Luxol Enamel 1L', hindiName: 'बर्जर लक्सोल इनेमल 1लीटर',
    brand: 'Berger', size: '1 Litre',
    price: 340, discount: 0, stock: 90, isNew: false,
    image: 'https://images.pexels.com/photos/5691613/pexels-photo-5691613.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Berger Luxol enamel. Durable glossy finish. For doors, windows, furniture.',
    hindiDescription: 'बर्जर लक्सोल इनेमल। चमकदार फिनिश।',
  },

  // ═══ DISTEMPER ═══
  {
    id: 10, subcategorySlug: 'distemper',
    name: 'Tractor Distemper 5kg', hindiName: 'ट्रैक्टर डिस्टेम्पर 5किग्रा',
    brand: 'Asian Paints', size: '5 kg',
    price: 420, discount: 0, stock: 90, isNew: false,
    image: 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Economy dry distemper 5 kg. Smooth finish for interior walls. Easy application.',
    hindiDescription: 'इकॉनमी ड्राई डिस्टेम्पर 5 किग्रा।',
  },
  {
    id: 11, subcategorySlug: 'distemper',
    name: 'Nerolac Distemper 10kg', hindiName: 'नेरोलैक डिस्टेम्पर 10किग्रा',
    brand: 'Nerolac', size: '10 kg',
    price: 780, discount: 30, stock: 70, isNew: false,
    image: 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Washable acrylic distemper 10 kg. Better coverage than dry distemper.',
    hindiDescription: 'धोने योग्य एक्रेलिक डिस्टेम्पर 10 किग्रा।',
  },
  {
    id: 12, subcategorySlug: 'distemper',
    name: 'Berger Distemper 20kg', hindiName: 'बर्जर डिस्टेम्पर 20किग्रा',
    brand: 'Berger', size: '20 kg',
    price: 1400, discount: 50, stock: 40, isNew: false,
    image: 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Berger Bison distemper 20 kg. Economical, good for large areas.',
    hindiDescription: 'बर्जर बाइसन डिस्टेम्पर 20 किग्रा।',
  },

  // ═══ DOORS ═══
  {
    id: 13, subcategorySlug: 'doors',
    name: 'Century Flush Door 7ft', hindiName: 'सेंचुरी फ्लश दरवाजा 7फीट',
    brand: 'Century', size: '7ft × 3ft × 30mm',
    price: 4500, discount: 200, stock: 20, isNew: false,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
    description: 'Century BWR grade flush door. ISI marked. Excellent durability.',
    hindiDescription: 'सेंचुरी BWR ग्रेड फ्लश दरवाजा। ISI मार्क्ड।',
  },
  {
    id: 14, subcategorySlug: 'doors',
    name: 'Greenply Flush Door 7ft', hindiName: 'ग्रीनप्लाई फ्लश दरवाजा 7फीट',
    brand: 'Greenply', size: '7ft × 3ft × 32mm',
    price: 5200, discount: 300, stock: 15, isNew: true,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
    description: 'Premium BWP flush door. Waterproof, termite proof, smooth finish.',
    hindiDescription: 'प्रीमियम BWP फ्लश दरवाजा। वाटरप्रूफ, दीमक प्रतिरोधी।',
  },
  {
    id: 15, subcategorySlug: 'doors',
    name: 'Sintex PVC Door 7ft', hindiName: 'सिंटेक्स PVC दरवाजा 7फीट',
    brand: 'Sintex', size: '7ft × 3ft',
    price: 3200, discount: 150, stock: 12, isNew: true,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
    description: 'Waterproof PVC door for bathroom/toilet. No swelling, no termites.',
    hindiDescription: 'बाथरूम के लिए PVC दरवाजा। सूजन नहीं, दीमक नहीं।',
  },

  // ═══ MICA ═══
  {
    id: 16, subcategorySlug: 'mica',
    name: 'Merino High Gloss White Mica', hindiName: 'मेरिनो हाई ग्लॉस व्हाइट माइका',
    brand: 'Merino', size: '8×4 ft',
    price: 950, discount: 50, stock: 80, isNew: true,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop',
    description: 'High gloss white laminate. Scratch resistant. Ideal for kitchen cabinets.',
    hindiDescription: 'हाई ग्लॉस सफेद लैमिनेट। खरोंच प्रतिरोधी।',
  },
  {
    id: 17, subcategorySlug: 'mica',
    name: 'Greenlam Oak Wood Finish Mica', hindiName: 'ग्रीनलैम ओक वुड फिनिश माइका',
    brand: 'Greenlam', size: '8×4 ft',
    price: 1150, discount: 0, stock: 45, isNew: false,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop',
    description: 'Realistic oak wood grain texture. Perfect for luxury furniture.',
    hindiDescription: 'ओक वुड टेक्सचर। लग्जरी फर्नीचर के लिए।',
  },
  {
    id: 18, subcategorySlug: 'mica',
    name: 'Merino Matte Grey Mica', hindiName: 'मेरिनो मैट ग्रे माइका',
    brand: 'Merino', size: '8×4 ft',
    price: 1000, discount: 0, stock: 50, isNew: false,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop',
    description: 'Soft matte grey laminate. Fingerprint resistant. Modern look.',
    hindiDescription: 'मैट ग्रे लैमिनेट। फिंगरप्रिंट प्रतिरोधी।',
  },

  // ═══ PLYWOOD SHEETS ═══
  {
    id: 19, subcategorySlug: 'plywood-sheets',
    name: 'Greenply BWR Ply 19mm', hindiName: 'ग्रीनप्लाई BWR प्लाई 19mm',
    brand: 'Greenply', size: '8×4 ft, 19mm',
    price: 3200, discount: 100, stock: 50, isNew: false,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop',
    description: 'Boiling Water Resistant plywood 19mm. Best for kitchen and bathroom furniture.',
    hindiDescription: 'उबलते पानी प्रतिरोधी प्लाईवुड 19mm।',
  },
  {
    id: 20, subcategorySlug: 'plywood-sheets',
    name: 'Century MR Ply 12mm', hindiName: 'सेंचुरी MR प्लाई 12mm',
    brand: 'Century', size: '8×4 ft, 12mm',
    price: 1600, discount: 0, stock: 55, isNew: false,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop',
    description: 'Century MR ply 12mm. Economical, smooth surface for light furniture.',
    hindiDescription: 'सेंचुरी MR प्लाई 12mm। किफायती।',
  },
  {
    id: 21, subcategorySlug: 'plywood-sheets',
    name: 'Marine Ply 19mm', hindiName: 'मरीन प्लाई 19mm',
    brand: 'Greenply', size: '8×4 ft, 19mm',
    price: 4800, discount: 0, stock: 20, isNew: false,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop',
    description: 'IS 710 certified marine plywood. Extreme water resistance.',
    hindiDescription: 'IS 710 मरीन प्लाईवुड। अत्यधिक जल प्रतिरोधी।',
  },

  // ═══ DOOR HANDLES ═══
  {
    id: 22, subcategorySlug: 'door-handles',
    name: 'Godrej SS Door Handle', hindiName: 'गोदरेज SS डोर हैंडल',
    brand: 'Godrej', size: 'Standard',
    price: 450, discount: 30, stock: 100, isNew: false,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    description: 'Stainless steel door handle. Smooth operation, rust-free finish.',
    hindiDescription: 'स्टेनलेस स्टील डोर हैंडल। रस्ट-फ्री।',
  },
  {
    id: 23, subcategorySlug: 'door-handles',
    name: 'Brass Mortise Handle Set', hindiName: 'ब्रास मॉर्टिस हैंडल सेट',
    brand: 'Generic', size: 'Standard',
    price: 680, discount: 0, stock: 60, isNew: false,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    description: 'Brass mortise handle set. Heavy duty, chrome finish.',
    hindiDescription: 'ब्रास मॉर्टिस हैंडल सेट। क्रोम फिनिश।',
  },

  // ═══ LOCKS ═══
  {
    id: 24, subcategorySlug: 'locks',
    name: 'Godrej Digital Door Lock', hindiName: 'गोदरेज डिजिटल डोर लॉक',
    brand: 'Godrej', size: 'Standard',
    price: 3500, discount: 200, stock: 25, isNew: true,
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop',
    description: 'Smart digital door lock. Keypad + key backup. Easy installation.',
    hindiDescription: 'स्मार्ट डिजिटल डोर लॉक। कीपैड + की बैकअप।',
  },
  {
    id: 25, subcategorySlug: 'locks',
    name: 'Godrej Mortise Lock 3-Lever', hindiName: 'गोदरेज मॉर्टिस लॉक 3 लीवर',
    brand: 'Godrej', size: 'Standard',
    price: 850, discount: 50, stock: 80, isNew: false,
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop',
    description: 'Godrej 3-lever mortise lock. ISI marked. High security.',
    hindiDescription: 'गोदरेज 3 लीवर मॉर्टिस लॉक। ISI मार्क्ड।',
  },

  // ═══ DOOR KIT ═══
  {
    id: 26, subcategorySlug: 'door-kit',
    name: 'Full Door Kit SS', hindiName: 'फुल डोर किट SS',
    brand: 'Generic', size: 'Full Set',
    price: 850, discount: 50, stock: 45, isNew: true,
    image: 'https://placehold.co/400x400/78716c/ffffff?text=Door+Kit',
    description: 'Complete SS door fitting kit. Includes hinges, lock, handle, stopper.',
    hindiDescription: 'SS डोर फिटिंग किट। हिंज, ताला, हैंडल, स्टॉपर।',
  },

  // ═══ WALL PUTTY ═══
  {
    id: 27, subcategorySlug: 'wall-putty',
    name: 'Birla White Wall Putty 20kg', hindiName: 'बिरला व्हाइट वॉल पुट्टी 20किग्रा',
    brand: 'Birla White', size: '20 kg',
    price: 780, discount: 30, stock: 80, isNew: false,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    description: 'Wall care putty 20 kg. Smooth base before paint. Excellent whiteness.',
    hindiDescription: 'वॉल केयर पुट्टी 20 किग्रा।',
  },
  {
    id: 28, subcategorySlug: 'wall-putty',
    name: 'Asian Wall Putty 10kg', hindiName: 'एशियन वॉल पुट्टी 10किग्रा',
    brand: 'Asian Paints', size: '10 kg',
    price: 420, discount: 0, stock: 100, isNew: false,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    description: 'Asian Wall Putty 10 kg. Smooth finish, water resistant.',
    hindiDescription: 'एशियन वॉल पुट्टी 10 किग्रा।',
  },

  // ═══ CEMENT BAGS ═══
  {
    id: 29, subcategorySlug: 'cement-bags',
    name: 'Ultratech Cement 50kg', hindiName: 'अल्ट्राटेक सीमेंट 50किग्रा',
    brand: 'Ultratech', size: '50 kg',
    price: 420, discount: 10, stock: 200, isNew: false,
    image: 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800&auto=format&fit=crop',
    description: 'OPC 53 grade portland cement 50 kg. For all construction purposes.',
    hindiDescription: 'OPC 53 ग्रेड पोर्टलैंड सीमेंट 50 किग्रा।',
  },
  {
    id: 30, subcategorySlug: 'cement-bags',
    name: 'ACC Gold Cement 50kg', hindiName: 'ACC गोल्ड सीमेंट 50किग्रा',
    brand: 'ACC', size: '50 kg',
    price: 410, discount: 0, stock: 150, isNew: false,
    image: 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=800&auto=format&fit=crop',
    description: 'ACC Gold cement 50 kg. High strength, quick setting, weather resistant.',
    hindiDescription: 'ACC गोल्ड सीमेंट 50 किग्रा। हाई स्ट्रेंथ।',
  },

  // ═══ CPVC FITTINGS ═══
  {
    id: 31, subcategorySlug: 'cpvc-fitting',
    name: 'Astral CPVC Pipe 1-inch 3m', hindiName: 'Astral CPVC पाइप 1 इंच 3मीटर',
    brand: 'Astral', size: '1 inch × 3m',
    price: 320, discount: 0, stock: 120, isNew: true,
    image: 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp',
    description: 'CPVC pipe 1 inch × 3 metre. For hot and cold water supply lines.',
    hindiDescription: 'CPVC पाइप 1 इंच × 3 मीटर।',
  },
  {
    id: 32, subcategorySlug: 'cpvc-fitting',
    name: 'Astral CPVC Elbow 1-inch', hindiName: 'Astral CPVC एल्बो 1 इंच',
    brand: 'Astral', size: '1 inch',
    price: 28, discount: 0, stock: 500, isNew: false,
    image: 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp',
    description: '90-degree CPVC elbow 1 inch. For direction change in plumbing.',
    hindiDescription: 'CPVC एल्बो 1 इंच।',
  },
  {
    id: 33, subcategorySlug: 'cpvc-fitting',
    name: 'Astral CPVC T-Joint 1-inch', hindiName: 'Astral CPVC टी जॉइंट 1 इंच',
    brand: 'Astral', size: '1 inch',
    price: 32, discount: 0, stock: 400, isNew: false,
    image: 'https://utkarshpipes.in/assets/upload/product-image/c69e419c9a9994671ef891eca4cff5b4.webp',
    description: 'Equal T-joint 1 inch CPVC. For branch pipe connections.',
    hindiDescription: 'CPVC टी जॉइंट 1 इंच।',
  },

  // ═══ WOOD GLUE ═══
  {
    id: 34, subcategorySlug: 'wood-glue',
    name: 'Pidilite Fevicol SH 1kg', hindiName: 'पिडिलाइट फेविकोल SH 1किग्रा',
    brand: 'Pidilite', size: '1 kg',
    price: 290, discount: 0, stock: 200, isNew: false,
    image: 'https://truewholesale.in/storage/product-images/17407342450.jpg',
    description: 'Synthetic resin adhesive 1 kg. Industry standard wood glue. Strong bond.',
    hindiDescription: 'सिंथेटिक रेजिन गोंद 1 किग्रा।',
  },
  {
    id: 35, subcategorySlug: 'wood-glue',
    name: 'Pidilite Fevicol SH 5kg', hindiName: 'पिडिलाइट फेविकोल SH 5किग्रा',
    brand: 'Pidilite', size: '5 kg',
    price: 1200, discount: 50, stock: 100, isNew: false,
    image: 'https://truewholesale.in/storage/product-images/17407342450.jpg',
    description: 'Fevicol SH 5 kg bulk pack. For large carpentry projects.',
    hindiDescription: 'फेविकोल SH 5 किग्रा।',
  },
  {
    id: 36, subcategorySlug: 'wood-glue',
    name: 'Woodgrip Adhesive 500ml', hindiName: 'वुडग्रिप एडहेसिव 500ml',
    brand: 'Woodgrip', size: '500 ml',
    price: 180, discount: 0, stock: 150, isNew: false,
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/1/MC/WX/AY/156837198/piditile-adhesive-wood-grip.jpg',
    description: 'High strength wood bonding adhesive. For laminates and plywood edges.',
    hindiDescription: 'वुड एडहेसिव 500ml।',
  },
];
