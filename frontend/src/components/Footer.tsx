import BrandLogo from './BrandLogo';

const footerCols = [
  { title: 'Features', links: ['AI Portfolio', 'Debt Planner', 'AI Advisor', 'News Feed', 'PDF Reports'] },
  { title: 'Learn', links: ['How It Works', 'Blog', 'Guides', 'FAQ', 'API Docs'] },
  { title: 'About', links: ['Company', 'GitHub', 'Careers', 'Press', 'Contact'] },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3">
            <BrandLogo
              iconClassName="h-9 w-9 rounded-xl"
              textClassName="font-body text-[0.95rem] font-semibold"
              showTagline
            />
          </div>
          <p className="mb-5 max-w-[220px] font-body text-[0.85rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            AI-powered financial planning for everyone. Live market data, real plans.
          </p>
          <div className="flex gap-2">
            {['𝕏', 'in', 'gh'].map((s) => (
              <button
                key={s}
                className="flex h-9 w-9 items-center justify-center rounded-lg font-body text-sm transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-body text-[0.8rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-[0.85rem] transition-colors duration-150"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] items-center justify-center gap-4 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="font-body text-[0.78rem]" style={{ color: 'var(--muted-2)' }}>© 2026 WealthPath</p>
      </div>
    </footer>
  );
}
