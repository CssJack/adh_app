// src/pages/HomePage.jsx
// Loads categories from backend API → /api/categories
// Falls back to local data if API is unavailable

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import { categories as localCategories } from '../data/products';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/categories`)
      .then(r => {
        // Merge API data with local images (DB has empty images)
        const apiCats = r.data.data || r.data;
        const merged = apiCats.map(cat => {
          const local = localCategories.find(l => l.slug === cat.slug);
          return {
            ...cat,
            image:  cat.image  || local?.image  || '',
            images: local?.images || null,
          };
        });
        setCategories(merged);
      })
      .catch(() => {
        // Fallback to local data if backend not running
        setCategories(localCategories);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar showSearch />

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero Banner */}
        <div className="px-4 pt-4">
          <div className="rounded-3xl bg-orange-500 p-6">
            <h1 className="text-3xl font-bold mb-2">ADH Hardware Store</h1>
            <p className="text-sm opacity-90">
              Paints, Plywood, Hardware & Construction Materials
            </p>
          </div>
        </div>

        {/* Categories */}
        <section className="mt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-zinc-900 rounded-3xl h-52 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(category => (
                <div
                  key={category.id}
                  onClick={() => navigate(`/category/${category.slug}`)}
                  className="bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all"
                >
                  {/* 4-image grid for Adhesive category */}
                  {category.images ? (
                    <div className="grid grid-cols-2 grid-rows-2 h-40">
                      {category.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.src = 'https://placehold.co/200x200/f97316/ffffff?text=ADH'; }}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={category.image || 'https://placehold.co/400x300/f97316/ffffff?text=' + category.name}
                      alt={category.name}
                      className="h-40 w-full object-cover"
                      onError={e => { e.target.src = 'https://placehold.co/400x300/f97316/ffffff?text=' + category.name; }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
