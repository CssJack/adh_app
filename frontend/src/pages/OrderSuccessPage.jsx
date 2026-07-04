// src/pages/OrderSuccessPage.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <HiCheckCircle className="text-7xl text-green-400" />
        <h1 className="text-2xl font-bold">Order Placed!</h1>
        <p className="text-zinc-400 text-sm max-w-xs">
          Your order <span className="text-orange-400 font-bold">#{orderId}</span> has been received.
          We'll notify you as soon as it's assigned and packed.
        </p>

        <div className="bg-zinc-900 rounded-2xl p-4 w-full max-w-xs text-left space-y-2 mt-2">
          <p className="text-xs font-bold text-zinc-300 mb-2">What happens next?</p>
          {[
            { step: '1', text: 'Admin receives your order', color: 'bg-yellow-500' },
            { step: '2', text: 'Admin takes & packs your order', color: 'bg-blue-500' },
            { step: '3', text: 'You get notified when ready', color: 'bg-orange-500' },
            { step: '4', text: 'Come collect / receive delivery', color: 'bg-green-500' },
          ].map(s => (
            <div key={s.step} className="flex items-center gap-3">
              <span className={`${s.color} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
                {s.step}
              </span>
              <span className="text-xs text-zinc-400">{s.text}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-2 w-full max-w-xs">
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
