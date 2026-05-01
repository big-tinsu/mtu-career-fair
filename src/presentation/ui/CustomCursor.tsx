'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const x = useSpring(mouseX, { damping: 24, stiffness: 180, mass: 0.35 });
  const y = useSpring(mouseY, { damping: 24, stiffness: 180, mass: 0.35 });
  const s = useSpring(scale, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const HALF = 22;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - HALF);
      mouseY.set(e.clientY - HALF);
    };

    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, select, textarea, label')) {
        scale.set(2.1);
      }
    };

    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, select, textarea, label')) {
        scale.set(1);
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [mouseX, mouseY, scale]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-11 h-11 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999]"
      style={{ x, y, scale: s }}
    />
  );
}
