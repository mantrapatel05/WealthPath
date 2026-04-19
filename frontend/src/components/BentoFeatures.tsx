import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import AnimatedContent from '@/components/ui/AnimatedContent';

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="mb-4 inline-block rounded-md px-2.5 py-1 font-body text-[0.68rem] font-semibold uppercase tracking-wider"
      style={{ background: `${color}15`, color }}
    >
      {label}
    </span>
  );
}

function useInViewAnimate(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedBars() {
  const { ref, visible } = useInViewAnimate();
  const bars = [
    { label: 'US Stocks', pct: 45, color: 'var(--accent)' },
    { label: 'Bonds', pct: 20, color: '#6366f1' },
    { label: 'International', pct: 20, color: '#f59e0b' },
    { label: 'Cash', pct: 15, color: 'var(--muted-2)' },
  ];
  return (
    <div ref={ref} className="mt-5 flex flex-col gap-2.5">
      {bars.map((b, i) => (
        <div key={b.label} className="grid grid-cols-[90px_1fr_40px] items-center gap-2">
          <span className="font-body text-[0.75rem]" style={{ color: 'var(--muted)' }}>{b.label}</span>
          <div className="h-1.5 w-full rounded-full" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full" style={{ width: visible ? `${b.pct}%` : '0%', background: b.color, transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${i * 0.15}s` }} />
          </div>
          <span className="text-right font-body text-[0.75rem] font-semibold" style={{ color: 'var(--ink)' }}>{b.pct}%</span>
        </div>
      ))}
    </div>
  );
}

function DebtChart() {
  const { ref, visible } = useInViewAnimate();
  return (
    <div ref={ref} className="mt-5">
      <svg viewBox="0 0 340 90" className="w-full" style={{ height: 90 }}>
        <line x1="0" y1="80" x2="340" y2="80" stroke="var(--border)" strokeWidth="1" />
        <line x1="0" y1="55" x2="340" y2="55" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="0" y1="30" x2="340" y2="30" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
        <path d="M10 75 Q60 68 100 55 Q150 40 200 28 Q250 16 310 8" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
          style={{ strokeDasharray: 350, strokeDashoffset: visible ? 0 : 350, transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }} />
        <path d="M10 75 Q70 70 110 62 Q160 52 220 38 Q270 24 310 14" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3"
          style={{ strokeDasharray: 350, strokeDashoffset: visible ? 0 : 350, transition: 'stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.2s' }} />
      </svg>
      <div className="mt-2.5 flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
          <span className="font-body text-[0.72rem] font-medium" style={{ color: 'var(--muted)' }}>Avalanche</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded" style={{ background: '#f59e0b' }} />
          <span className="font-body text-[0.72rem] font-medium" style={{ color: 'var(--muted)' }}>Snowball</span>
        </div>
      </div>
    </div>
  );
}

function ChatUI() {
  return (
    <div className="mt-4 flex flex-col gap-2 rounded-xl p-3.5" style={{ background: 'var(--bg-secondary)' }}>
      <div className="self-end rounded-xl rounded-tr-sm px-3 py-2 font-body text-[0.78rem] text-white" style={{ background: 'var(--ink)' }}>
        How much can I save monthly?
      </div>
      <div className="self-start overflow-hidden whitespace-nowrap rounded-xl rounded-tl-sm px-3 py-2 font-body text-[0.78rem]"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--ink)', animation: 'typewriter 2s steps(30) 1s forwards, blink 0.7s step-end infinite', borderRight: '2px solid var(--accent)', width: 0 }}>
        Based on your profile, ~$420/mo
      </div>
      <div className="self-end rounded-xl rounded-tr-sm px-3 py-2 font-body text-[0.78rem] text-white" style={{ background: 'var(--ink)' }}>
        What if I invest $200 more?
      </div>
      <div className="flex items-center gap-1.5 self-start">
        {[0, 0.15, 0.3].map((d) => (
          <span key={d} className="block h-1 w-1 rounded-full" style={{ background: 'var(--accent)', animation: `typingBounce 0.8s infinite ${d}s` }} />
        ))}
        <span className="ml-1 font-body text-[0.6rem]" style={{ color: 'var(--muted)' }}>AI thinking...</span>
      </div>
    </div>
  );
}

