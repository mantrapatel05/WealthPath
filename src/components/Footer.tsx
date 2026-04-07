const footerCols = [
  { title: 'Features', links: ['AI Portfolio', 'Debt Planner', 'AI Advisor', 'News Feed', 'PDF Reports'] },
  { title: 'Learn', links: ['How It Works', 'Blog', 'Guides', 'FAQ', 'API Docs'] },
  { title: 'About', links: ['Company', 'GitHub', 'Careers', 'Press', 'Contact'] },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-[72px] pb-10 md:px-16" style={{ background: '#080a0e', borderTop: '1px solid #1a1c24' }}>
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: 'rgba(31,212,112,.15)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L12 7L7 13L2 7L7 1Z" fill="#1fd470" /></svg>
            </div>
            <span className="font-body text-base font-bold" style={{ color: '#f0eff4' }}>WealthPath</span>
          </div>
          <p className="mb-5 max-w-[220px] font-body text-[0.85rem] leading-[1.6]" style={{ color: '#4a4a5a' }}>
            AI-powered financial planning for everyone. Live market data, real plans.
          </p>
          <div className="flex gap-2.5">
            {['𝕏', 'in', 'gh'].map((s) => (
              <button
                key={s}
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[var(--radius-sm)] font-body text-sm transition-all duration-200"
                style={{ background: '#13141a', border: '1px solid #1a1c24', color: '#4a4a5a' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(31,212,112,0.4)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1c24'; e.currentTarget.style.color = '#4a4a5a'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-[18px] font-body text-[0.82rem] font-semibold uppercase" style={{ letterSpacing: '0.05em', color: '#f0eff4' }}>{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-[0.83rem] transition-colors duration-150"
                    style={{ color: '#4a4a5a' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#4a4a5a')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-[60px] flex max-w-[1400px] flex-col items-center justify-between gap-4 pt-7 md:flex-row" style={{ borderTop: '1px solid #1a1c24' }}>
        <p className="font-body text-[0.78rem]" style={{ color: '#2e303a' }}>© 2026 WealthPath · Built by mantrapatel05</p>
        <p className="max-w-[500px] text-right font-body text-[0.72rem] leading-[1.5]" style={{ color: '#2e303a' }}>
          This is a demo application and does not constitute financial advice. Past performance does not guarantee future results.
        </p>
      </div>
    </footer>
  );
}
