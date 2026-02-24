'use client';
import { cn } from '@/lib/utils';

const badgeVariants = {
  default: 'bg-[#7c6ef5]/10 text-[#7c6ef5] border-[#7c6ef5]/20',
  teal: 'bg-[#5de6d0]/10 text-[#5de6d0] border-[#5de6d0]/20',
  gold: 'bg-[#f5c842]/10 text-[#f5c842] border-[#f5c842]/20',
  red: 'bg-[#f55e5e]/10 text-[#f55e5e] border-[#f55e5e]/20',
  green: 'bg-[#5de67a]/10 text-[#5de67a] border-[#5de67a]/20',
  muted: 'bg-white/[0.06] text-[#888899] border-white/[0.07]',
} as const;

interface BadgeProps {
  variant?: keyof typeof badgeVariants;
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-[0.72rem] font-medium',
      badgeVariants[variant],
      className,
    )}>
      {children}
    </span>
  );
}
