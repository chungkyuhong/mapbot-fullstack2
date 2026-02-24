'use client';
import { Shirt, HeartPulse, Sparkles, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

const domains = [
  { key: 'fashion', label: '패션', icon: Shirt },
  { key: 'healthcare', label: '헬스케어', icon: HeartPulse },
  { key: 'beauty', label: '뷰티', icon: Sparkles },
  { key: 'investment', label: '투자', icon: TrendingUp },
] as const;

interface DomainSelectorProps {
  selected: string | null;
  onSelect: (key: string) => void;
}

export default function DomainSelector({ selected, onSelect }: DomainSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {domains.map((d) => {
        const Icon = d.icon;
        return (
          <Button
            key={d.key}
            variant={selected === d.key ? 'accent' : 'ghost'}
            onClick={() => onSelect(d.key)}
            className="justify-center py-3"
          >
            <Icon className="w-4 h-4" />
            {d.label}
          </Button>
        );
      })}
    </div>
  );
}
