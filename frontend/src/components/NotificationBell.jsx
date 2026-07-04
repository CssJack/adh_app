// src/components/NotificationBell.jsx
// Drop-in notification bell for Navbar — polls every 30s
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { HiBell } from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function NotificationBell() {
  const { user } = useApp();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread]               = useState(0);
  const [open, setOpen]                   = useState(false);
  const panelRef = useRef(null);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('adh_token');
      const { data } = await axios.get(`${API}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setNotifications(data.data || []);
        setUnread(data.unread || 0);
      }
    } catch (_) {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleOpen = async () => {
    setOpen(prev => !prev);
    if (!open && unread > 0) {
      try {
        const token = localStorage.getItem('adh_token');
        await axios.put(`${API}/notifications/read-all`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUnread(0);
        setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
      } catch (_) {}
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-zinc-800 transition-colors"
      >
        <HiBell className="text-xl text-zinc-300" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 bg-orange-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Notifications</span>
            <span className="text-xs text-zinc-500">{notifications.length} total</span>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-zinc-500">
                <HiBell className="text-3xl mb-2 text-zinc-700" />
                <p className="text-xs">No notifications yet</p>
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-zinc-800 last:border-0 transition-colors
                    ${!n.is_read ? 'bg-orange-500/5' : ''}`}
                >
                  <p className="text-xs font-semibold text-white leading-snug">{n.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-zinc-600 mt-1">
                    {new Date(n.created_at).toLocaleString('en-IN', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
