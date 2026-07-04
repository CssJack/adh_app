// src/pages/SubcategoryPage.jsx
// Loads subcategories from API → /api/subcategories/:categorySlug
// Falls back to local data if API down

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import { categories as localCats, subcategories as localSubs } from '../data/products';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SubcategoryPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName]   = useState('');
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    // Set category name from local data
    const localCat = localCats.find(c => c.slug === categorySlug);
    if (localCat) setCategoryName(localCat.name);

    // Fetch subcategories from API
    axios.get(`${API}/subcategories/${categorySlug}`)
      .then(r => {
        const apiSubs = r.data.data || r.data;
        // Merge with local images since DB has empty images
        const merged = apiSubs.map(sub => {
          const local = localSubs.find(l => l.slug === sub.slug);
          return { ...sub, image: sub.image || local?.image || '' };
        });
        setSubcategories(merged);
      })
      .catch(() => {
        // Fallback: filter local subs
        setSubcategories(localSubs.filter(s => s.categorySlug === categorySlug));
      })
      .finally(() => setLoading(false));
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar showSearch />

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-3xl h-52 animate-pulse" />
            ))}
          </div>
        ) : subcategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <p className="text-4xl mb-3">📂</p>
            <p className="text-base font-semibold">No subcategories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subcategories.map(sub => (
              <div
                key={sub.id}
                onClick={() => navigate(`/subcategory/${sub.slug}`)}
                className="bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all"
              >
                <img
                  src={sub.image || `https://placehold.co/400x300/f97316/ffffff?text=${sub.name}`}
                  alt={sub.name}
                  className="h-44 w-full object-cover"
                  onError={e => { e.target.src = `https://placehold.co/400x300/f97316/ffffff?text=${sub.name}`; }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{sub.name}</h3>
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
