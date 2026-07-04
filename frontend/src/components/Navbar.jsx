// src/components/Navbar.jsx
// Search overlay — queries API first, falls back to local data

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products as localProducts } from '../data/products';
import axios from 'axios';
import {
  HiOutlineShoppingCart, HiOutlineBell, HiOutlineHeart,
  HiOutlineUser, HiOutlineSearch, HiX,
} from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Navbar({ showSearch = true }) {
  const navigate = useNavigate();
  const { cartCount, user, favourites } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState([]);
  const [searching, setSearching]   = useState(false);
  const inputRef                    = useRef(null);
  const debounceRef                 = useRef(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Debounced search — tries API first, falls back to local
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const r = await axios.get(`${API}/products`, { params: { search: query } });
        setResults((r.data.data || r.data).slice(0, 8));
      } catch {
        // API down — fall back to local search
        const q = query.toLowerCase();
        setResults(
          localProducts.filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.brand && p.brand.toLowerCase().includes(q))
          ).slice(0, 8)
        );
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const openSearch  = () => { setSearchOpen(true); setQuery(''); setResults([]); };
  const closeSearch = () => { setSearchOpen(false); setQuery(''); setResults([]); };

  const handleResultClick = (productId) => {
    closeSearch();
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-xs">ADH</span>
            <span className="font-bold text-stone-800 text-sm leading-tight hidden sm:block">Hardware & Construction Store</span>
          </button>

          <div className="flex items-center gap-2 text-stone-600">
            <button onClick={() => navigate('/products?tab=fav')} className="relative p-2 rounded-full hover:bg-orange-50 transition-colors">
              <HiOutlineHeart className="text-xl" />
              {favourites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {favourites.length}
                </span>
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-orange-50 transition-colors">
              <HiOutlineBell className="text-xl" />
            </button>
            <button onClick={() => navigate('/cart')} className="relative p-2 rounded-full hover:bg-orange-50 transition-colors">
              <HiOutlineShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-orange-500 text-white text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate(user ? '/menu' : '/login')} className="p-2 rounded-full hover:bg-orange-50 transition-colors">
              <HiOutlineUser className="text-xl" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="px-4 pb-3">
            <button onClick={openSearch}
              className="w-full flex items-center gap-2 bg-zinc-100 rounded-xl px-4 py-2.5 text-zinc-400 text-sm hover:bg-zinc-200 transition-colors text-left">
              <HiOutlineSearch className="text-base flex-shrink-0" />
              <span>Search products, brands...</span>
            </button>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative z-10 bg-white w-full shadow-2xl rounded-b-3xl">
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-100">
              <HiOutlineSearch className="text-xl text-orange-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="flex-1 text-base text-zinc-900 placeholder:text-zinc-400 bg-transparent outline-none"
              />
              <button onClick={query ? () => setQuery('') : closeSearch} className="p-1.5 rounded-full hover:bg-zinc-100 transition-colors">
                <HiX className="text-xl text-zinc-500" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim() === '' ? (
                <div className="px-4 py-8 text-center text-zinc-400">
                  <HiOutlineSearch className="text-4xl mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">Type to search products</p>
                  <p className="text-xs mt-1 opacity-60">Try: Asian Primer, Flush Door, Cement, Greenply</p>
                </div>
              ) : searching ? (
                <div className="px-4 py-8 text-center text-zinc-400">
                  <div className="h-6 w-6 rounded-full border-2 border-zinc-200 border-t-orange-500 animate-spin mx-auto mb-2" />
                  <p className="text-xs">Searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center text-zinc-400">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-sm font-medium">No products found for</p>
                  <p className="font-bold text-zinc-700 mt-1">"{query}"</p>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-50">
                  {results.map(product => (
                    <li key={product.id}>
                      <button onClick={() => handleResultClick(product.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 active:bg-orange-100 transition-colors text-left">
                        <img
                          src={product.image || 'https://placehold.co/48x48/f97316/ffffff?text=ADH'}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover flex-shrink-0 border border-zinc-100"
                          onError={e => { e.target.src = 'https://placehold.co/48x48/f97316/ffffff?text=ADH'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 truncate">{product.name}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {product.brand}
                            {(product.subcategory_name || product.subcategorySlug) && (
                              <span className="ml-2 text-orange-500">
                                · {product.subcategory_name || product.subcategorySlug?.replace(/-/g,' ')}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-orange-500">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {results.length > 0 && (
              <div className="border-t border-zinc-100 px-4 py-3">
                <button
                  onClick={() => { closeSearch(); navigate(`/products?search=${encodeURIComponent(query)}`); }}
                  className="w-full text-center text-sm text-orange-500 font-semibold py-1 hover:underline"
                >
                  View all results for "{query}" →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
