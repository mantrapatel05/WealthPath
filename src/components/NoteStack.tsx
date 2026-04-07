import { useScrollReveal } from '@/hooks/useScrollReveal';

const notes = [
  {
    emoji: '🎯',
    label: 'GOAL TRACKER',
    labelColor: 'var(--accent-deep)',
    body: "You'll hit your house down payment 14 months ahead of schedule.",
    badge: 'On Track',
    badgeColor: 'var(--accent-deep)',
  },
  {
    emoji: '🤖',
    label: 'AI INSIGHT',
    labelColor: 'var(--accent)',
    body: 'BND yield at 5.2% — aligns with your conservative risk profile. Consider adding 5% allocation.',
    badge: 'Live data',
    badgeColor: 'var(--accent-deep)',
    hasPulse: true,
  },
  {
    emoji: '📊',
    label: 'PORTFOLIO ALERT',
    labelColor: '#d97706',
    body: 'Your VOO allocation drifted to 52%. Target is 45%. Time to rebalance.',
    badge: 'Action needed',
    badgeColor: '#d97706',
  },
];

export default function NoteStack() {
  const ref = useScrollReveal();

  return (
    <section className="relative z-10 mx-auto max-w-[1200px] px-6 pt-16 lg:px-8">
      <div ref={ref} className="scroll-reveal text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full py-1 pl-2.5 pr-3.5" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-dim)' }}>
          <span className="font-body text-[0.75rem] font-medium" style={{ color: 'var(--accent-deep)' }}>Real-time AI insights</span>
        </div>
        <h2 className="mx-auto mb-12 font-display text-[1.8rem] italic tracking-tight" style={{ color: 'var(--ink)' }}>
          Your money, always one step ahead.
        </h2>

        {/* Note stack container */}
        <div className="note-container group relative mx-auto flex h-[280px] items-center justify-center">
          {notes.map((note, i) => {
            const transforms = [
              'rotate(-8deg) translateX(-80px) translateY(10px)',
              'rotate(0deg) translateY(0)',
              'rotate(8deg) translateX(80px) translateY(10px)',
            ];
            const zIndexes = [1, 3, 1];

            return (
              <div
                key={i}
                className={`note-card note-card-${i} absolute w-[290px] cursor-default rounded-2xl p-6 text-left`}
                style={{
                  zIndex: zIndexes[i],
                  transform: transforms[i],
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease',
                }}
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="text-base">{note.emoji}</span>
                  <span className="font-body text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: note.labelColor }}>
                    {note.label}
                  </span>
                </div>
                <p className="mb-3 font-display text-[0.95rem] leading-[1.4]" style={{ color: 'var(--ink)' }}>
                  {note.body}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[0.7rem] font-medium"
                  style={{ background: `${note.badgeColor}15`, color: note.badgeColor }}
                >
                  {note.hasPulse && (
                    <span className="block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)', animation: 'pulseDot 2s infinite' }} />
                  )}
                  {note.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .note-container { animation: noteBob 5s ease-in-out infinite; }
        .note-container:hover { animation-play-state: paused; }
        @keyframes noteBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .note-container:hover .note-card-0 { transform: rotate(-12deg) translateX(-130px) translateY(20px) !important; box-shadow: var(--shadow-lg) !important; }
        .note-container:hover .note-card-1 { transform: rotate(0deg) translateY(-10px) !important; box-shadow: var(--shadow-lg) !important; }
        .note-container:hover .note-card-2 { transform: rotate(12deg) translateX(130px) translateY(20px) !important; box-shadow: var(--shadow-lg) !important; }
      `}</style>
    </section>
  );
}
