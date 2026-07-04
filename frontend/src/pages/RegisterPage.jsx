// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import axios from 'axios';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ROLES = ['painter','carpenter','electrician','plumber','skilled_workman'];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [form, setForm] = useState({ name:'', phone:'', email:'', password:'', confirmPassword:'', registerAs:'customer', role:'' });
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState('');
  const [loading, setLoading] = useState(false);

  const h = e => { const {name,value}=e.target; setForm(p=>({...p,[name]:value})); setErrors(p=>({...p,[name]:''})); setApiErr(''); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone';
    if (!form.password) e.password = 'Password is required';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (form.registerAs === 'professional' && !form.role) e.role = 'Select your role';
    return e;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const role = form.registerAs === 'professional' ? form.role : 'customer';
    try {
      setLoading(true);
      const res = await axios.post(API + '/auth/register', { name:form.name.trim(), phone:form.phone, email:form.email||undefined, password:form.password, role });
      login(res.data.user, res.data.token);
      navigate('/home');
    } catch(err) {
      setApiErr(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  const inp = (label, name, type='text', placeholder='', icon=null) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span>}
        <input name={name} type={type} placeholder={placeholder} value={form[name]} onChange={h}
          className={`w-full bg-zinc-800 border text-white ${icon?'pl-9':'pl-3'} pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500 ${errors[name]?'border-red-600':'border-zinc-700'}`}
        />
      </div>
      {errors[name] && <p className="text-xs text-red-400">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white px-5 py-8 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate(-1)} className="text-zinc-500 text-sm mb-6 hover:text-white">← Back</button>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">ADH</span>
          </div>
          <h1 className="text-xl font-bold">Create Account</h1>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          {apiErr && <div className="mb-4 px-4 py-3 bg-red-900/40 text-red-400 rounded-xl text-sm border border-red-800">{apiErr}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {inp('Full Name','name','text','Your full name', <HiOutlineUser />)}
            {inp('Phone','phone','tel','10-digit mobile', <HiOutlinePhone />)}
            {inp('Email (optional)','email','email','Optional', <HiOutlineMail />)}
            {inp('Password','password','password','Create password', <HiOutlineLockClosed />)}
            {inp('Confirm Password','confirmPassword','password','Repeat password', <HiOutlineLockClosed />)}

            {/* Register as */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Register as</label>
              <div className="flex gap-2">
                {['customer','professional'].map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(p=>({...p,registerAs:opt,role:''}))}
                    className={`flex-1 py-2 text-sm font-medium rounded-xl border transition-all
                      ${form.registerAs===opt ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'}`}>
                    {opt.charAt(0).toUpperCase()+opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {form.registerAs === 'professional' && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Select Role</label>
                <select name="role" value={form.role} onChange={h}
                  className={`w-full bg-zinc-800 border text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500 ${errors.role?'border-red-600':'border-zinc-700'}`}>
                  <option value="">-- Select Role --</option>
                  {ROLES.map(r => <option key={r} value={r}>{r.replace('_',' ').replace(/\b\w/g,l=>l.toUpperCase())}</option>)}
                </select>
                {errors.role && <p className="text-xs text-red-400">{errors.role}</p>}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-2">
              {loading ? 'Registering…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-400 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
