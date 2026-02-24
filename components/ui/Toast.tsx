'use client';
import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'border-[#5de67a]/30 text-[#5de67a]',
  error: 'border-[#f55e5e]/30 text-[#f55e5e]',
  info: 'border-[#7c6ef5]/30 text-[#7c6ef5]',
};

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const Icon = icons[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={cn(
      'glass rounded-xl px-5 py-4 text-sm font-medium max-w-xs shadow-2xl animate-slide-up border flex items-start gap-3',
      colors[toast.type],
    )}>
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span className="text-[#e8e8f0] flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-[#888899] hover:text-[#e8e8f0] flex-shrink-0">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 space-y-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
