import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  threshold?: number;
}

export default function AnimatedContent({
  children,
  distance = 20,
  direction = 'vertical',
  reverse = false,
  duration = 0.5,
  initialOpacity = 0,
  animateOpacity = true,
  threshold = 0.3,
}: AnimatedContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const axis = direction === 'vertical' ? 'y' : 'x';
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      ref={ref}
      initial={{ [axis]: offset, opacity: animateOpacity ? initialOpacity : 1 }}
      animate={isInView ? { [axis]: 0, opacity: 1 } : {}}
      transition={{ duration, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
