'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { USER_TABS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 bg-black/80 backdrop-blur-xl border-b border-white/[0.07]">
      <Link href="/" className="font-serif text-2xl font-semibold gradient-text">
        Map<span className="font-light opacity-70">Bot</span>
      </Link>

      <nav className="hidden md:flex gap-1 items-center">
        {USER_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <Link
              key={tab.id}
              href={tab.path}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all',
                active
                  ? 'bg-[#7c6ef5]/20 text-[#7c6ef5]'
                  : 'text-[#888899] hover:text-[#e8e8f0] hover:bg-white/5',
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </Link>
          );
        })}

        <Link
          href="/admin"
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all ml-1',
            pathname.startsWith('/admin')
              ? 'bg-[#7c6ef5]/20 text-[#7c6ef5]'
              : 'text-[#888899] hover:text-[#e8e8f0] hover:bg-white/5',
          )}
        >
          관리자
        </Link>

        <div className="flex items-center gap-1.5 bg-[#5de67a]/[0.08] border border-[#5de67a]/20 px-3 py-1.5 rounded-full text-[0.72rem] text-[#5de67a] font-semibold ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5de67a] animate-pulse" />
          AI 온라인
        </div>
      </nav>
    </header>
  );
}
