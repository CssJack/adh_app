// Product card with image, name, price, and add-to-cart button
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { HiHeart, HiOutlineHeart, HiPlus, HiCheck } from 'react-icons/hi';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { t }                     = useTranslation();
  const navigate                  = useNavigate();
  const { addToCart, cart, favourites, toggleFav, lang } = useApp();
  const [added, setAdded]         = useState(false);

  const inCart = cart.some(i => i.id === product.id);
  const isFav  = favourites.includes(product.id);

  // Determine display name based on language
  const displayName = lang === 'hi' ? product.hindiName : product.name;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer
        hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-150 flex flex-col"
    >
      {/* Product image */}
      <div className="relative">
        <img
          src={product.image}
          alt={displayName}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
        {/* New badge */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
        {/* Favourite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFav(product.id); }}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm hover:scale-110 transition-transform"
        >
          {isFav
            ? <HiHeart className="text-rose-500 text-base" />
            : <HiOutlineHeart className="text-stone-400 text-base" />}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <p className="text-xs font-medium text-stone-800 line-clamp-2 leading-snug flex-1">
          {displayName}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-stone-900">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="ml-1 text-xs text-stone-400 line-through">
                ₹{product.price + product.discount}
              </span>
            )}
          </div>
          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all
              ${added || inCart
                ? 'bg-green-100 text-green-700'
                : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'}`}
          >
            {added || inCart
              ? <><HiCheck className="text-sm" /> {t('add_to_cart').split(' ')[0]}</>
              : <><HiPlus className="text-sm" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
