'use client';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export default function PageContainer({ title, subtitle, className, children }: PageContainerProps) {
  return (
    <div className={cn('animate-fade-in', className)}>
      {title && (
        <div className="mb-6">
          <h1 className="font-serif text-2xl md:text-3xl font-medium">{title}</h1>
          {subtitle && <p className="text-sm text-[#888899] mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
