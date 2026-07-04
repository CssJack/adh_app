// Order summary card used on the Orders page
import { useTranslation } from 'react-i18next';

const statusColors = {
  'Order Placed': 'bg-blue-100 text-blue-700',
  'Processing':   'bg-yellow-100 text-yellow-700',
  'Shipped':      'bg-purple-100 text-purple-700',
  'Delivered':    'bg-green-100 text-green-700',
  'Cancelled':    'bg-red-100 text-red-600',
};

export default function OrderCard({ order }) {
  const { t } = useTranslation();

  const statusKey = order.status.toLowerCase().replace(' ', '_');
  const statusLabel = t(statusKey, { defaultValue: order.status });

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-stone-400 font-medium">Order #{order.id}</p>
          <p className="text-xs text-stone-400 mt-0.5">{order.date}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-stone-100 text-stone-600'}`}>
          {statusLabel}
        </span>
      </div>

      {/* Items preview */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {order.items.slice(0, 4).map((item, idx) => (
          <img
            key={idx}
            src={item.image}
            alt={item.name}
            className="h-14 w-14 rounded-xl object-cover flex-shrink-0 border border-stone-100"
          />
        ))}
        {order.items.length > 4 && (
          <div className="h-14 w-14 rounded-xl bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-500 flex-shrink-0">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="text-xs text-stone-500">
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </span>
        <span className="text-sm font-bold text-stone-900">
          ₹{order.total.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
