import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const wealthQuotes = [
  { text: 'Build wealth with systems, not with guesses.', author: 'WealthPath Principle' },
  { text: 'The best investment rhythm is consistency over intensity.', author: 'WealthPath Principle' },
  { text: 'Cash flow creates freedom before net worth does.', author: 'WealthPath Principle' },
  { text: 'Small monthly moves compound into life-changing outcomes.', author: 'WealthPath Principle' },
  { text: 'Protect downside first, then let compounding do its work.', author: 'WealthPath Principle' },
];

export default function CTASection() {
  const ref = useScrollReveal();
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % wealthQuotes.length);
    }, 1000 * 6);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="scroll-reveal relative z-10 mx-auto grid max-w-[1200px] items-center gap-16 md:grid-cols-2">
        <div>
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full py-1 pl-2.5 pr-3.5"
            style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-dim)' }}
          >
            <span className="font-body text-[0.75rem] font-medium" style={{ color: 'var(--accent-deep)' }}>
              Start Today
            </span>
          </div>
          <h2
            className="mb-5 font-display text-[clamp(2rem,3.5vw,3.2rem)] font-normal leading-[1.1] tracking-tight"
            style={{ color: 'var(--ink)' }}
          >
            Save and invest for
            <br />
            <em className="italic" style={{ color: 'var(--accent)' }}>
              what's next.
            </em>
          </h2>
          <p className="mb-8 max-w-[420px] font-body text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            Fill in your profile, hit Generate, and in 4 minutes you have a real personalized financial plan grounded in today's live market data.
          </p>
          <div className="mb-7 max-w-[490px] pl-4" style={{ borderLeft: '2px solid color-mix(in srgb, var(--accent) 55%, var(--border) 45%)' }}>
            <p className="mb-1 font-body text-[0.63rem] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-deep)' }}>
              Wealth Wisdom
            </p>
            <p key={quoteIndex} className="cta-quote-fade font-body text-[0.88rem] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              "{wealthQuotes[quoteIndex].text}"
            </p>
            <p className="mt-1 font-body text-[0.72rem] font-medium" style={{ color: 'var(--muted)' }}>
              {wealthQuotes[quoteIndex].author}
            </p>
          </div>
          <button
            onClick={() => navigate('/signup')}
            className="mb-3 flex items-center gap-2 rounded-xl px-7 py-3.5 font-body text-[0.9rem] font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--accent)', boxShadow: 'var(--shadow-accent)' }}
          >
            Open your account <ArrowRight className="h-4 w-4" />
          </button>
          <p className="font-body text-[0.8rem]" style={{ color: 'var(--muted)' }}>
            Free to start. No credit card required.
          </p>
        </div>

        <div className="relative hidden md:flex md:items-center md:justify-center">
          <span
            className="cta-live-blob cta-live-blob-a"
            style={{ background: 'color-mix(in srgb, var(--accent) 22%, transparent)' }}
          />
          <span
            className="cta-live-blob cta-live-blob-b"
            style={{ background: 'color-mix(in srgb, #3b82f6 20%, transparent)' }}
          />
          <div className="cta-live-plane" />

          <div
            className="cta-live-shell relative w-full max-w-[448px] rounded-[28px] p-7"
            style={{
              background:
                'linear-gradient(155deg, color-mix(in srgb, white 92%, var(--accent) 8%), color-mix(in srgb, var(--bg) 96%, #dbeafe 4%))',
              border: '1px solid color-mix(in srgb, var(--border) 70%, var(--accent) 30%)',
              boxShadow: '0 16px 46px rgba(15, 23, 42, 0.08)',
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--muted)' }}>
                Live Plan Snapshot
              </p>
              <span
                className="inline-flex items-center rounded-full px-2 py-1 font-body text-[0.66rem] font-semibold"
                style={{ color: 'var(--accent-deep)', background: 'var(--accent-light)', border: '1px solid var(--accent-dim)' }}
              >
                +12.4% YoY
              </span>
            </div>

            <div
              className="mb-4 rounded-2xl p-4"
              style={{
                background: 'linear-gradient(180deg, white, color-mix(in srgb, var(--bg) 94%, #ecfeff 6%))',
                border: '1px solid color-mix(in srgb, var(--border) 82%, white 18%)',
              }}
            >
              <div className="mb-2 flex items-end justify-between">
                <p className="font-body text-[0.76rem] font-medium" style={{ color: 'var(--muted)' }}>
                  Projected Net Worth
                </p>
                <p className="cta-live-number font-display text-[1.15rem]" style={{ color: 'var(--ink)' }}>
                  $1.34M
                </p>
              </div>

              <svg viewBox="0 0 320 100" className="h-[88px] w-full overflow-hidden">
                <defs>
                  <linearGradient id="ctaGrowth" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 35%, transparent)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                  <linearGradient id="ctaBeam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="color-mix(in srgb, white 65%, var(--accent) 35%)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  className="cta-live-line"
                  d="M0 82 C50 78, 85 62, 125 58 C165 53, 195 38, 230 31 C258 25, 290 20, 314 14"
                  fill="none"
                  stroke="url(#ctaGrowth)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  className="cta-live-beam"
                  d="M0 82 C50 78, 85 62, 125 58 C165 53, 195 38, 230 31 C258 25, 290 20, 314 14"
                  fill="none"
                  stroke="url(#ctaBeam)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="42 500"
                />
                <g fill="var(--accent)">
                  <circle cx="125" cy="58" r="3.2" opacity="0.7" />
                  <circle cx="230" cy="31" r="3.2" opacity="0.7" />
                  <circle className="cta-live-dot-end" cx="314" cy="14" r="3.8" />
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-2xl p-3.5"
                style={{
                  background: 'linear-gradient(180deg, white, color-mix(in srgb, var(--bg) 95%, #ecfeff 5%))',
                  border: '1px solid color-mix(in srgb, var(--border) 84%, white 16%)',
                }}
              >
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
                  Auto-Invest
                </p>
                <p className="mt-1 font-display text-[1rem]" style={{ color: 'var(--ink)' }}>
                  $420/mo
                </p>
                <p className="mt-1 font-body text-[0.72rem] cta-live-positive" style={{ color: 'var(--accent)' }}>
                  On track
                </p>
              </div>
              <div
                className="rounded-2xl p-3.5"
                style={{
                  background: 'linear-gradient(180deg, white, color-mix(in srgb, var(--bg) 95%, #eff6ff 5%))',
                  border: '1px solid color-mix(in srgb, var(--border) 84%, white 16%)',
                }}
              >
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
                  Goal ETA
                </p>
                <p className="mt-1 font-display text-[1rem]" style={{ color: 'var(--ink)' }}>
                  2y 9m
                </p>
                <p className="mt-1 font-body text-[0.72rem]" style={{ color: 'var(--accent)' }}>
                  -5 months faster
                </p>
              </div>
            </div>

            <div
              className="mt-3 overflow-hidden rounded-xl"
              style={{
                border: '1px solid color-mix(in srgb, var(--border) 84%, white 16%)',
                background: 'linear-gradient(180deg, white, color-mix(in srgb, var(--bg) 97%, #ecfeff 3%))',
              }}
            >
              <div className="cta-live-ticker flex items-center gap-2 whitespace-nowrap px-3 py-2 font-body text-[0.68rem] font-medium">
                <span style={{ color: 'var(--ink)' }}>Live rebalance signal detected</span>
                <span style={{ color: 'var(--muted)' }}>|</span>
                <span style={{ color: 'var(--accent)' }}>Tax-loss opportunity: 2 positions</span>
                <span style={{ color: 'var(--muted)' }}>|</span>
                <span style={{ color: 'var(--ink)' }}>Cash drag reduced by 1.3%</span>
                <span style={{ color: 'var(--muted)' }}>|</span>
                <span style={{ color: 'var(--accent)' }}>Next review in 6 days</span>
              </div>
            </div>

            <div
              className="cta-live-badge absolute -right-4 -top-4 rounded-xl px-3 py-2 font-body text-[0.68rem] font-semibold"
              style={{ background: 'var(--ink)', color: 'white', boxShadow: 'var(--shadow-md)' }}
            >
              AI confidence: 94%
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-quote-fade {
          animation: ctaQuoteFade 0.45s ease;
        }
        .cta-live-plane {
          position: absolute;
          z-index: 0;
          width: 92%;
          max-width: 410px;
          height: 88%;
          border-radius: 24px;
          transform: rotate(-6deg) translate(-10px, 8px);
          background: linear-gradient(135deg, color-mix(in srgb, var(--ink) 14%, transparent), color-mix(in srgb, var(--accent) 10%, transparent));
          border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
          box-shadow: var(--shadow-md);
          opacity: 0.55;
        }
        .cta-live-shell {
          position: relative;
          z-index: 1;
        }
        .cta-live-shell::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 35%, color-mix(in srgb, white 65%, transparent), transparent 65%);
          transform: translateX(-130%);
          animation: ctaShimmer 4.5s ease-in-out infinite;
        }
        .cta-live-blob {
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 999px;
          filter: blur(24px);
          opacity: 0.7;
          z-index: 0;
        }
        .cta-live-blob-a {
          left: 10px;
          top: 24px;
          animation: ctaBlobA 7s ease-in-out infinite;
        }
        .cta-live-blob-b {
          right: 0;
          bottom: 16px;
          animation: ctaBlobB 8.5s ease-in-out infinite;
        }
        .cta-live-line {
          stroke-dasharray: 520;
          stroke-dashoffset: 520;
          animation: ctaLine 1.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cta-live-beam {
          stroke-dashoffset: 610;
          animation: ctaBeam 3.2s linear infinite;
        }
        .cta-live-dot-end { animation: ctaEndDot 2.2s ease-in-out infinite; }
        .cta-live-number { animation: ctaPulse 2.8s ease-in-out infinite; }
        .cta-live-positive { animation: ctaBlink 1.9s ease-in-out infinite; }
        .cta-live-badge { animation: ctaFloat 4.2s ease-in-out infinite; }
        .cta-live-ticker {
          width: max-content;
          animation: ctaTicker 20s linear infinite;
        }

        @keyframes ctaQuoteFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaLine { to { stroke-dashoffset: 0; } }
        @keyframes ctaBeam { to { stroke-dashoffset: 0; } }
        @keyframes ctaEndDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.18); opacity: 0.74; }
        }
        @keyframes ctaPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes ctaBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.62; }
        }
        @keyframes ctaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ctaShimmer {
          0%, 15% { transform: translateX(-130%); opacity: 0; }
          30%, 80% { opacity: 0.35; }
          100% { transform: translateX(130%); opacity: 0; }
        }
        @keyframes ctaTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-48%); }
        }
        @keyframes ctaBlobA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(14px, -8px) scale(1.1); }
        }
        @keyframes ctaBlobB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12px, 10px) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-live-shell::after,
          .cta-live-line,
          .cta-live-beam,
          .cta-live-dot-end,
          .cta-live-number,
          .cta-live-positive,
          .cta-live-badge,
          .cta-live-ticker,
          .cta-live-blob-a,
          .cta-live-blob-b {
            animation: none !important;
          }
          .cta-live-line { stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </section>
  );
}
