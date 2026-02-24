'use client';
import { useState, useCallback } from 'react';
import { generateId } from '@/lib/utils';
import type { ToastData } from '@/components/ui/Toast';

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: ToastData['type'] = 'success') => {
    const id = generateId('toast');
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback((message: string, type: ToastData['type'] = 'success') => {
    addToast(message, type);
  }, [addToast]);

  return { toasts, addToast, dismissToast, notify };
}
