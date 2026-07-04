// src/pages/LanguagePage.jsx
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LanguagePage() {
  const navigate = useNavigate();
  const { changeLanguage } = useApp();

  const handleSelect = (lng) => {
    changeLanguage(lng);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="h-20 w-20 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg mb-4">
          <span className="text-white font-bold text-2xl tracking-wide">ADH</span>
        </div>
        <h1 className="text-2xl font-bold">ADH Hardware Store</h1>
        <p className="text-sm text-zinc-400 mt-1 text-center">Hardware & Construction Materials</p>
      </div>

      <div className="w-full max-w-sm bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
        <h2 className="text-lg font-semibold text-center mb-1">Select Language</h2>
        <p className="text-sm text-zinc-400 text-center mb-6">Choose your preferred language</p>

        <div className="flex flex-col gap-3">
          <button onClick={() => handleSelect('en')}
            className="flex items-center justify-between px-5 py-4 rounded-2xl border-2 border-zinc-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇬🇧</span>
              <div className="text-left">
                <p className="font-semibold text-sm">English</p>
                <p className="text-xs text-zinc-400">Continue in English</p>
              </div>
            </div>
            <span className="text-orange-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button onClick={() => handleSelect('hi')}
            className="flex items-center justify-between px-5 py-4 rounded-2xl border-2 border-zinc-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇮🇳</span>
              <div className="text-left">
                <p className="font-semibold text-sm">हिन्दी</p>
                <p className="text-xs text-zinc-400">हिन्दी में जारी रखें</p>
              </div>
            </div>
            <span className="text-orange-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
      <p className="text-xs text-zinc-600 mt-8">© 2025 ADH Hardware Store</p>
    </div>
  );
}
