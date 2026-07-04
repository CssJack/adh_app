// src/pages/OrdersPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';
import { HiArrowLeft } from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS_COLORS = {
  'Pending':          'bg-yellow-500/20 text-yellow-400',
  'Assigned':         'bg-blue-500/20 text-blue-400',
  'Packing':          'bg-purple-500/20 text-purple-400',
  'Ready For Pickup': 'bg-orange-500/20 text-orange-400',
  'Completed':        'bg-green-500/20 text-green-400',
  'Cancelled':        'bg-red-500/20 text-red-400',
};

const STATUS_EMOJI = {
  'Pending':          '⏳',
  'Assigned':         '👷',
  'Packing':          '📦',
  'Ready For Pickup': '🏪',
  'Completed':        '✅',
  'Cancelled':        '❌',
};

const TAB_FILTERS = {
  current:   o => ['Pending', 'Assigned', 'Packing', 'Ready For Pickup'].includes(o.status),
  previous:  o => o.status === 'Completed',
  cancelled: o => o.status === 'Cancelled',
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [tab, setTab]       = useState('current');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    if (!user) { setLoading(false); return; }
    const token = localStorage.getItem('adh_token');
    axios
      .get(`${API}/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setOrders(r.data.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 15 seconds for live status updates
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, [user]);

  const visible = orders.filter(TAB_FILTERS[tab]);
  const tabs = [
    { key: 'current',   label: 'Current' },
    { key: 'previous',  label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="sticky top-0 z-50 bg-zinc-900 px-4 pt-3 pb-0 shadow-md">
        <div className="flex items-center gap-3 pb-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-zinc-800">
            <HiArrowLeft className="text-xl" />
          </button>
          <h2 className="text-sm font-semibold">My Orders</h2>
        </div>
        <div className="flex border-b border-zinc-800">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 text-xs font-semibold py-2.5 border-b-2 transition-colors
                ${tab === t.key ? 'text-orange-400 border-orange-500' : 'text-zinc-500 border-transparent'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 pb-24 overflow-y-auto px-4 pt-4">
        {!user && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <p className="text-4xl mb-3">🔐</p>
            <p className="text-base font-semibold mb-4">Please login to see your orders</p>
            <button onClick={() => navigate('/login')} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold">
              Login
            </button>
          </div>
        )}

        {user && loading && (
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-2xl h-32 animate-pulse" />
            ))}
          </div>
        )}

        {user && !loading && visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <span className="text-5xl mb-3">📦</span>
            <p className="text-sm font-medium">No orders here</p>
          </div>
        )}

        {user && !loading && visible.length > 0 && (
          <div className="flex flex-col gap-3">
            {visible.map(order => (
              <div key={order.id} className="bg-zinc-900 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Order #{order.id}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                    {order.assigned_admin_name && (
                      <p className="text-xs text-zinc-500 mt-1">
                        👷 {order.assigned_admin_name}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-zinc-700 text-zinc-300'}`}>
                    {STATUS_EMOJI[order.status]} {order.status}
                  </span>
                </div>

                {order.items?.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 mb-3">
                    {order.items.map((item, i) => (
                      <img
                        key={i}
                        src={item.image || 'https://placehold.co/56x56/f97316/ffffff?text=ADH'}
                        alt={item.name}
                        className="h-14 w-14 rounded-xl object-cover flex-shrink-0 border border-zinc-800"
                        onError={e => { e.target.src = 'https://placehold.co/56x56/f97316/ffffff?text=ADH'; }}
                      />
                    ))}
                  </div>
                )}

                {/* Delivery type */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs text-zinc-500">
                    {order.delivery_type === 'delivery' ? '🚚 Home Delivery' : '🏪 Store Pickup'}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span className="text-xs text-zinc-500">
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-bold text-orange-400">
                    ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
