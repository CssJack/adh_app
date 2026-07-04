// src/components/BottomNavigation.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HiOutlineHome, HiHome, HiOutlineShoppingCart, HiShoppingCart, HiOutlineMenu, HiMenu } from 'react-icons/hi';

export default function BottomNavigation() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { cartCount } = useApp();
  const active = location.pathname;

  const tabs = [
    { key: '/home',  label: 'Home',  Icon: HiOutlineHome,         ActiveIcon: HiHome },
    { key: '/cart',  label: 'Cart',  Icon: HiOutlineShoppingCart, ActiveIcon: HiShoppingCart, badge: cartCount },
    { key: '/menu',  label: 'Menu',  Icon: HiOutlineMenu,         ActiveIcon: HiMenu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800">
      <div className="flex">
        {tabs.map(({ key, label, Icon, ActiveIcon, badge }) => {
          const isActive = active === key;
          const I = isActive ? ActiveIcon : Icon;
          return (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`flex flex-1 flex-col items-center justify-center py-2.5 gap-0.5 transition-colors
                ${isActive ? 'text-orange-500' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span className="relative">
                <I className="text-2xl" />
                {badge > 0 && (
                  <span className="absolute -top-1 -right-2 h-4 w-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                    {badge}
                  </span>
                )}
              </span>
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
