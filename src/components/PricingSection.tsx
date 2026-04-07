import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const plans = [
  {
    title: 'Starter',
    price: '$0',
    period: '/mo',
    desc: 'Get a feel for AI-powered planning before you commit.',
    features: [
      'Manual portfolio tracking with real-time P&L calculations',
      'Debt payoff calculator — avalanche & snowball comparison',
      'News feed filtered to your portfolio holdings',
    ],
    btn: 'Get started free',
    featured: false,
  },
  {
    title: 'AI Plan',
    price: '$19',
    period: '/mo',
    desc: 'Full RAG pipeline. A real financial plan powered by today\'s live market data.',
    features: [
      'AI Portfolio — live ETF recommendations via semantic RAG retrieval',
      'Conversational AI advisor powered by Gemini 2.0 Flash',
      'Monthly rebalancing alerts, goal tracking & PDF export',
    ],
    btn: 'Get started',
    featured: true,
  },
  {
    title: 'Advisor Pro',
    price: 'Custom',
    period: '',
    desc: 'For financial advisors managing multiple client portfolios at scale.',
    features: [
      'Multi-client dashboard — manage 50+ client profiles in one view',
      'White-label client portal with your own branding & domain',
      'Compliance mode with advisor-certified output and audit trail',
    ],
    btn: 'Contact us',
    featured: false,
  },
];

export default function PricingSection() {
  const ref = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-8">
      <div className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full py-1 pl-2.5 pr-3.5" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-dim)' }}>
          <span className="font-body text-[0.75rem] font-medium" style={{ color: 'var(--accent-deep)' }}>Plans</span>
        </div>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] font-normal leading-[1.1] tracking-tight" style={{ color: 'var(--ink)' }}>
          Investing built <em className="italic" style={{ color: 'var(--accent)' }}>your way.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[400px] font-body text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
          Start free, upgrade when you're ready. No lock-ins, no hidden fees.
        </p>
      </div>

      <div ref={ref} className="scroll-reveal grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${plan.featured ? 'md:-translate-y-2' : ''}`}
            style={plan.featured ? {
              background: 'linear-gradient(165deg, color-mix(in srgb, white 90%, var(--accent) 10%), color-mix(in srgb, var(--bg) 95%, #ecfeff 5%))',
              border: '1px solid color-mix(in srgb, var(--accent) 35%, var(--border) 65%)',
              boxShadow: '0 14px 44px rgba(16, 185, 129, 0.14)',
            } : {
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 font-body text-[0.7rem] font-semibold" style={{ background: 'var(--accent)', color: 'white', boxShadow: 'var(--shadow-accent)' }}>
                Most popular
              </span>
            )}
            <h3 className="mb-1 font-display text-[1.5rem]" style={{ color: plan.featured ? 'var(--ink)' : 'var(--ink)' }}>
              {plan.title}
            </h3>
            <div className="mb-4">
              <span className="font-display text-[2.2rem]" style={{ color: plan.featured ? 'var(--ink)' : 'var(--ink)' }}>{plan.price}</span>
              {plan.period && <span className="font-body text-[0.85rem]" style={{ color: plan.featured ? 'var(--muted)' : 'var(--muted)' }}>{plan.period}</span>}
            </div>
            <p className="mb-6 font-body text-[0.88rem] leading-relaxed" style={{ color: plan.featured ? 'var(--muted)' : 'var(--muted)' }}>
              {plan.desc}
            </p>
            <div className="mb-5 h-px" style={{ background: plan.featured ? 'color-mix(in srgb, var(--accent) 26%, var(--border) 74%)' : 'var(--border)' }} />

            <ul className="mb-7 flex flex-1 flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-md"
                    style={{ background: plan.featured ? 'color-mix(in srgb, var(--accent) 20%, transparent)' : 'var(--accent-dim)' }}>
                    <Check className="h-3 w-3" style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="font-body text-[0.88rem] leading-relaxed" style={{ color: plan.featured ? 'var(--ink-2)' : 'var(--ink-2)' }}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/signup')}
              className="w-full rounded-xl py-3 font-body text-[0.88rem] font-semibold transition-all duration-200"
              style={plan.featured ? {
                background: 'var(--accent)',
                color: '#fff',
                boxShadow: 'var(--shadow-accent)',
              } : {
                background: 'transparent',
                border: '1px solid var(--border-strong)',
                color: 'var(--ink)',
              }}
              onMouseEnter={e => {
                if (plan.featured) {
                  e.currentTarget.style.opacity = '0.9';
                } else {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }
              }}
              onMouseLeave={e => {
                if (plan.featured) {
                  e.currentTarget.style.opacity = '1';
                } else {
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                  e.currentTarget.style.color = 'var(--ink)';
                }
              }}
            >
              {plan.btn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
