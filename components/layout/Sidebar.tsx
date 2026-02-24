'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { USER_TABS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex flex-col w-[220px] fixed left-0 top-[65px] bottom-0 bg-[#0d0d14] border-r border-white/[0.07] py-6 px-3 z-40">
      <nav className="flex flex-col gap-1 flex-1">
        {USER_TABS.map((tab) => {
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

      <div className="mt-auto pt-4 border-t border-white/[0.07]">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#888899] hover:text-[#e8e8f0] hover:bg-white/[0.04] transition-all"
        >
          <Settings className="w-4.5 h-4.5" />
          관리자
        </Link>
      </div>
    </aside>
  );
}
