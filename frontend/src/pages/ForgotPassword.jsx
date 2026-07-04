// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePhone, HiOutlineLockClosed } from 'react-icons/hi';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp]     = useState('');
  const [pass, setPass]   = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handlePhone = () => {
    if (!/^\d{10}$/.test(phone)) { setError('Enter valid 10-digit number'); return; }
    setError(''); setStep(2);
  };
  const handleOtp = () => {
    if (otp.length < 4) { setError('Enter OTP'); return; }
    setError(''); setStep(3);
  };
  const handlePassword = () => {
    if (!pass || pass !== confirm) { setError('Passwords do not match'); return; }
    setError(''); navigate('/login');
  };

  const stepLabel = ['Enter Phone','Verify OTP','New Password'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <button onClick={() => step > 1 ? setStep(s=>s-1) : navigate(-1)} className="text-zinc-500 text-sm mb-6 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold mb-1">Forgot Password</h1>

        {/* Steps */}
        <div className="flex gap-1.5 mb-6">
          {[1,2,3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? 'bg-orange-500' : 'bg-zinc-800'}`} />
          ))}
        </div>
        <p className="text-sm text-zinc-400 mb-5">Step {step}: {stepLabel[step-1]}</p>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col gap-4">
          {step === 1 && (
            <>
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input type="tel" placeholder="10-digit mobile" value={phone}
                  onChange={e => { setPhone(e.target.value); setError(''); }}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button onClick={handlePhone} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm">Send OTP</button>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-sm text-zinc-400">OTP sent to +91 {phone}</p>
              <input type="number" placeholder="Enter OTP" value={otp}
                onChange={e => { setOtp(e.target.value.slice(0,6)); setError(''); }}
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-2.5 rounded-xl text-sm tracking-widest focus:outline-none focus:border-orange-500"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button onClick={handleOtp} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm">Verify OTP</button>
            </>
          )}
          {step === 3 && (
            <>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input type="password" placeholder="New password" value={pass}
                  onChange={e => { setPass(e.target.value); setError(''); }}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input type="password" placeholder="Confirm password" value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError(''); }}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button onClick={handlePassword} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm">Update Password</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
