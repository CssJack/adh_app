// src/components/CartItem.jsx
import { useApp } from '../context/AppContext';
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi';

export default function CartItem({ item }) {
  const { increment, decrement, removeItem } = useApp();

  return (
    <div className="flex gap-3 bg-zinc-900 rounded-2xl p-3">
      {/* Image */}
      <img
        src={item.image || 'https://placehold.co/80x80/f97316/ffffff?text=ADH'}
        alt={item.name}
        className="h-20 w-20 rounded-xl object-cover flex-shrink-0"
        onError={e => { e.target.src = 'https://placehold.co/80x80/f97316/ffffff?text=ADH'; }}
      />

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div>
          <p className="text-sm font-semibold text-white line-clamp-2 leading-snug">{item.name}</p>
          {item.brand && <p className="text-xs text-zinc-500 mt-0.5">{item.brand}</p>}
        </div>
        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <span className="text-sm font-bold text-orange-500">
            ₹{(parseFloat(item.price) * item.qty).toLocaleString('en-IN')}
          </span>

          {/* Qty controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(item.id)}
              className="h-7 w-7 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-90 transition-all"
            >
              <HiMinus className="text-sm text-zinc-300" />
            </button>
            <span className="text-sm font-bold text-white w-5 text-center">{item.qty}</span>
            <button
              onClick={() => increment(item.id)}
              className="h-7 w-7 flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-90 transition-all"
            >
              <HiPlus className="text-sm text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="self-start p-1.5 text-zinc-600 hover:text-red-500 transition-colors"
      >
        <HiTrash className="text-base" />
      </button>
    </div>
  );
}
