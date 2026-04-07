import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

function PasswordStrength({ password }: { password: string }) {
  const criteria = useMemo(() => {
    let count = 0;
    if (password.length >= 8) count++;
    if (/[A-Z]/.test(password)) count++;
    if (/[0-9]/.test(password)) count++;
    if (/[^A-Za-z0-9]/.test(password)) count++;
    return count;
  }, [password]);

  const colors = ['#ef4444', '#f59e0b', '#eab308', 'var(--accent)'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const color = criteria > 0 ? colors[criteria - 1] : 'var(--border)';
  const label = criteria > 0 ? labels[criteria - 1] : '';

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[3px] flex-1 rounded-full transition-all" style={{ background: i < criteria ? color : 'var(--border)' }} />
        ))}
      </div>
      {label && <p className="mt-1 font-body text-[0.72rem]" style={{ color }}>{label}</p>}
    </div>
  );
}

const slideData = [
  {
    title: 'Introducing WealthPath 1.0®',
    sub: 'AI-powered planning grounded in live market data.',
    card: (
      <div className="w-[380px] rounded-[24px] bg-white p-6" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)' }}>
        <p className="mb-1 font-body text-[0.68rem] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>TOTAL BALANCE</p>
        <p className="font-display text-[2rem] font-bold" style={{ letterSpacing: '-1px', color: '#1a1714' }}>$24,840.00</p>
        <p className="mb-4 font-body text-[0.78rem] font-semibold" style={{ color: '#16b85e' }}>$1.3M net worth projection at 65</p>
        <svg viewBox="0 0 340 60" className="mb-4 w-full">
          <defs><linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(22,184,94,.2)" /><stop offset="100%" stopColor="rgba(22,184,94,0)" /></linearGradient></defs>
          <path d="M0 50 Q60 45 120 35 Q180 22 240 18 Q300 12 340 6" fill="none" stroke="#16b85e" strokeWidth="2.5" />
          <path d="M0 50 Q60 45 120 35 Q180 22 240 18 Q300 12 340 6 L340 60 L0 60 Z" fill="url(#ag2)" />
        </svg>
        <div className="flex items-center justify-between border-t border-[#e5e7eb] py-2 font-body text-[0.78rem]">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#16b85e]" />Cash Account</span>
          <span className="font-bold" style={{ color: '#0d9a4d' }}>$4,240</span>
        </div>
        <div className="flex items-center justify-between border-t border-[#e5e7eb] py-2 font-body text-[0.78rem]">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#3b82f6]" />Investments</span>
          <span className="font-bold" style={{ color: '#0d9a4d' }}>$18,600</span>
        </div>
      </div>
    ),
    overlay: (
      <div className="absolute -bottom-5 -left-5 rounded-[16px] p-4 shadow-lg" style={{ background: '#13141a', border: '1px solid #252830' }}>
        <p className="font-body text-[0.82rem] font-semibold" style={{ color: '#16b85e' }}>📈 +$1,240 this month</p>
        <p className="font-body text-[0.72rem]" style={{ color: 'rgba(240,239,244,0.45)' }}>Portfolio up 5.2%</p>
      </div>
    ),
  },
  {
    title: 'RAG pipeline, live every hour.',
    sub: 'Your plan updates as markets move.',
    card: (
      <div className="w-[380px] rounded-[24px] bg-white p-6" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)' }}>
        <span className="mb-3 inline-block rounded-full px-3 py-1 font-body text-[0.7rem] font-bold" style={{ background: '#e8f9ef', color: '#16b85e' }}>AI PLAN READY</span>
        <p className="mb-4 font-display text-[1.1rem] font-bold" style={{ color: '#1a1714' }}>Your personalized investment plan</p>
        {[{ label: 'Stocks', pct: 45, color: '#16b85e' }, { label: 'Bonds', pct: 20, color: '#3b82f6' }, { label: 'Cash', pct: 15, color: '#f59e0b' }].map(b => (
          <div key={b.label} className="mb-2">
            <div className="mb-1 flex justify-between font-body text-[0.75rem]"><span style={{ color: '#6b7280' }}>{b.label}</span><span className="font-bold">{b.pct}%</span></div>
            <div className="h-[6px] rounded-full bg-[#e5e7eb]"><div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} /></div>
          </div>
        ))}
        <button className="mt-3 w-full rounded-[10px] py-2.5 font-body text-[0.85rem] font-semibold text-white" style={{ background: '#1a1714' }}>View full plan →</button>
      </div>
    ),
    overlay: (
      <div className="absolute -bottom-5 -left-5 rounded-[16px] p-4 shadow-lg" style={{ background: '#13141a', border: '1px solid #252830' }}>
        <p className="font-body text-[0.82rem] font-semibold" style={{ color: '#16b85e' }}>🤖 Gemini 2.0 Flash</p>
        <p className="font-body text-[0.72rem]" style={{ color: 'rgba(240,239,244,0.45)' }}>Plan generated in 2.4s</p>
      </div>
    ),
  },
  {
    title: 'Debt destroyed mathematically.',
    sub: 'Avalanche vs Snowball — you choose.',
    card: (
      <div className="w-[380px] rounded-[24px] bg-white p-6" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)' }}>
        <span className="mb-3 inline-block rounded-full px-3 py-1 font-body text-[0.7rem] font-bold" style={{ background: '#fef3c7', color: '#92400e' }}>DEBT PLANNER</span>
        <p className="mb-4 font-display text-[1.2rem] font-bold" style={{ color: '#1a1714' }}>Debt-free in 2.8 years</p>
        <svg viewBox="0 0 300 70" className="mb-3 w-full">
          <path d="M10 60 Q60 52 110 40 Q170 25 230 15 Q270 8 290 5" fill="none" stroke="#16b85e" strokeWidth="2.5" />
          <path d="M10 60 Q70 55 120 48 Q180 38 240 25 Q270 18 290 12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" />
        </svg>
        <p className="font-body text-[0.85rem] font-semibold" style={{ color: '#16b85e' }}>Saving $4,200 in interest</p>
      </div>
    ),
    overlay: (
      <div className="absolute -bottom-5 -left-5 rounded-[16px] p-4 shadow-lg" style={{ background: '#13141a', border: '1px solid #252830' }}>
        <p className="font-body text-[0.82rem] font-semibold" style={{ color: '#16b85e' }}>🎯 Goal on track</p>
      </div>
    ),
  },
];

