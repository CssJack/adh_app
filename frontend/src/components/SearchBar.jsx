// Inline search bar used on Products page
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-base" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('search')}
        className="w-full rounded-xl border border-stone-200 bg-white pl-9 pr-9 py-2.5
          text-sm text-stone-800 placeholder:text-stone-400 focus:border-primary-500
          focus:ring-2 focus:ring-primary-100 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
        >
          <HiX className="text-base" />
        </button>
      )}
    </div>
  );
}
