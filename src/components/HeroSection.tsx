import { ArrowRight, Play, Check, Sparkles, TrendingUp, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlurText from '@/components/ui/BlurText';

const checks = [
  'RAG-powered plans from live Yahoo Finance data',
  'Real-time portfolio tracking with live P&L',
  'Conversational AI advisor - ask anything',
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 overflow-hidden">
      <div className="relative z-[1] mx-auto grid min-h-[calc(100vh-64px)] max-w-[1200px] items-center gap-10 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <div
            className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full py-1 pl-2.5 pr-3.5"
            style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-dim)' }}
          >
            <span className="block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)', animation: 'pulseDot 2s infinite' }} />
            <span className="font-body text-[0.78rem] font-medium" style={{ color: 'var(--accent-deep)' }}>
              AI-powered financial planning
            </span>
          </div>

          <div className="mb-5">
            <BlurText
              text="Your wealth, finally working."
              delay={80}
              animateBy="words"
              direction="top"
              className="font-display text-[clamp(3rem,5vw,4.8rem)] font-normal leading-[1.05] tracking-tight"
              style={{ color: 'var(--ink)' }}
            />
          </div>

          <p
            className="animate-fade-up mb-8 max-w-[460px] font-body text-[0.95rem] leading-relaxed"
            style={{ animationDelay: '0.16s', color: 'var(--muted)' }}
          >
            WealthPath uses AI to build personalized financial plans grounded in live market data - so your money works as hard as you do.
          </p>

          <div className="animate-fade-up mb-9 flex flex-col gap-3" style={{ animationDelay: '0.22s' }}>
            {checks.map((t) => (
              <div key={t} className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md" style={{ background: 'var(--accent-dim)' }}>
                  <Check className="h-3 w-3" style={{ color: 'var(--accent)' }} />
                </div>
                <span className="font-body text-[0.88rem] font-medium" style={{ color: 'var(--ink-2)' }}>
                  {t}
                </span>
              </div>
            ))}
          </div>

          <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 font-body text-[0.9rem] font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: 'var(--accent)', boxShadow: 'var(--shadow-accent)' }}
            >
              Build my plan <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 font-body text-[0.9rem] font-medium transition-all duration-200"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--ink)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Play className="h-4 w-4" /> See how it works
            </button>
          </div>
        </div>

        <div className="relative hidden h-[560px] lg:block">
          <div
            className="absolute right-[18px] top-0 z-[1] h-[420px] w-[420px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.05) 38%, rgba(16,185,129,0) 72%)',
              filter: 'blur(10px)',
            }}
          />

          <div
            className="absolute right-[72px] top-[78px] z-[4] rounded-full px-4 py-2"
            style={{
              background: 'rgba(255,255,255,0.82)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 16px 32px rgba(15,23,42,0.08)',
              backdropFilter: 'blur(16px)',
              animation: 'cardFloat2 8s ease-in-out 0.8s infinite',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: 'var(--accent-light)', color: 'var(--accent-deep)' }}
              >
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--muted-2)' }}>
                  AI signal
                </p>
                <p className="font-body text-[0.8rem] font-semibold" style={{ color: 'var(--ink)' }}>
                  Cash flow looks strong this month
                </p>
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 top-[20px] z-[3] w-[300px] rounded-[42px] p-[10px]"
            style={{
              background: 'linear-gradient(160deg, #0f172a, #1e293b 48%, #0b1220)',
              border: '1px solid color-mix(in srgb, #111827 80%, #334155 20%)',
              boxShadow: '0 24px 58px rgba(15, 23, 42, 0.24)',
              animation: 'cardFloat 7s ease-in-out infinite',
            }}
          >
            <div
              className="relative overflow-hidden rounded-[32px] px-5 pb-5 pt-8"
              style={{
                background: 'linear-gradient(180deg, color-mix(in srgb, white 97%, #e2e8f0 3%), white)',
                border: '1px solid color-mix(in srgb, var(--border) 86%, white 14%)',
              }}
            >
              <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-xl" style={{ background: '#0b1220' }} />

              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-[0.72rem] font-medium" style={{ color: 'var(--muted)' }}>
                  9:41
                </span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="block h-2.5 rounded-full" style={{ width: i === 2 ? 15 : 10, background: '#9ca3af' }} />
                  ))}
                </div>
              </div>

              <p className="font-body text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                Total Balance
              </p>
              <p className="mt-1 font-display text-[1.85rem] leading-none" style={{ color: 'var(--ink)' }}>
                $24,840.00
              </p>
              <p className="mb-4 mt-2 font-body text-[0.78rem] font-medium" style={{ color: 'var(--accent)' }}>
                $1.3M net worth projection at 65
              </p>

              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  { label: '1M', value: '+8.4%', accent: '#10b981' },
                  { label: 'YTD', value: '+14.2%', accent: '#0ea5e9' },
                  { label: 'Risk', value: 'Medium', accent: '#f59e0b' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl px-3 py-2.5"
                    style={{ background: 'color-mix(in srgb, white 72%, var(--bg-secondary) 28%)', border: '1px solid var(--border)' }}
                  >
                    <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-2)' }}>
                      {item.label}
                    </p>
                    <p className="mt-1 font-body text-[0.8rem] font-semibold" style={{ color: item.accent }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <svg viewBox="0 0 240 76" className="mb-4 w-full">
                <defs>
                  <linearGradient id="heroPhoneAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(16,185,129,.20)" />
                    <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 64 Q40 60 80 50 Q120 34 160 28 Q200 22 240 14"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 420, strokeDashoffset: 420, animation: 'drawLine 2s ease forwards' }}
                />
                <path
                  d="M0 64 Q40 60 80 50 Q120 34 160 28 Q200 22 240 14 L240 76 L0 76 Z"
                  fill="url(#heroPhoneAreaGrad)"
                  style={{ opacity: 0, animation: 'fadeInFill 0.5s ease 2s forwards' }}
                />
              </svg>

              <div
                className="mb-4 rounded-[24px] px-4 py-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(17,50,44,0.94) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-white" />
                    <span className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/70">
                      Plan momentum
                    </span>
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-1 font-body text-[0.62rem] font-semibold text-white/80">
                    On track
                  </span>
                </div>
                <div className="mb-2 h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '72%',
                      background: 'linear-gradient(90deg, #34d399 0%, #67e8f9 100%)',
                    }}
                  />
                </div>
                <p className="font-body text-[0.74rem] leading-relaxed text-white/78">
                  Projected to hit your emergency-fund target 7 months earlier than baseline.
                </p>
              </div>

              <div className="pt-1" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="mb-1 font-body text-[0.62rem] font-semibold uppercase tracking-[0.11em]" style={{ color: 'var(--muted)' }}>
                  Cash
                </p>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span className="font-body text-[0.78rem]" style={{ color: 'var(--ink-2)' }}>
                      Cash Account
                    </span>
                  </div>
                  <span className="font-body text-[0.8rem] font-semibold" style={{ color: 'var(--ink)' }}>
                    $4,240.00
                  </span>
                </div>

                <div className="mb-1 mt-1" style={{ borderTop: '1px solid var(--border)' }} />
                <p className="mb-1 mt-2 font-body text-[0.62rem] font-semibold uppercase tracking-[0.11em]" style={{ color: 'var(--muted)' }}>
                  Investments
                </p>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#6366f1' }} />
                    <span className="font-body text-[0.78rem]" style={{ color: 'var(--ink-2)' }}>
                      Portfolio
                    </span>
                  </div>
                  <span className="font-body text-[0.8rem] font-semibold" style={{ color: 'var(--ink)' }}>
                    $18,200.00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                    <span className="font-body text-[0.78rem]" style={{ color: 'var(--ink-2)' }}>
                      Bond Portfolio
                    </span>
                  </div>
                  <span className="font-body text-[0.8rem] font-semibold" style={{ color: 'var(--ink)' }}>
                    $2,400.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute left-0 top-[50px] z-[2] w-[200px] rounded-2xl p-5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', animation: 'cardFloat2 8s ease-in-out 1.5s infinite' }}
          >
            <p className="mb-2.5 font-body text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Monthly Budget
            </p>
            <p className="mb-3 font-display text-[1.1rem]" style={{ color: 'var(--ink)' }}>
              $3,800 / mo
            </p>
            {[
              { label: 'Investments', pct: 35, color: 'var(--accent)' },
              { label: 'Savings', pct: 15, color: '#6366f1' },
              { label: 'Debt Payoff', pct: 20, color: '#f59e0b' },
            ].map((b) => (
              <div key={b.label} className="mb-2">
                <div className="mb-1 flex justify-between font-body text-[0.7rem]">
                  <span style={{ color: 'var(--muted)' }}>{b.label}</span>
                  <span className="font-semibold" style={{ color: 'var(--ink)' }}>
                    {b.pct}%
                  </span>
                </div>
                <div className="h-1 w-full rounded-full" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full transition-all duration-[1.5s] ease-out" style={{ width: `${b.pct}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute left-[28px] top-[250px] z-[2] w-[210px] rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.84)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 18px 36px rgba(15,23,42,0.08)',
              backdropFilter: 'blur(16px)',
              animation: 'cardFloat 8.5s ease-in-out 0.6s infinite',
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent-deep)' }}
                >
                  <WalletCards className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-body text-[0.64rem] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-2)' }}>
                    Allocation
                  </p>
                  <p className="font-body text-[0.82rem] font-semibold" style={{ color: 'var(--ink)' }}>
                    Portfolio mix
                  </p>
                </div>
              </div>
              <span className="font-body text-[0.7rem] font-semibold" style={{ color: 'var(--accent-deep)' }}>
                Healthy
              </span>
            </div>
            <div className="mb-3 flex items-center gap-3">
              <div
                className="relative h-16 w-16 rounded-full"
                style={{
                  background:
                    'conic-gradient(var(--accent) 0 38%, #6366f1 38% 63%, #f59e0b 63% 82%, #cbd5e1 82% 100%)',
                }}
              >
                <div className="absolute inset-[9px] rounded-full bg-white" />
              </div>
              <div className="space-y-1.5">
                {[
                  ['Core equities', '38%', 'var(--accent)'],
                  ['Dividend', '25%', '#6366f1'],
                  ['Fixed income', '19%', '#f59e0b'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <span className="font-body text-[0.72rem]" style={{ color: 'var(--ink-2)' }}>
                      {label}
                    </span>
                    <span className="ml-auto font-body text-[0.72rem] font-semibold" style={{ color: 'var(--ink)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-body text-[0.72rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              Diversified enough to compound, calm enough to stay invested.
            </p>
          </div>

          <div
            className="absolute bottom-[30px] left-[10px] z-[2] w-[220px] rounded-2xl p-5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', animation: 'cardFloat2 9s ease-in-out 0.5s infinite' }}
          >
            <p className="mb-2 font-body text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              AI Advisor
            </p>
            <div className="flex flex-col gap-2">
              <div
                className="self-end rounded-xl rounded-tr-sm px-3 py-2 font-body text-[0.75rem] text-white"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #18233a 100%)' }}
              >
                How much can I save monthly?
              </div>
              <div className="self-start rounded-xl rounded-tl-sm px-3 py-2 font-body text-[0.75rem]" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--ink)' }}>
                Based on your profile, ~$420/mo after expenses.
              </div>
              <div className="flex items-center gap-1 self-start">
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="block h-1 w-1 rounded-full" style={{ background: 'var(--accent)', animation: `typingBounce 0.8s infinite ${d}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
