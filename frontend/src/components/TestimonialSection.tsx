import { useScrollReveal } from '@/hooks/useScrollReveal';
import CountUp from '@/components/ui/CountUp';

export default function TestimonialSection() {
  const ref = useScrollReveal();

  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8" style={{ background: 'var(--bg-secondary)' }}>
      <div ref={ref} className="scroll-reveal relative z-10 mx-auto max-w-[1120px]">
        <div className="text-center">
          <p className="mb-5 font-display text-[3rem] leading-none" style={{ color: 'var(--accent)', opacity: 0.34 }}>
            "
          </p>

          <blockquote className="mx-auto mb-5 max-w-[760px] font-display text-[clamp(1.9rem,3.3vw,3.2rem)] font-normal italic leading-[1.16] tracking-tight" style={{ color: 'var(--ink)' }}>
            WealthPath is my all-in-one financial advisor.
          </blockquote>

          <p className="mb-10 font-body text-[0.92rem] font-medium" style={{ color: 'var(--muted)' }}>
            Beta user, March 2026
          </p>
        </div>

        <div className="mx-auto max-w-[920px] border-y py-8 md:py-9" style={{ borderColor: 'color-mix(in srgb, var(--border) 80%, var(--accent) 20%)' }}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            <div className="text-center md:px-8">
              <p className="font-display text-[2.2rem] leading-none" style={{ color: 'var(--ink)' }}>
                <CountUp from={0} to={2400} separator="," duration={1.5} className="font-display" style={{ color: 'var(--ink)' }} />
                <span style={{ color: 'var(--accent)' }}>+</span>
              </p>
              <p className="mt-2 font-body text-[0.84rem]" style={{ color: 'var(--muted)' }}>Plans generated</p>
            </div>

            <div className="relative text-center md:px-8">
              <div className="hidden md:block absolute left-0 top-1/2 h-14 w-px -translate-y-1/2" style={{ background: 'var(--border)' }} />
              <p className="font-display text-[2.2rem] leading-none" style={{ color: 'var(--accent)' }}>
                $0
              </p>
              <p className="mt-2 font-body text-[0.84rem]" style={{ color: 'var(--muted)' }}>Account fees</p>
            </div>

            <div className="relative text-center md:px-8">
              <div className="hidden md:block absolute left-0 top-1/2 h-14 w-px -translate-y-1/2" style={{ background: 'var(--border)' }} />
              <p className="font-display text-[2.2rem] leading-none" style={{ color: 'var(--accent)' }}>Live</p>
              <p className="mt-2 font-body text-[0.84rem]" style={{ color: 'var(--muted)' }}>Market data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
