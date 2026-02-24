'use client';
import Header from '@/components/layout/Header';
import AdminSidebar from '@/components/layout/AdminSidebar';
import ToastContainer from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { toasts, dismissToast } = useToast();

  return (
    <>
      <Header />
      <AdminSidebar />
      <main className="pt-[65px] md:pl-[220px] pb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
          {children}
        </div>
      </main>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