function NewsFeed() {
  const { ref, visible } = useInViewAnimate();
  const items = [
    { color: 'var(--accent)', text: 'Fed holds rates steady amid easing', badge: 'Positive', badgeColor: '#059669' },
    { color: '#ef4444', text: 'Tech earnings disappoint Q2 estimates', badge: 'Negative', badgeColor: '#dc2626' },
    { color: '#f59e0b', text: 'Bond yields fluctuate on mixed signals', badge: 'Neutral', badgeColor: '#d97706' },
  ];
  return (
    <div ref={ref} className="mt-4 flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
          style={{ background: 'var(--bg-secondary)', borderLeft: `2px solid ${item.color}`, opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-16px)', transition: `opacity 0.4s ease-out ${0.1 + i * 0.15}s, transform 0.4s ease-out ${0.1 + i * 0.15}s` }}>
          <span className="flex-1 font-body text-[0.8rem] font-medium leading-[1.4]" style={{ color: 'var(--ink)' }}>{item.text}</span>
          <span className="whitespace-nowrap font-body text-[0.68rem] font-semibold" style={{ color: item.badgeColor }}>{item.badge}</span>
        </div>
      ))}
    </div>
  );
}

export default function BentoFeatures() {
  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-8">
      {/* Header */}
      <div className="mb-14 grid items-end gap-6 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full py-1 pl-2.5 pr-3.5" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-dim)' }}>
            <span className="font-body text-[0.75rem] font-medium" style={{ color: 'var(--accent-deep)' }}>Built Different</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] font-normal leading-[1.1] tracking-tight" style={{ color: 'var(--ink)' }}>
            Every tool your money <em className="italic" style={{ color: 'var(--accent)' }}>deserves.</em>
          </h2>
        </div>
        <p className="max-w-[400px] font-body text-[0.9rem] leading-relaxed md:ml-auto" style={{ color: 'var(--muted)' }}>
          Not another budgeting app. A RAG-powered financial brain that fetches live data before every single recommendation.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { chip: { label: 'AI PORTFOLIO', color: '#059669' }, title: 'Globally diversified, built for you', desc: 'RAG pipeline pulls live ETF & bond data from Yahoo Finance to build a risk-adjusted portfolio matched precisely to your profile.', content: <AnimatedBars /> },
          { chip: { label: 'DEBT PLANNER', color: '#d97706' }, title: 'Avalanche or snowball — you choose', desc: 'Visual payoff timeline shows exactly when you\'ll be debt-free under either strategy, with full interest savings calculated.', content: <DebtChart /> },
          { chip: { label: 'AI ADVISOR', color: '#7c3aed' }, title: 'Ask anything about your money', desc: 'Powered by Gemini 2.0 Flash with your full financial profile as context. Chat like you\'re talking to a real CFO.', content: <ChatUI /> },
          { chip: { label: 'LIVE NEWS', color: '#dc2626' }, title: 'Market pulse tied to your holdings', desc: 'News filtered to your portfolio instruments with AI sentiment scoring on how each story actually affects your plan.', content: <NewsFeed /> },
        ].map((card, idx) => (
          <SpotlightCard
            key={idx}
            className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
            spotlightColor="rgba(16, 185, 129, 0.06)"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <Chip label={card.chip.label} color={card.chip.color} />
            <AnimatedContent distance={20} direction="vertical" duration={0.5} initialOpacity={0} animateOpacity threshold={0.3}>
              <h3 className="mb-2 font-display text-[1.3rem]" style={{ color: 'var(--ink)' }}>{card.title}</h3>
            </AnimatedContent>
            <p className="font-body text-[0.88rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {card.desc}
            </p>
            {card.content}
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
