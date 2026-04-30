import { cn } from '@/lib/utils';

type BadgeVariant = 'green' | 'cream' | 'gold' | 'blue' | 'red' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-[rgba(34,108,61,0.1)] text-[#226C3D] border border-[rgba(34,108,61,0.2)]',
  cream: 'bg-[#F2E4CC] text-[#5C5046] border border-[#E0D1B5]',
  gold: 'bg-[rgba(180,130,20,0.1)] text-[#8B6914] border border-[rgba(180,130,20,0.2)]',
  blue: 'bg-[rgba(0,75,135,0.08)] text-[#004B87] border border-[rgba(0,75,135,0.15)]',
  red: 'bg-[rgba(220,38,38,0.08)] text-[#B91C1C] border border-[rgba(220,38,38,0.15)]',
  neutral: 'bg-[#F5F0E8] text-[#6B5E4A] border border-[#E0D1B5]',
};

const dotColors: Record<BadgeVariant, string> = {
  green: 'bg-[#226C3D]',
  cream: 'bg-[#9C8E7C]',
  gold: 'bg-[#8B6914]',
  blue: 'bg-[#004B87]',
  red: 'bg-[#B91C1C]',
  neutral: 'bg-[#9C8E7C]',
};

export function Badge({ children, variant = 'neutral', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
