// src/components/PaymentSelector.jsx
import { HiCash, HiDeviceMobile, HiCreditCard } from 'react-icons/hi';

const options = [
  { key: 'cod',  label: 'Cash on Delivery', Icon: HiCash },
  { key: 'upi',  label: 'UPI',              Icon: HiDeviceMobile },
  { key: 'card', label: 'Card',             Icon: HiCreditCard },
];

export default function PaymentSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
            ${value === key
              ? 'border-orange-500 bg-orange-500/10 text-orange-400'
              : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
        >
          <Icon className={`text-xl ${value === key ? 'text-orange-400' : 'text-zinc-500'}`} />
          <span className="text-sm font-medium">{label}</span>
          {value === key && (
            <span className="ml-auto h-4 w-4 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
