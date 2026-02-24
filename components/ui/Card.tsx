'use client';
import { cn } from '@/lib/utils';

const cardVariants = {
  default: 'bg-[#16161f] border border-white/[0.07] rounded-2xl p-7',
  highlighted: 'bg-[#16161f] border border-[#7c6ef5]/30 rounded-2xl p-7 bg-gradient-to-br from-[#7c6ef5]/[0.06] to-transparent',
  compact: 'bg-[#16161f] border border-white/[0.07] rounded-xl p-4',
} as const;

interface CardProps {
  variant?: keyof typeof cardVariants;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Card({ variant = 'default', className, children, onClick }: CardProps) {
  return (
    <div
      className={cn(cardVariants[variant], onClick && 'cursor-pointer hover:border-[#7c6ef5]/30 transition-colors', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
