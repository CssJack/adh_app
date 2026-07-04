// Reusable Button with primary / secondary / ghost variants
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2',
  };

  const variants = {
    primary:   'bg-primary-600 text-white hover:bg-primary-700 active:scale-95',
    secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:scale-95',
    ghost:     'bg-transparent text-stone-600 hover:bg-stone-100 active:scale-95',
    danger:    'bg-red-50 text-red-600 hover:bg-red-100 active:scale-95',
    outline:   'border border-stone-200 text-stone-700 hover:bg-stone-50 active:scale-95 bg-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
