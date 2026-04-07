import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  className?: string;
  style?: React.CSSProperties;
}

export default function BlurText({ text, delay = 80, animateBy = 'words', direction = 'top', className = '', style }: BlurTextProps) {
  const units = animateBy === 'words' ? text.split(' ') : text.split('');
  const yFrom = direction === 'top' ? -20 : 20;

  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: animateBy === 'words' ? '0.3em' : 0, ...style }}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: yFrom }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.5, delay: i * (delay / 1000), ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {unit}
        </motion.span>
      ))}
    </span>
  );
}
