import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
}

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(22, 184, 94, 0.08)', style }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
