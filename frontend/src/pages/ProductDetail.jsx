// src/pages/ProductDetail.jsx
// Loads single product from API → /api/products/:id

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { HiMinus, HiPlus, HiShoppingCart, HiHeart, HiOutlineHeart, HiArrowLeft } from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProductDetail() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { addToCart, cart, favourites, toggleFav } = useApp();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]         = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/products/${id}`)
      .then(r => {
        setProduct(r.data.data);
        setSimilar(r.data.similar || []);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-zinc-700 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-400">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-base font-semibold">Product not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-orange-400 text-sm hover:underline">← Go back</button>
      </div>
    );
  }

  const isFav  = favourites.includes(product.id);
  const inCart = cart.some(i => i.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-900 flex items-center justify-between px-4 py-3 shadow-md">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
          <HiArrowLeft className="text-xl" />
        </button>
        <h2 className="text-sm font-semibold max-w-[200px] truncate">{product.name}</h2>
        <button onClick={() => toggleFav(product.id)} className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
          {isFav ? <HiHeart className="text-xl text-rose-500" /> : <HiOutlineHeart className="text-xl text-zinc-400" />}
        </button>
      </div>

      <main className="flex-1 pb-28 overflow-y-auto">
        {/* Product image */}
        <img
          src={product.image || `https://placehold.co/400x400/f97316/ffffff?text=${product.name}`}
          alt={product.name}
          className="w-full aspect-square object-cover"
          onError={e => { e.target.src = 'https://placehold.co/400x400/f97316/ffffff?text=ADH'; }}
        />

        {/* Info */}
        <div className="bg-zinc-900 mt-2 px-4 py-4">
          <p className="text-xs text-zinc-400 mb-1">
            {product.brand}
            {product.subcategory_name && <span className="ml-2 text-orange-400">· {product.subcategory_name}</span>}
          </p>
          <h1 className="text-lg font-bold leading-snug">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold text-orange-500">
              ₹{parseFloat(product.price).toLocaleString('en-IN')}
            </span>
          </div>

          {product.stock !== undefined && (
            <p className={`text-xs font-medium mt-2 ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
            </p>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-zinc-900 mt-2 px-4 py-4">
            <h3 className="text-sm font-bold mb-2">Description</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Quantity selector */}
        <div className="bg-zinc-900 mt-2 px-4 py-4">
          <h3 className="text-sm font-bold mb-3">Quantity</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-90 transition-all"
            >
              <HiMinus />
            </button>
            <span className="text-xl font-bold min-w-[2rem] text-center">{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-90 transition-all"
            >
              <HiPlus />
            </button>
            <span className="text-sm text-zinc-400">
              × ₹{parseFloat(product.price).toLocaleString('en-IN')} =
              <strong className="text-white ml-1">₹{(parseFloat(product.price) * qty).toLocaleString('en-IN')}</strong>
            </span>
          </div>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div className="mt-2 px-4 py-4">
            <h3 className="text-sm font-bold mb-3">Similar Products</h3>
            <div className="grid grid-cols-2 gap-3">
              {similar.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all"
                >
                  <img
                    src={p.image || 'https://placehold.co/400x400/f97316/ffffff?text=ADH'}
                    alt={p.name}
                    className="h-32 w-full object-cover"
                    onError={e => { e.target.src = 'https://placehold.co/400x400/f97316/ffffff?text=ADH'; }}
                  />
                  <div className="p-3">
                    <p className="text-xs text-zinc-400">{p.brand}</p>
                    <p className="text-xs font-semibold mt-0.5 line-clamp-2">{p.name}</p>
                    <p className="text-orange-500 font-bold text-sm mt-1">₹{parseFloat(p.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add to Cart button */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 z-40">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50
            text-white font-bold py-3 rounded-2xl text-base transition-colors active:scale-[0.98]"
        >
          <HiShoppingCart className="text-xl" />
          {inCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
