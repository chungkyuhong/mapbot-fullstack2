'use client';
import { LucideIcon, Inbox } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-[#888899]" />
      </div>
      <h3 className="font-serif text-lg text-[#e8e8f0] mb-2">{title}</h3>
      {description && <p className="text-sm text-[#888899] max-w-xs mb-5">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="ghost" size="sm" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
