// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import axios from 'axios';
import { HiOutlinePhone, HiOutlineLockClosed } from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [form, setForm]   = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
    setApiErr('');
  };

  const validate = () => {
    const e = {};
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      setLoading(true);
      const res = await axios.post(API + '/auth/login', { phone: form.phone, password: form.password });
      login(res.data.user, res.data.token);
      navigate('/home');
    } catch (err) {
      setApiErr(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate(-1)} className="text-zinc-500 text-sm mb-6 hover:text-white">← Back</button>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">ADH</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Welcome back!</h1>
            <p className="text-xs text-zinc-400">ADH Hardware Store</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          {apiErr && (
            <div className="mb-4 px-4 py-3 bg-red-900/40 text-red-400 rounded-xl text-sm border border-red-800">{apiErr}</div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Phone Number</label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  name="phone" type="tel" placeholder="10-digit mobile"
                  value={form.phone} onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
            </div>
            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  name="password" type="password" placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-orange-400 hover:underline">Forgot Password?</Link>
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-5">
          New here?{' '}
          <Link to="/register" className="text-orange-400 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
