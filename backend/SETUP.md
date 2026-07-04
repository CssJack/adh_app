# ADH Backend – Complete Setup Guide

## Project Structure

```
adh-backend/                   ← This folder (Node.js backend)
├── config/
│   └── db.js                  # MySQL connection pool
├── controllers/
│   ├── authController.js      # Register, Login, GetMe
│   ├── productController.js   # Categories, Products
│   ├── cartController.js      # Cart CRUD
│   └── orderController.js     # Place order, My orders
├── middleware/
│   └── auth.js                # JWT verifyToken middleware
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── schema.sql                 # Full MySQL schema + seed data
├── server.js                  # Express app entry point
├── .env                       # Environment variables
└── package.json

frontend-integration/          ← Files to COPY into your adh-app
├── api.js                     # → copy to src/utils/api.js
├── AppContext.jsx              # → REPLACE src/context/AppContext.jsx
├── LoginPage.jsx              # → REPLACE src/pages/LoginPage.jsx
├── RegisterPage.jsx           # → REPLACE src/pages/RegisterPage.jsx
├── ProductsPage.jsx           # → REPLACE src/pages/ProductsPage.jsx
├── ProductDetail.jsx          # → REPLACE src/pages/ProductDetail.jsx
├── CheckoutPage.jsx           # → REPLACE src/pages/CheckoutPage.jsx
├── OrdersPage.jsx             # → REPLACE src/pages/OrdersPage.jsx
└── .env.example               # → copy to adh-app/.env
```

---

## Step 1 – MySQL Setup

Make sure MySQL is running. Then:

```bash
mysql -u root -p < schema.sql
```

This creates the `adh_store` database with all tables and 28 seed products.

---

## Step 2 – Backend Setup

```bash
cd adh-backend

# Install dependencies
npm install

# Edit .env with your MySQL credentials
# DB_PASSWORD=your_actual_mysql_password

# Run in development mode (auto-restarts)
npm run dev

# Or in production
npm start
```

Backend runs at **http://localhost:5000**

Test it: http://localhost:5000/api/health

---

## Step 3 – Frontend Integration

### 3a. Install axios

```bash
cd adh-app
npm install axios
```

### 3b. Copy integration files

```bash
# Create utils folder if it doesn't exist
mkdir -p src/utils

# Copy API service
cp ../adh-backend/frontend-integration/api.js src/utils/api.js

# Replace updated pages
cp ../adh-backend/frontend-integration/AppContext.jsx src/context/AppContext.jsx
cp ../adh-backend/frontend-integration/LoginPage.jsx  src/pages/LoginPage.jsx
cp ../adh-backend/frontend-integration/RegisterPage.jsx src/pages/RegisterPage.jsx
cp ../adh-backend/frontend-integration/ProductsPage.jsx src/pages/ProductsPage.jsx
cp ../adh-backend/frontend-integration/ProductDetail.jsx src/pages/ProductDetail.jsx
cp ../adh-backend/frontend-integration/CheckoutPage.jsx src/pages/CheckoutPage.jsx
cp ../adh-backend/frontend-integration/OrdersPage.jsx  src/pages/OrdersPage.jsx
```

### 3c. Add .env to frontend

Create `adh-app/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3d. Run frontend

```bash
cd adh-app
npm run dev
```

Frontend at **http://localhost:5173**

---

## API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login with phone + password |
| GET | `/api/auth/me` | Yes | Get current user profile |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/categories` | No | All categories |
| GET | `/api/subcategories/:catId` | No | Subcategories by category |
| GET | `/api/products` | No | All products (supports ?search=&category=&isNew=&sort=) |
| GET | `/api/products/:id` | No | Single product + similar products |
| GET | `/api/products/category/:catId` | No | Products by category |
| GET | `/api/products/subcategory/:subId` | No | Products by subcategory |

### Cart (requires Bearer token)
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/cart` | – | Get user's cart |
| POST | `/api/cart/add` | `{ product_id, quantity }` | Add item |
| PUT | `/api/cart/update/:id` | `{ quantity }` | Update quantity |
| DELETE | `/api/cart/remove/:id` | – | Remove item |
| DELETE | `/api/cart/clear` | – | Clear entire cart |

### Orders (requires Bearer token)
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | `{ address, payment_method }` | Place order (reduces stock, clears cart) |
| GET | `/api/orders/my-orders` | – | All user orders |
| GET | `/api/orders/:id` | – | Single order detail |

---

## Auth Flow

1. User registers → JWT token returned → stored in `localStorage` as `adh_token`
2. All subsequent API requests send `Authorization: Bearer <token>`
3. Cart is synced from server on login
4. Logout clears `adh_token` and empties local cart

---

## Hindi / English Field Mapping

The backend stores both fields. Frontend uses language context to pick:

```js
const displayName = lang === 'hi' ? product.hindi_name : product.name;
const displayDesc = lang === 'hi' ? product.hindi_description : product.description;
```

---

## Future: Cloudinary Image Upload

In `productController.js`, images are stored as URLs.
To add Cloudinary:
1. `npm install cloudinary multer multer-storage-cloudinary`
2. Create `utils/cloudinary.js` with credentials
3. Add a `POST /api/admin/products` route with `multer` middleware
4. Store `result.secure_url` in the `image` column

---

## Common Issues

| Issue | Fix |
|---|---|
| `Access denied for user 'root'@'localhost'` | Update `DB_PASSWORD` in `.env` |
| `CORS error` from frontend | Ensure `CLIENT_URL=http://localhost:5173` in `.env` |
| `jwt malformed` | Clear `adh_token` from localStorage and login again |
| Port 5000 already in use | Change `PORT=5001` in `.env` and `VITE_API_URL` in frontend `.env` |
