import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const navLinks = ['Dashboard', 'Portfolio', 'Debts', 'News', 'AI Advisor'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-[200] h-16 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-8">
          {/* Logo */}
        <BrandLogo iconClassName="h-9 w-9 rounded-xl" textClassName="font-body text-[0.95rem] font-semibold tracking-tight" />

        {/* Center nav links - desktop */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="rounded-lg px-3 py-1.5 text-[0.85rem] font-medium transition-colors duration-150"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--ink)';
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block rounded-lg px-4 py-2 font-body text-[0.85rem] font-medium transition-all duration-200"
            style={{ color: 'var(--ink)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Log in
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 font-body text-[0.85rem] font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button className="md:hidden" style={{ color: 'var(--ink)' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute left-0 top-16 w-full px-6 py-4 backdrop-blur-xl md:hidden"
          style={{ background: 'rgba(255,255,255,0.96)', borderBottom: '1px solid var(--border)' }}>
          {navLinks.map((link) => (
            <a key={link} href="#" className="block py-2.5 font-body text-sm font-medium" style={{ color: 'var(--muted)' }}>
              {link}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); navigate('/login'); }}
            className="mt-3 w-full rounded-lg py-2.5 font-body text-sm font-medium"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}
