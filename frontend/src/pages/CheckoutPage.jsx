// src/pages/CheckoutPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  MapPin,
  Store,
  CreditCard,
  Wallet,
  User,
  Phone
} from 'lucide-react';

import { useApp } from '../context/AppContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CheckoutPage() {

  const navigate = useNavigate();

  const { cart, cartTotal, cartDiscount, clearCart, user } = useApp();
  const cartItems  = cart;
  const finalTotal = cartTotal - (cartDiscount || 0);

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [form, setForm] = useState({
    customer_name:  user?.name  || '',
    phone:          user?.phone || '',
    address:        '',
    landmark:       '',
    delivery_type:  'pickup',
    payment_method: 'cod',
  });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  // ============================
  // PLACE ORDER
  // ============================
  const handlePlaceOrder = async () => {

    if (!cartItems.length)              return setError('Cart is empty.');
    if (!form.customer_name.trim())     return setError('Please enter your name.');
    if (!form.phone.trim())             return setError('Please enter phone number.');
    if (!form.address.trim())           return setError('Please enter your address.');

    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adh_token');

      const payload = {
        customer_name:  form.customer_name.trim(),
        phone:          form.phone.trim(),
        address:        form.address.trim(),
        landmark:       form.landmark.trim(),
        delivery_type:  form.delivery_type,
        payment_method: form.payment_method,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity:   item.qty,
          price:      item.price,
          name:       item.name,
        })),
      };

      const { data } = await axios.post(
        `${API}/orders`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        clearCart();
        navigate(`/order-success/${data.orderId}`);
      } else {
        setError(data.message || 'Failed to place order.');
      }

    } catch (err) {
      setError(err?.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-44">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-zinc-900">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </header>

      <main className="px-4 py-4 pb-56 space-y-5">

        {/* ── DELIVERY METHOD ───────────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() => set('delivery_type', 'pickup')}
              className={`rounded-3xl border p-5 flex flex-col items-center justify-center gap-3 transition-all
                ${form.delivery_type === 'pickup'
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-zinc-700 bg-zinc-800'}`}
            >
              <Store size={28} className={form.delivery_type === 'pickup' ? 'text-orange-400' : 'text-zinc-400'} />
              <div className="text-center">
                <p className="font-bold">Store Pickup</p>
                <p className="text-xs text-zinc-400 mt-0.5">Collect from store</p>
              </div>
            </button>

            <button
              onClick={() => set('delivery_type', 'delivery')}
              className={`rounded-3xl border p-5 flex flex-col items-center justify-center gap-3 transition-all
                ${form.delivery_type === 'delivery'
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-zinc-700 bg-zinc-800'}`}
            >
              <MapPin size={28} className={form.delivery_type === 'delivery' ? 'text-orange-400' : 'text-zinc-400'} />
              <div className="text-center">
                <p className="font-bold">Home Delivery</p>
                <p className="text-xs text-zinc-400 mt-0.5">Delivered to you</p>
              </div>
            </button>

          </div>
        </div>

        {/* ── CONTACT DETAILS — always visible ─────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
          <h2 className="text-xl font-bold">Contact Details</h2>

          <div className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3">
            <User size={18} className="text-zinc-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Full Name *"
              value={form.customer_name}
              onChange={e => set('customer_name', e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500"
            />
          </div>

          <div className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3">
            <Phone size={18} className="text-zinc-400 flex-shrink-0" />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500"
            />
          </div>
        </div>

        {/* ── ADDRESS — always visible ──────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
          <h2 className="text-xl font-bold">
            {form.delivery_type === 'pickup' ? 'Your Address' : 'Delivery Address'}
          </h2>

          {form.delivery_type === 'pickup' && (
            <p className="text-xs text-zinc-500 bg-zinc-800 rounded-2xl px-4 py-2.5">
              📍 You'll collect from our store. We still need your address for our records.
            </p>
          )}

          <div className="flex items-start gap-3 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3">
            <MapPin size={18} className="text-zinc-400 flex-shrink-0 mt-0.5" />
            <textarea
              placeholder="House/Flat No., Street, Area *"
              value={form.address}
              onChange={e => set('address', e.target.value)}
              rows={3}
              className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500 resize-none"
            />
          </div>

          <input
            type="text"
            placeholder="Landmark (optional)"
            value={form.landmark}
            onChange={e => set('landmark', e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none text-white placeholder-zinc-500"
          />
        </div>

        {/* ── PAYMENT ───────────────────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() => set('payment_method', 'cod')}
              className={`rounded-3xl border p-5 flex flex-col items-center justify-center gap-3 transition-all
                ${form.payment_method === 'cod'
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-zinc-700 bg-zinc-800'}`}
            >
              <Wallet size={28} className={form.payment_method === 'cod' ? 'text-orange-400' : 'text-zinc-400'} />
              <p className="font-bold">Cash on Delivery</p>
            </button>

            <button
              onClick={() => set('payment_method', 'online')}
              className={`rounded-3xl border p-5 flex flex-col items-center justify-center gap-3 transition-all
                ${form.payment_method === 'online'
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-zinc-700 bg-zinc-800'}`}
            >
              <CreditCard size={28} className={form.payment_method === 'online' ? 'text-orange-400' : 'text-zinc-400'} />
              <p className="font-bold">UPI / Online</p>
            </button>

          </div>
        </div>

        {/* ── ORDER SUMMARY ─────────────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || 'https://placehold.co/56x56/f97316/ffffff?text=ADH'}
                    alt={item.name}
                    className="h-14 w-14 rounded-2xl object-cover flex-shrink-0"
                    onError={e => { e.target.src = 'https://placehold.co/56x56/f97316/ffffff?text=ADH'; }}
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-zinc-400">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="font-bold text-orange-400 text-lg">
                  ₹{(parseFloat(item.price) * item.qty).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-zinc-400">Total ({cartItems.reduce((s,i) => s+i.qty, 0)} items)</p>
            <p className="text-2xl font-bold text-orange-400">₹{finalTotal.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-2xl px-4 py-3 text-sm">
            ⚠️ {error}
          </div>
        )}

      </main>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-16 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-4 py-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Amount to Pay</p>
            <p className="text-2xl font-bold text-orange-400">₹{finalTotal.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg disabled:opacity-50"
          >
            {loading ? 'Placing...' : 'Place Order 🛒'}
          </button>
        </div>
      </div>

    </div>
  );
}
