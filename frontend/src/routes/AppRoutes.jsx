// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LanguagePage   from '../pages/LanguagePage';
import HomePage       from '../pages/HomePage';
import LoginPage      from '../pages/LoginPage';
import RegisterPage   from '../pages/RegisterPage';
import ProductsPage   from '../pages/ProductsPage';
import ProductDetail  from '../pages/ProductDetail';
import CartPage       from '../pages/CartPage';
import CheckoutPage   from '../pages/CheckoutPage';
import OrdersPage     from '../pages/OrdersPage';
import MenuPage       from '../pages/MenuPage';
import ForgotPassword from '../pages/ForgotPassword';
import SubcategoryPage from '../pages/SubcategoryPage';

function LangGuard({ children }) {
  const lang = localStorage.getItem('adh_lang');
  if (!lang) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<LanguagePage />} />
      <Route path="/home"        element={<LangGuard><HomePage /></LangGuard>} />
      <Route path="/login"       element={<LangGuard><LoginPage /></LangGuard>} />
      <Route path="/register"    element={<LangGuard><RegisterPage /></LangGuard>} />
      <Route path="/forgot-password" element={<LangGuard><ForgotPassword /></LangGuard>} />

      {/* Category → Subcategory → Products flow */}
      <Route path="/category/:categorySlug"     element={<LangGuard><SubcategoryPage /></LangGuard>} />
      <Route path="/subcategory/:subcategorySlug" element={<LangGuard><ProductsPage /></LangGuard>} />
      <Route path="/products"    element={<LangGuard><ProductsPage /></LangGuard>} />
      <Route path="/product/:id" element={<LangGuard><ProductDetail /></LangGuard>} />

      <Route path="/cart"        element={<LangGuard><CartPage /></LangGuard>} />
      <Route path="/checkout"    element={<LangGuard><CheckoutPage /></LangGuard>} />
      <Route path="/orders"      element={<LangGuard><OrdersPage /></LangGuard>} />
      <Route path="/menu"        element={<LangGuard><MenuPage /></LangGuard>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
