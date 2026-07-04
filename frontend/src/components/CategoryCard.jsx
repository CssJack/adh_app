// Category card shown on the home page grid
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CategoryCard({ category }) {
  const { t }    = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/products?category=${category.key}`)}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-card
        ${category.color} hover:scale-105 active:scale-95 transition-transform duration-150 w-full`}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className="text-xs font-semibold text-center leading-tight">
        {t(category.labelKey)}
      </span>
    </button>
  );
}
