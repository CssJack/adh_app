// src/pages/ProductsPage.jsx
// Loads products from API → /api/products?subcategory=<slug>&search=<q>&sort=<s>
// Works for both /subcategory/:slug route and /products?search=X route

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import { HiOutlineSearch, HiX, HiPlus, HiCheck } from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProductsPage() {
  const { subcategorySlug }   = useParams();
  const [searchParams]        = useSearchParams();
  const navigate              = useNavigate();
  const { addToCart, cart }   = useApp();

  // Pre-fill search from navbar "View all results for X"
  const [query, setQuery]     = useState(searchParams.get('search') || '');
  const [sort, setSort]       = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [pageTitle, setPageTitle] = useState('All Products');
  const [added, setAdded]       = useState(null);

  // Fetch from API whenever slug / sort changes
  useEffect(() => {
    setLoading(true);
    setError('');

    const params = {};
    if (subcategorySlug) {
      params.subcategory = subcategorySlug;
      // Set page title from slug
      setPageTitle(subcategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    } else {
      setPageTitle('All Products');
    }
    if (sort === 'price_asc')  params.sort = 'price_asc';
    if (sort === 'price_desc') params.sort = 'price_desc';
    if (sort === 'name')       params.sort = 'name';

    axios.get(`${API}/products`, { params })
      .then(r => {
        setProducts(r.data.data || r.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load products. Make sure backend is running.');
        setLoading(false);
      });
  }, [subcategorySlug, sort]);

  // Client-side search filter (instant, no extra API call)
  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q))
    );
  }, [products, query]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const isInCart = (id) => cart.some(i => i.id === id);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar showSearch={false} />

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        <h1 className="text-2xl font-bold mb-4 capitalize">{pageTitle}</h1>

        {/* Search input */}
        <div className="relative mb-4">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-base" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products or brands..."
            className="w-full bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500
              rounded-xl pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <HiX className="text-base" />
            </button>
          )}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-zinc-500">
            {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
          </p>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
          >
            <option value="default">Sort By</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-3xl h-64 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-400">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="text-sm font-semibold text-center">{error}</p>
          </div>
        )}

        {/* No results */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <span className="text-5xl mb-3">🔍</span>
            <p className="text-base font-semibold">No products found</p>
            {query && (
              <button onClick={() => setQuery('')} className="mt-3 text-sm text-orange-400 hover:underline">
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:bg-zinc-800 transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={product.image || `https://placehold.co/400x400/f97316/ffffff?text=${product.name}`}
                    alt={product.name}
                    className="h-44 w-full object-cover"
                    onError={e => { e.target.src = 'https://placehold.co/400x400/f97316/ffffff?text=ADH'; }}
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs text-zinc-400 mb-0.5">{product.brand}</p>
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2 leading-snug">{product.name}</h3>

                  <div className="flex items-center justify-between">
                    <p className="text-orange-500 font-bold text-base">
                      ₹{parseFloat(product.price).toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={e => handleAddToCart(e, product)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-90
                        ${added === product.id || isInCart(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                    >
                      {added === product.id || isInCart(product.id)
                        ? <><HiCheck className="text-sm" /> Added</>
                        : <><HiPlus className="text-sm" /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
