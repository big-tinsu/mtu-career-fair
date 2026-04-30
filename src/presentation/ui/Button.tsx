'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#226C3D] text-white hover:bg-[#1A5430] shadow-[0_2px_16px_rgba(34,108,61,0.25)] hover:shadow-[0_4px_24px_rgba(34,108,61,0.35)]',
  secondary:
    'bg-[rgba(34,108,61,0.08)] text-[#226C3D] border border-[rgba(34,108,61,0.2)] hover:bg-[rgba(34,108,61,0.15)]',
  outline:
    'border border-[#226C3D] text-[#226C3D] hover:bg-[rgba(34,108,61,0.06)]',
  ghost:
    'text-[#226C3D] hover:bg-[rgba(34,108,61,0.06)]',
  white:
    'bg-white text-[#226C3D] hover:bg-[#F2E4CC] shadow-[0_2px_16px_rgba(0,0,0,0.12)]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-7 py-3.5 text-base gap-2 rounded-xl',
  xl: 'px-9 py-4 text-base gap-2.5 rounded-2xl',
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
      whileHover={{ y: -1 }}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none',
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
      ) : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  );
}
