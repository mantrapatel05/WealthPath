import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navLinks = ['Dashboard', 'Portfolio', 'Debts', 'News', 'AI Advisor'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wealthpath-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('wealthpath-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <nav
      className="sticky top-0 z-[200] h-16 transition-all duration-300"
      style={{
        background: isDark
          ? 'rgba(14, 15, 20, 0.85)'
          : (scrolled ? 'rgba(250, 249, 247, 0.92)' : 'rgba(250, 249, 247, 0.88)'),
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? 'var(--shadow-xs)' : 'none',
      }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 md:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: isDark ? 'var(--accent)' : '#1a1714' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L12 7L7 13L2 7L7 1Z" fill={isDark ? '#0e0f14' : '#16b85e'} />
            </svg>
          </div>
          <span className="font-body text-base font-bold" style={{ color: 'var(--ink)' }}>WealthPath</span>
        </div>

        {/* Center nav links - desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="nav-link-wp relative px-3.5 py-1.5 text-[0.875rem] font-medium transition-colors duration-150 rounded-[9px]"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block rounded-[var(--radius-md)] px-[18px] py-2 font-body text-[0.875rem] font-medium transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1.5px solid var(--border-strong)',
              color: 'var(--ink)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--ink)'; }}
          >
            Log in
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDark(prev => !prev)}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[var(--radius-sm)] transition-all duration-200"
            style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)' }}>
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="flex items-center gap-[7px] rounded-[var(--radius-md)] px-5 py-[9px] font-body text-[0.875rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px"
            style={{
              background: 'var(--accent)',
              boxShadow: 'var(--shadow-accent)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-deep)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; }}
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="md:hidden" style={{ color: 'var(--ink)' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute left-0 top-16 w-full px-6 py-4 backdrop-blur-xl md:hidden"
          style={{ background: isDark ? 'rgba(14,15,20,0.96)' : 'rgba(250,249,247,0.96)', borderBottom: '1px solid var(--border)' }}>
          {navLinks.map((link) => (
            <a key={link} href="#" className="block py-2 font-body text-sm font-medium" style={{ color: 'var(--muted)' }}>
              {link}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); navigate('/login'); }}
            className="mt-2 w-full rounded-[var(--radius-md)] py-2 font-body text-sm font-medium"
            style={{ border: '1.5px solid var(--border)', color: 'var(--ink)' }}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}
