// src/pages/MenuPage.jsx
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineLogout, HiOutlineGlobe, HiArrowLeft, HiOutlineSparkles } from 'react-icons/hi';

export default function MenuPage() {
  const navigate = useNavigate();
  const { user, logout, changeLanguage, lang } = useApp();

  const handleLogout = () => { logout(); navigate('/login'); };

  const menuItems = [
    { icon: HiOutlineShoppingBag, label: 'My Orders',       action: () => navigate('/orders') },
    { icon: HiOutlineSparkles,    label: 'New Arrivals',    action: () => navigate('/products') },
    { icon: HiOutlineUser,        label: 'Profile',         action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="sticky top-0 z-50 bg-zinc-900 flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
          <HiArrowLeft className="text-xl" />
        </button>
        <h2 className="text-sm font-semibold">Menu</h2>
      </div>

      <main className="flex-1 pb-24 overflow-y-auto px-4 pt-5">
        {/* User card */}
        {user ? (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 mb-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-lg text-white">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-bold text-base text-white">{user.name}</p>
              <p className="text-xs text-white/70 capitalize">{user.role || 'customer'}</p>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-2xl p-5 mb-5 flex items-center gap-4 border border-zinc-800">
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500">
              <HiOutlineUser className="text-2xl" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-300">Guest User</p>
              <div className="flex gap-2 mt-1">
                <button onClick={() => navigate('/login')} className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-semibold">Login</button>
                <button onClick={() => navigate('/register')} className="text-xs bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg font-semibold">Register</button>
              </div>
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-4">
          {menuItems.map(({ icon: Icon, label, action }, idx) => (
            <button key={idx} onClick={action}
              className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-0">
              <Icon className="text-xl text-orange-400 flex-shrink-0" />
              <span className="text-sm font-medium text-zinc-200">{label}</span>
              <span className="ml-auto text-zinc-600">›</span>
            </button>
          ))}
        </div>

        {/* Language switcher */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <HiOutlineGlobe className="text-xl text-orange-400" />
            <p className="text-sm font-semibold text-zinc-200">Language / भाषा</p>
          </div>
          <div className="flex gap-2">
            {['en','hi'].map(l => (
              <button key={l} onClick={() => changeLanguage(l)}
                className={`flex-1 py-2 text-sm font-medium rounded-xl border transition-all
                  ${lang === l ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'}`}>
                {l === 'en' ? '🇬🇧 English' : '🇮🇳 हिन्दी'}
              </button>
            ))}
          </div>
        </div>

        {user && (
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-900/40 border border-red-800 text-red-400 font-semibold py-3 rounded-2xl text-sm hover:bg-red-900/60 transition-colors">
            <HiOutlineLogout className="text-lg" /> Logout
          </button>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
