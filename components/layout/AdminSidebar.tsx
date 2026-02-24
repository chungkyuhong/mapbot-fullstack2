'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_TABS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') return pathname === '/admin';
    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden md:flex flex-col w-[220px] fixed left-0 top-[65px] bottom-0 bg-[#0d0d14] border-r border-white/[0.07] py-6 px-3 z-40">
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#888899] hover:text-[#e8e8f0] hover:bg-white/[0.04] transition-all mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        사용자 모드
      </Link>

      <div className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#888899] px-4 mb-3">
        관리자
      </div>

      <nav className="flex flex-col gap-1">
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.id}
              href={tab.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-[#7c6ef5]/15 text-[#7c6ef5]'
                  : 'text-[#888899] hover:text-[#e8e8f0] hover:bg-white/[0.04]',
              )}
            >
              <Icon className="w-4.5 h-4.5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
