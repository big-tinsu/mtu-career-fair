'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[#6F00FF] to-[#08BFFF] text-white shadow-[0_0_30px_rgba(111,0,255,0.35)] hover:shadow-[0_0_45px_rgba(111,0,255,0.5)] hover:opacity-90',
  secondary:
    'bg-[rgba(111,0,255,0.15)] text-white border border-[rgba(111,0,255,0.3)] hover:bg-[rgba(111,0,255,0.25)] hover:border-[rgba(111,0,255,0.5)]',
  outline:
    'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
  ghost:
    'text-white/70 hover:text-white hover:bg-white/5',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      disabled={disabled || isLoading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  );
}
