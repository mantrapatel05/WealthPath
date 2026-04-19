import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import {
  ApiError,
  clearAuthSession,
  fetchProfile,
  loginUser,
  saveAuthSession,
  signupUser,
} from '../lib/auth';

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
          <div
            key={i}
            className="h-[2px] flex-1 rounded-full transition-all"
            style={{ background: i < criteria ? color : 'var(--border)' }}
          />
        ))}
      </div>
      {label && (
        <p className="mt-1 font-body text-[0.72rem]" style={{ color }}>
          {label}
        </p>
      )}
    </div>
  );
}

const words = ['wealth.', 'freedom.', 'clarity.', 'growth.'];
const signupPasswordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

function RotatingWord({ reduceMotion }: { reduceMotion: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % words.length), 2600);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <span className="inline-block" style={{ color: 'var(--accent)' }}>
        {words[0]}
      </span>
    );
  }

  return (
    <span className="relative inline-block min-w-[180px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ color: 'var(--accent)' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const stats = [
  { value: '2,400+', label: 'Plans generated' },
  { value: '$0', label: 'Account fees' },
  { value: '< 4min', label: 'Plan delivery' },
];

const testimonials = [
  {
    quote:
      "WealthPath gave me a real financial plan in under 4 minutes. I've never had this level of clarity about my money.",
    name: 'Sarah K.',
    role: 'Beta user',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'I finally know exactly how much to invest each month without second-guessing every decision.',
    name: 'Daniel R.',
    role: 'Early adopter',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'The live market + AI combo saved me hours each week. It feels like having a smart financial copilot.',
    name: 'Priya M.',
    role: 'Product designer',
    avatar:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote:
      'Debt payoff strategies used to confuse me. Now I can compare avalanche vs snowball instantly.',
    name: 'Marcus T.',
    role: 'Software engineer',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
  },
];

