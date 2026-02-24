'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { USER_TABS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/[0.07] px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16">
        {USER_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.id}
              href={tab.path}
              className={cn(
                'flex flex-col items-center gap-1 py-1.5 px-3 rounded-lg transition-all min-w-[56px]',
                active ? 'text-[#7c6ef5]' : 'text-[#888899]',
              )}
            >
              <Icon className={cn('w-5 h-5', active && 'text-[#7c6ef5]')} />
              <span className="text-[0.65rem] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
