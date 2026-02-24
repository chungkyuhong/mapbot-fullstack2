'use client';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle';
}

export default function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const base = 'animate-pulse bg-white/[0.06] rounded';
  const variants = {
    text: 'h-4 w-full rounded-md',
    card: 'h-32 w-full rounded-2xl',
    circle: 'h-10 w-10 rounded-full',
  };
  return <div className={cn(base, variants[variant], className)} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-[#16161f] border border-white/[0.07] rounded-2xl p-7 space-y-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-full rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}