export default function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hoveringRight, setHoveringRight] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('wealthpath-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.title = mode === 'login' ? 'Sign in — WealthPath' : 'Get started — WealthPath';
  }, [mode]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate('/'); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  useEffect(() => {
    if (hoveringRight) return;
    const timer = setInterval(() => setSlideIndex(i => (i + 1) % slideData.length), 4000);
    return () => clearInterval(timer);
  }, [hoveringRight]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('wealthpath-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === 'signup' && !name.trim()) errs.name = 'Please enter your full name.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email address.';
    if (!password || password.length < 8) errs.password = mode === 'signup' ? 'Must include uppercase, number, and special character.' : 'Password must be at least 8 characters.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  const inputClass = (field: string) =>
    `w-full rounded-[var(--radius-md)] px-4 py-3 font-body text-[0.9rem] outline-none transition-all duration-200 ${
      errors[field] ? 'focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]' : 'focus:shadow-[0_0_0_4px_var(--accent-glow)]'
    }`;

  const stagger = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const } });

  if (success) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ background: 'var(--bg)' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'var(--accent-light)', border: '2px solid var(--accent)' }}>
            <motion.svg width="40" height="40" viewBox="0 0 40 40">
              <motion.path d="M10 20L17 27L30 14" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }} />
            </motion.svg>
          </div>
          <h2 className="mb-2 font-display text-[1.8rem] font-bold" style={{ color: 'var(--ink)' }}>You're all set!</h2>
          <p className="font-body text-[0.9rem]" style={{ color: 'var(--muted)' }}>Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid h-screen overflow-hidden md:grid-cols-[520px_1fr]">
      {/* Left Panel */}
      <div className="relative flex flex-col justify-center px-7 py-12 md:px-16"
        style={{
          background: isDark ? 'var(--bg-secondary)' : '#ffffff',
          borderRight: '1px solid var(--border)',
        }}>
        {/* Logo */}
        <motion.div {...stagger(0)} className="mb-[52px]">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: isDark ? 'var(--accent)' : '#1a1714' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L12 7L7 13L2 7L7 1Z" fill={isDark ? '#0e0f14' : '#16b85e'} /></svg>
            </div>
            <span className="font-body text-base font-bold" style={{ color: 'var(--ink)' }}>WealthPath</span>
          </Link>
          <Link to="/" className="mt-3 block font-body text-[0.8rem]" style={{ color: 'var(--muted)' }}>← Back</Link>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28 }}>
            <motion.h1 {...stagger(1)} className="mb-2.5 font-display text-[2.4rem] font-bold leading-[1.1]" style={{ letterSpacing: '-0.05em', color: 'var(--ink)' }}>
              {mode === 'login' ? 'Good to have you back.' : 'Start building wealth.'}
            </motion.h1>
            <motion.p {...stagger(2)} className="mb-10 font-body text-[0.88rem]" style={{ color: 'var(--muted)' }}>
              {mode === 'login' ? (
                <>New here? <Link to="/signup" className="font-semibold no-underline hover:underline" style={{ color: 'var(--accent)' }}>Create an account →</Link></>
              ) : (
                <>Already a member? <Link to="/login" className="font-semibold no-underline hover:underline" style={{ color: 'var(--accent)' }}>Sign in</Link></>
              )}
            </motion.p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {mode === 'signup' && (
                <motion.div {...stagger(3)}>
                  <label className="mb-[7px] block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Full name</label>
                  <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
                    className={inputClass('name')}
                    style={{ background: 'var(--bg)', border: errors.name ? '1.5px solid #ef4444' : '1.5px solid var(--border)', color: 'var(--ink)' }}
                    onFocus={e => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { if (!errors.name) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  />
                  {errors.name && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-body text-[0.77rem]" style={{ color: '#ef4444' }}>{errors.name}</motion.p>}
                </motion.div>
              )}

              <motion.div {...stagger(mode === 'signup' ? 4 : 3)}>
                <label className="mb-[7px] block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
                  className={inputClass('email')}
                  style={{ background: 'var(--bg)', border: errors.email ? '1.5px solid #ef4444' : '1.5px solid var(--border)', color: 'var(--ink)' }}
                  onFocus={e => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onBlur={e => { if (!errors.email) e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
                {errors.email && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-body text-[0.77rem]" style={{ color: '#ef4444' }}>{errors.email}</motion.p>}
              </motion.div>

              <motion.div {...stagger(mode === 'signup' ? 5 : 4)}>
                <label className="mb-[7px] block font-body text-[0.8rem] font-medium" style={{ color: 'var(--ink-2)' }}>Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                    className={inputClass('password')}
                    style={{ background: 'var(--bg)', border: errors.password ? '1.5px solid #ef4444' : '1.5px solid var(--border)', color: 'var(--ink)' }}
                    onFocus={e => { if (!errors.password) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onBlur={e => { if (!errors.password) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[14px] top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--muted-2)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-2)')}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-body text-[0.77rem]" style={{ color: '#ef4444' }}>{errors.password}</motion.p>}
                {mode === 'signup' && password.length > 0 && <PasswordStrength password={password} />}
              </motion.div>

              {mode === 'login' && (
                <motion.div {...stagger(5)} className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <div onClick={() => setRemember(!remember)} className="flex h-4 w-4 items-center justify-center rounded-[5px] transition-all" style={{ border: `1.5px solid ${remember ? 'var(--accent)' : 'var(--border)'}`, background: remember ? 'var(--accent)' : 'transparent' }}>
                      {remember && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span className="font-body text-[0.82rem]" style={{ color: 'var(--muted)' }}>Remember for 30 days</span>
                  </label>
                  <a href="#" className="font-body text-[0.82rem] font-semibold" style={{ color: 'var(--accent)' }}>Forgot password?</a>
                </motion.div>
              )}

              <motion.div {...stagger(6)}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01, y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  className="auth-submit-btn flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] py-[13px] font-body text-[0.9rem] font-semibold text-white transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                  style={{ background: 'var(--ink)', boxShadow: 'var(--shadow-md)' }}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>{mode === 'login' ? 'Sign in →' : 'Create account →'}</>
                  )}
                </motion.button>
              </motion.div>

              <motion.div {...stagger(7)} className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
                <span className="font-body text-[0.78rem]" style={{ color: 'var(--muted-2)' }}>or</span>
                <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
              </motion.div>

              <motion.div {...stagger(8)}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] py-3 font-body text-[0.88rem] font-medium transition-all duration-200"
                  style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', color: 'var(--ink)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </motion.button>
              </motion.div>

              {mode === 'signup' && (
                <motion.p {...stagger(9)} className="text-center font-body text-[0.73rem]" style={{ color: 'var(--muted-2)' }}>
                  By continuing, you agree to our Terms and Privacy Policy.
                </motion.p>
              )}
            </form>
          </motion.div>
        </AnimatePresence>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="absolute bottom-8 left-7 flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] transition-all md:left-16"
          style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', color: 'var(--muted)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          {isDark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>

        {/* Auth submit dark mode override */}
        <style>{`
          [data-theme="dark"] .auth-submit-btn {
            background: var(--accent) !important;
            color: #0a0f0c !important;
            box-shadow: var(--shadow-accent) !important;
          }
        `}</style>
      </div>

      {/* Right Panel */}
      <div
        className="relative hidden overflow-hidden md:block"
        style={{ background: '#0a0c10' }}
        onMouseEnter={() => setHoveringRight(true)}
        onMouseLeave={() => setHoveringRight(false)}
      >
        {/* Grain filter */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
            <feComposite in="blend" in2="SourceGraphic" operator="in"/>
          </filter>
        </svg>
        <div className="pointer-events-none absolute inset-0" style={{ filter: 'url(#grain)', opacity: 0.03 }} />

        {/* Radial glow */}
        <div className="pointer-events-none absolute" style={{ top: '-200px', right: '-200px', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(31,212,112,0.08) 0%, transparent 55%)' }} />

        {/* Grid lines */}
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="flex h-full flex-col items-center justify-center px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative"
            >
              {slideData[slideIndex].card}
              {slideData[slideIndex].overlay}
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${slideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 text-center"
            >
              <p className="font-body text-[1rem] font-semibold" style={{ color: '#f0eff4', letterSpacing: '-0.01em' }}>{slideData[slideIndex].title}</p>
              <p className="mt-1 font-body text-[0.85rem]" style={{ color: 'rgba(240,239,244,0.45)' }}>{slideData[slideIndex].sub}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-6 flex items-center gap-2">
            {slideData.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slideIndex ? 20 : 6,
                  height: 6,
                  background: i === slideIndex ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Watermark */}
        <span className="absolute bottom-6 right-7 font-body text-[0.72rem] uppercase" style={{ color: 'rgba(255,255,255,0.08)', letterSpacing: '0.08em' }}>WealthPath v1.0</span>
      </div>
    </div>
  );
}
