import { useState, useEffect, useCallback, Children, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardSwapProps {
  children: ReactNode;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  width?: number;
  height?: number;
}

export function Card({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function CardSwap({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3500,
  pauseOnHover = true,
  width = 300,
  height = 180,
}: CardSwapProps) {
  const cards = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, delay);
    return () => clearInterval(timer);
  }, [paused, delay, cards.length]);

  return (
    <div
      className="relative"
      style={{ width, height: height + verticalDistance }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => {
          const offset = ((i - index + cards.length) % cards.length);
          if (offset > 2) return null;
          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{
                opacity: offset === 0 ? 1 : 0.6 - offset * 0.2,
                scale: 1 - offset * 0.05,
                y: offset * -verticalDistance / 3,
                zIndex: cards.length - offset,
              }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ width, height }}
            >
              {card}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
