'use client';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BottomTabBar from '@/components/layout/BottomTabBar';
import ToastContainer from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { signInAnon } from '@/lib/firebase';
import { useMapBotStore } from '@/lib/store';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const setUserId = useMapBotStore((s) => s.setUserId);
  const { toasts, dismissToast } = useToast();

  useEffect(() => {
    signInAnon().then((user) => setUserId(user.uid)).catch(() => {});
  }, [setUserId]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-[65px] lg:pl-[220px] pb-20 lg:pb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
          {children}
        </div>
      </main>
      <BottomTabBar />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