export default function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const [redirectTo, setRedirectTo] = useState('/onboarding');

  useEffect(() => {
    document.title = mode === 'login' ? 'Sign in - WealthPath' : 'Get started - WealthPath';
  }, [mode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setTestimonialIndex((previous) => (previous + 1) % testimonials.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => navigate(redirectTo), 1200);
    return () => clearTimeout(timer);
  }, [navigate, redirectTo, success]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (mode === 'signup' && !name.trim()) {
      nextErrors.name = 'Please enter your full name.';
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (mode === 'signup') {
      if (!signupPasswordPattern.test(password)) {
        nextErrors.password =
          'Use 8+ chars including an uppercase letter, a number, and a symbol.';
      }
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof ApiError) return error.detail;
    return 'Something went wrong. Please try again.';
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNotice('');

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      const session =
        mode === 'signup'
          ? await signupUser({
              name: name.trim(),
              email: email.trim().toLowerCase(),
              password,
            })
          : await loginUser({
              email: email.trim().toLowerCase(),
              password,
            });

      saveAuthSession(session);

      if (mode === 'signup') {
        setRedirectTo('/onboarding');
        setSuccess(true);
        return;
      }

      try {
        await fetchProfile(session.access_token);
        setRedirectTo('/dashboard');
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          setRedirectTo('/onboarding');
        } else {
          throw error;
        }
      }

      setSuccess(true);
    } catch (error) {
      clearAuthSession();
      setNotice(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const updateField =
    (field: 'name' | 'email' | 'password', setter: (value: string) => void) =>
    (value: string) => {
      setter(value);
      if (!errors[field]) return;
      setErrors((previous) => {
        const next = { ...previous };
        delete next[field];
        return next;
      });
    };

  const inputClass = (field: string) =>
    `w-full rounded-xl border px-4 py-3 font-body text-[0.9rem] outline-none transition-all duration-200 ${
      errors[field]
        ? 'border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/25'
        : 'border-[var(--border)] focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]'
    }`;

  const stagedMotion = (index: number) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.34,
      delay: reduceMotion ? 0 : index * 0.045,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  if (success) {
    return (
      <div
        className="flex min-h-[100dvh] items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >
        <motion.div
          initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: 'easeOut' }}
          className="text-center"
        >
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: 'var(--accent-light)',
              border: '2px solid var(--accent)',
            }}
          >
            <motion.svg width="40" height="40" viewBox="0 0 40 40">
              <motion.path
                d="M10 20L17 27L30 14"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.12 }}
              />
            </motion.svg>
          </div>
          <h2 className="mb-2 font-display text-[1.8rem]" style={{ color: 'var(--ink)' }}>
            You are all set!
          </h2>
          <p className="font-body text-[0.9rem]" style={{ color: 'var(--muted)' }}>
            {redirectTo === '/dashboard'
              ? 'Redirecting to your dashboard...'
              : 'Taking you into profile setup...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative grid min-h-[100dvh] md:h-[100dvh] md:grid-cols-[480px_1fr]">
      <div
        className="pointer-events-none absolute bottom-0 left-[480px] top-0 hidden w-px md:block"
        style={{ background: 'var(--border)' }}
      />
      {/* Left Panel - Form */}
      <div
        className="relative flex flex-col justify-center px-7 py-10 sm:px-10 md:overflow-y-auto md:px-14"
        style={{ background: 'var(--bg)' }}
      >
        <motion.div {...stagedMotion(0)} className="mb-10 md:mb-12">
          <Link to="/" className="flex items-center gap-2.5">
            <BrandLogo iconClassName="h-10 w-10 rounded-xl" textClassName="font-body text-[0.98rem] font-semibold" />
          </Link>
          <Link
            to="/"
            className="mt-3 inline-block font-body text-[0.8rem] transition-colors hover:text-[var(--ink)]"
            style={{ color: 'var(--muted)' }}
          >
            {'<-'} Back to home
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, x: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <motion.h1
              {...stagedMotion(1)}
              className="mb-2 font-display text-[2rem] leading-[1.1] tracking-tight sm:text-[2.2rem]"
              style={{ color: 'var(--ink)' }}
            >
              {mode === 'login' ? 'Welcome back.' : 'Start building wealth.'}
            </motion.h1>

            <motion.p
              {...stagedMotion(2)}
              className="mb-7 font-body text-[0.88rem]"
              style={{ color: 'var(--muted)' }}
            >
              {mode === 'login' ? (
                <>
                  New here?{' '}
                  <Link
                    to="/signup"
                    className="font-medium no-underline hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already a member?{' '}
                  <Link
                    to="/login"
                    className="font-medium no-underline hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </motion.p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
              {mode === 'signup' && (
                <motion.div {...stagedMotion(3)}>
                  <label
                    htmlFor="auth-name"
                    className="mb-1.5 block font-body text-[0.8rem] font-medium"
                    style={{ color: 'var(--ink-2)' }}
                  >
                    Full name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(event) => updateField('name', setName)(event.target.value)}
                    className={inputClass('name')}
                    style={{ background: 'var(--bg-secondary)', color: 'var(--ink)' }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 font-body text-[0.77rem] text-red-500">
                      {errors.name}
                    </p>
                  )}
                </motion.div>
              )}

              <motion.div {...stagedMotion(mode === 'signup' ? 4 : 3)}>
                <label
                  htmlFor="auth-email"
                  className="mb-1.5 block font-body text-[0.8rem] font-medium"
                  style={{ color: 'var(--ink-2)' }}
                >
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => updateField('email', setEmail)(event.target.value)}
                  className={inputClass('email')}
                  style={{ background: 'var(--bg-secondary)', color: 'var(--ink)' }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 font-body text-[0.77rem] text-red-500">
                    {errors.email}
                  </p>
                )}
              </motion.div>

              <motion.div {...stagedMotion(mode === 'signup' ? 5 : 4)}>
                <label
                  htmlFor="auth-password"
                  className="mb-1.5 block font-body text-[0.8rem] font-medium"
                  style={{ color: 'var(--ink-2)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    placeholder="********"
                    value={password}
                    onChange={(event) => updateField('password', setPassword)(event.target.value)}
                    className={`${inputClass('password')} pr-11`}
                    style={{ background: 'var(--bg-secondary)', color: 'var(--ink)' }}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]"
                    style={{ color: 'var(--muted-2)' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 font-body text-[0.77rem] text-red-500">
                    {errors.password}
                  </p>
                )}
                {mode === 'signup' && password.length > 0 && <PasswordStrength password={password} />}
              </motion.div>

              {mode === 'login' && (
                <motion.div {...stagedMotion(5)} className="flex items-center justify-between">
                  <label htmlFor="remember-me" className="flex cursor-pointer items-center gap-2">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded border-[1.5px] transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-glow)]"
                      style={{
                        borderColor: remember ? 'var(--accent)' : 'var(--border)',
                        background: remember ? 'var(--accent)' : 'transparent',
                      }}
                      aria-hidden="true"
                    >
                      {remember && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="font-body text-[0.82rem]" style={{ color: 'var(--muted)' }}>
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setNotice('Reset password flow can be connected once the backend endpoint is ready.')
                    }
                    className="font-body text-[0.82rem] font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]"
                    style={{ color: 'var(--accent)' }}
                  >
                    Forgot password?
                  </button>
                </motion.div>
              )}

              {notice && (
                <p className="font-body text-[0.77rem]" style={{ color: 'var(--muted)' }} aria-live="polite">
                  {notice}
                </p>
              )}

              <motion.div {...stagedMotion(6)} className="mt-1">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={reduceMotion ? undefined : { scale: 1.003 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-body text-[0.9rem] font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ background: 'var(--accent)' }}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>{mode === 'login' ? 'Sign in' : 'Create account'}</>
                  )}
                </motion.button>
              </motion.div>

              <motion.div {...stagedMotion(7)} className="relative my-2 h-5 w-full">
                <div
                  className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
                  style={{ background: 'var(--border-strong)' }}
                />
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 font-body text-[0.78rem] leading-none"
                  style={{ color: 'var(--muted)', background: 'var(--bg)' }}
                >
                  or
                </span>
              </motion.div>

              <motion.div {...stagedMotion(8)}>
                <motion.button
                  type="button"
                  whileHover={reduceMotion ? undefined : { scale: 1.003 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border py-3 font-body text-[0.88rem] font-medium transition-all duration-200 hover:border-[var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)]"
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--ink)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </motion.button>
              </motion.div>

              {mode === 'signup' && (
                <motion.p
                  {...stagedMotion(9)}
                  className="text-center font-body text-[0.73rem]"
                  style={{ color: 'var(--muted-2)' }}
                >
                  By continuing, you agree to our Terms and Privacy Policy.
                </motion.p>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel - Showcase */}
      <div
        className="relative hidden overflow-hidden md:flex md:flex-col md:items-center md:justify-center"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: '-15%',
            left: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 max-w-[420px] px-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.1 }}
          >
            <p
              className="mb-6 font-body text-[0.78rem] font-medium uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              AI-Powered Planning
            </p>
            <h2
              className="mb-4 font-display text-[2.8rem] leading-[1.1] tracking-tight"
              style={{ color: 'var(--ink)' }}
            >
              Build your
              <br />
              <RotatingWord reduceMotion={Boolean(reduceMotion)} />
            </h2>
            <p className="mb-10 font-body text-[0.92rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              Join thousands using AI to make smarter financial decisions with live market data.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.24 }}
            className="flex gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[1.6rem] tracking-tight" style={{ color: 'var(--ink)' }}>
                  {stat.value}
                </p>
                <p className="font-body text-[0.75rem]" style={{ color: 'var(--muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.35 }}
            className="mt-12 rounded-2xl p-5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-3 font-display text-[0.95rem] italic leading-relaxed" style={{ color: 'var(--ink)' }}>
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={testimonials[testimonialIndex].avatar}
                    alt={testimonials[testimonialIndex].name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-body text-[0.78rem] font-medium" style={{ color: 'var(--ink)' }}>
                      {testimonials[testimonialIndex].name}
                    </p>
                    <p className="font-body text-[0.7rem]" style={{ color: 'var(--muted)' }}>
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
