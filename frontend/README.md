ADH Order Management System — Integration Guide
Files Delivered
Backend (copy to your project root)
```
backend/
├── controllers/
│   ├── orderController.js       ← REPLACE existing
│   ├── adminOrderController.js  ← NEW
│   └── notificationController.js← NEW
├── routes/
│   ├── orderRoutes.js           ← REPLACE existing
│   ├── adminRoutes.js           ← REPLACE existing
│   └── notificationRoutes.js   ← NEW
└── server.js                    ← REPLACE existing
```
Frontend (copy to src/)
```
frontend/src/
├── pages/
│   ├── CheckoutPage.jsx         ← NEW
│   ├── OrderSuccessPage.jsx     ← NEW
│   └── OrdersPage.jsx           ← REPLACE existing
└── components/
    └── NotificationBell.jsx     ← NEW
```
Admin Panel
```
admin-orders.html   ← Open in browser (standalone, no build needed)
```
Database
```
migrations.sql      ← Run ONCE on your existing adh\_store database
```
---
Step 1 — Run Database Migration
```bash
mysql -u root -p adh\_store < migrations.sql
```
This ALTERs your `orders` table (adds new columns) and CREATEs the `notifications` table.
Your existing data is preserved.
---
Step 2 — Backend Files
Copy the backend files to your project:
```
controllers/orderController.js       → REPLACE yours
controllers/adminOrderController.js  → NEW file
controllers/notificationController.js → NEW file
routes/orderRoutes.js                → REPLACE yours
routes/adminRoutes.js                → REPLACE yours
routes/notificationRoutes.js         → NEW file
server.js                            → REPLACE yours
```
Then restart your server:
```bash
node server.js
# or
nodemon server.js
```
---
Step 3 — Frontend Files
Copy to your React project:
```
src/pages/CheckoutPage.jsx        → NEW
src/pages/OrderSuccessPage.jsx    → NEW
src/pages/OrdersPage.jsx          → REPLACE existing
src/components/NotificationBell.jsx → NEW
```
Add routes in App.jsx
```jsx
import CheckoutPage     from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage       from './pages/OrdersPage';

// Inside <Routes>:
<Route path="/checkout"                element={<CheckoutPage />} />
<Route path="/order-success/:orderId"  element={<OrderSuccessPage />} />
<Route path="/orders"                  element={<OrdersPage />} />
```
Add NotificationBell to Navbar.jsx
```jsx
import NotificationBell from './NotificationBell';

// In Navbar JSX near cart/profile icons:
<NotificationBell />
```
---
Step 4 — Open Admin Order Dashboard
Simply open `admin-orders.html` in your browser.
Login with any admin account. The dashboard:
Auto-refreshes every 8 seconds
Shows all orders by status
"Take Order" is atomic — first admin to click gets it
Only the assigned admin can advance the order
Any admin can cancel
---
API Reference
Method	Endpoint	Auth	Description
POST	/api/orders	Customer JWT	Place order
GET	/api/orders/my-orders	Customer JWT	My orders
GET	/api/admin/orders	Admin JWT	All orders
GET	/api/admin/orders?status=Pending	Admin JWT	Filter by status
POST	/api/admin/orders/:id/assign	Admin JWT	Take order (atomic)
PUT	/api/admin/orders/:id/status	Admin JWT	Update status
GET	/api/notifications	Any JWT	Get notifications
PUT	/api/notifications/read-all	Any JWT	Mark all read
PUT	/api/notifications/:id/read	Any JWT	Mark one read
---
Order Status Flow
```
Cart → Checkout → \[Pending]
                      ↓ Admin clicks "Take Order" (atomic lock)
                  \[Assigned]
                      ↓ Assigned admin clicks "Start Packing"
                  \[Packing]   ← Customer notified
                      ↓ Assigned admin clicks "Mark Ready"
                  \[Ready For Pickup]  ← Customer notified
                      ↓ Assigned admin clicks "Complete Order"
                  \[Completed]
                  
  Any stage → \[Cancelled] (any admin)
```
---
Multi-Admin Conflict Prevention
The `assignOrder` endpoint uses `SELECT ... FOR UPDATE` (row-level lock inside a transaction).
Admin A and Admin B both see a Pending order
Both click "Take Order" at the same moment
The database serializes them — first one wins
Second one gets: `"Order is already Assigned"` — displayed as a toast error
No double-packing possible ✅
---
Notification Types
Type	Trigger	Recipient
`order\_placed`	Customer places order	Customer
`new\_order`	Customer places order	All admins
`order\_assigned`	Admin takes order	Customer
`order\_packing`	Admin starts packing	Customer
`order\_ready`	Order ready for pickup	Customer
`order\_completed`	Order completed	Customer
`order\_cancelled`	Order cancelled	Customer
