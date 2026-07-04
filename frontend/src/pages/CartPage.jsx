// src/pages/CartPage.jsx

import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import CartItem from '../components/CartItem';
import { HiShoppingCart } from 'react-icons/hi';

export default function CartPage() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    cartDiscount,
  } = useApp();

  const finalTotal = cartTotal - cartDiscount;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      <Navbar showSearch={false} />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-40">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">
          My Cart
        </h1>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">

            <HiShoppingCart className="text-7xl mb-4 text-zinc-800" />

            <p className="text-lg font-semibold">
              Your cart is empty
            </p>

            <button
              onClick={() => navigate('/home')}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="flex flex-col gap-4">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-zinc-900 rounded-3xl p-5 mt-5 border border-zinc-800">

              <h3 className="text-lg font-bold text-white mb-4">
                Order Summary
              </h3>

              {/* SUBTOTAL */}
              <div className="flex justify-between text-sm text-zinc-400 mb-2">
                <span>
                  Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)
                </span>

                <span>
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* DISCOUNT */}
              {cartDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-400 mb-2">
                  <span>Discount</span>

                  <span>
                    - ₹{cartDiscount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* TOTAL */}
              <div className="flex justify-between items-center border-t border-zinc-800 pt-4 mt-4">

                <span className="text-xl font-bold text-white">
                  Total
                </span>

                <span className="text-3xl font-bold text-orange-400">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </>
        )}
      </main>

      {/* CHECKOUT BAR */}
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-4 py-1 z-50">

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-500">
                Total Amount
              </p>

              <p className="text-2xl font-bold text-orange-400">
                ₹{finalTotal.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-500">
                Items
              </p>

              <p className="text-xs font-semibold text-white">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/checkout')}
              className="w-40 bg-blue-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-medium py-2 rounded-xl text-xs shadow-lg"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}