interface BrandLogoProps {
  compact?: boolean;
  iconClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
}

function BrandGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="wp-badge" x1="3" y1="2" x2="25" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#040B16" />
          <stop offset="0.46" stopColor="#0B1F35" />
          <stop offset="1" stopColor="#0E7490" />
        </linearGradient>
        <radialGradient
          id="wp-glow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.5 7.5) rotate(127.241) scale(16.506)"
        >
          <stop stopColor="#67E8F9" stopOpacity="0.96" />
          <stop offset="0.42" stopColor="#22D3EE" stopOpacity="0.2" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wp-ribbon" x1="8" y1="8" x2="19" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="0.54" stopColor="#D9FDF8" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="wp-inner" x1="10.45" y1="10.72" x2="17.2" y2="18.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A7F3D0" />
          <stop offset="1" stopColor="#E0F2FE" />
        </linearGradient>
        <linearGradient id="wp-floor" x1="8.5" y1="19.2" x2="19.5" y2="19.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A5F3FC" stopOpacity="0" />
          <stop offset="0.5" stopColor="#A5F3FC" stopOpacity="0.75" />
          <stop offset="1" stopColor="#A5F3FC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wp-spark" x1="18.1" y1="6.2" x2="20.9" y2="9.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#A5F3FC" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="24" height="24" rx="8" fill="url(#wp-badge)" />
      <rect x="2" y="2" width="24" height="24" rx="8" fill="url(#wp-glow)" />
      <rect x="2.7" y="2.7" width="22.6" height="22.6" rx="7.3" stroke="rgba(255,255,255,0.14)" />
      <path
        d="M8 18.25L9.78 8.24C9.86 7.79 10.42 7.61 10.73 7.96L14 11.65L17.27 7.96C17.58 7.61 18.14 7.79 18.22 8.24L20 18.25H17.93L16.97 12.03L14.58 14.72C14.28 15.06 13.72 15.06 13.42 14.72L11.03 12.03L10.07 18.25H8Z"
        fill="url(#wp-ribbon)"
      />
      <path
        d="M10.45 18.25L11.71 10.72L14 13.14L16.29 10.72L17.55 18.25H15.74L15.08 14.22L14.37 14.96C14.17 15.17 13.83 15.17 13.63 14.96L12.92 14.22L12.26 18.25H10.45Z"
        fill="url(#wp-inner)"
        opacity="0.92"
      />
      <path d="M8.5 19.25H19.5" stroke="url(#wp-floor)" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M19 5.9L19.45 7.02L20.57 7.47L19.45 7.92L19 9.04L18.55 7.92L17.43 7.47L18.55 7.02L19 5.9Z"
        fill="url(#wp-spark)"
      />
    </svg>
  );
}

export default function BrandLogo({
  compact = false,
  iconClassName = 'h-10 w-10 rounded-xl',
  textClassName = 'text-[1rem] font-semibold',
  showTagline = false,
}: BrandLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex items-center justify-center ${iconClassName}`}
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(186,230,253,0.32) 0%, rgba(186,230,253,0) 34%), linear-gradient(135deg, rgba(8,47,73,0.12) 0%, rgba(8,47,73,0.02) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.34), 0 18px 38px rgba(8,47,73,0.18)',
          border: '1px solid rgba(8,47,73,0.1)',
        }}
      >
        <BrandGlyph />
      </div>
      {!compact && (
        <div className="flex flex-col">
          <div className="flex items-end gap-[2px] leading-none">
            <span
              className={`font-body tracking-tight ${textClassName}`}
              style={{ color: 'var(--ink)', letterSpacing: '-0.05em' }}
            >
              Wealth
            </span>
            <span
              className={`font-body tracking-tight ${textClassName}`}
              style={{
                letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg, #0F172A 0%, #0E7490 55%, #14B8A6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Path
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className="h-px w-5 rounded-full"
              style={{ background: 'linear-gradient(90deg, rgba(20,184,166,0) 0%, rgba(20,184,166,0.9) 100%)' }}
            />
            <span className="h-1 w-1 rounded-full" style={{ background: 'var(--accent)' }} />
            {showTagline && (
              <span
                className="font-body text-[0.56rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--muted-2)' }}
              >
                Adaptive finance
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
