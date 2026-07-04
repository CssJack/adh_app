// Reusable form input field
export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-stone-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
            <Icon />
          </span>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400
            transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-stone-200'}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
