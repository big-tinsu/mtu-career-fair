'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';

export const REGISTER_URL = 'https://luma.com/j281yy78';

interface RegisterButtonProps {
  label?: string;
  showArrow?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function RegisterButton({
  label = 'Register Free',
  showArrow = true,
  className,
  size = 'md',
}: RegisterButtonProps) {
  return (
    <motion.a
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center gap-2.5 w-fit rounded-full border-2 border-[#1A1A1A] bg-[#226C3D] font-bold uppercase tracking-[0.2em] text-[#F2E4CC] shadow-[0_4px_0_#1A1A1A] transition-transform hover:-translate-y-0.5',
        sizeStyles[size],
        className,
      )}
    >
      {label}
      {showArrow && <FiArrowRight size={14} />}
    </motion.a>
  );
}
