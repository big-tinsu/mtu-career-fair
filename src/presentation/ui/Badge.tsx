import { cn } from '@/lib/utils';

type BadgeVariant = 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  purple: 'bg-[rgba(111,0,255,0.15)] text-[#C192FF] border border-[rgba(111,0,255,0.3)]',
  blue: 'bg-[rgba(8,191,255,0.1)] text-[#08BFFF] border border-[rgba(8,191,255,0.25)]',
  green: 'bg-[rgba(20,174,92,0.12)] text-[#4ADE80] border border-[rgba(20,174,92,0.25)]',
  yellow: 'bg-[rgba(245,153,41,0.12)] text-[#FCD34D] border border-[rgba(245,153,41,0.25)]',
  red: 'bg-[rgba(255,29,69,0.12)] text-[#F87171] border border-[rgba(255,29,69,0.25)]',
  neutral: 'bg-white/5 text-white/60 border border-white/10',
};

const dotColors: Record<BadgeVariant, string> = {
  purple: 'bg-[#C192FF]',
  blue: 'bg-[#08BFFF]',
  green: 'bg-[#4ADE80]',
  yellow: 'bg-[#FCD34D]',
  red: 'bg-[#F87171]',
  neutral: 'bg-white/40',
};

export function Badge({ children, variant = 'neutral', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
