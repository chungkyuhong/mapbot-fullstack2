'use client';
import { Clock, Coins, Leaf, Smile, ArrowLeftRight, Trophy } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import RouteStepTimeline from './RouteStepTimeline';
import { formatCurrency, formatPoints } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { RouteOption } from '@/types';

interface RouteResultCardProps {
  route: RouteOption;
  rank: number;
  selected: boolean;
  onSelect: () => void;
  onBook: () => void;
}

export default function RouteResultCard({ route, rank, selected, onSelect, onBook }: RouteResultCardProps) {
  const rankVariant = rank === 0 ? 'gold' : rank === 1 ? 'teal' : 'default';

  return (
    <div
      className={cn(
        'bg-white/[0.03] border rounded-xl p-5 hover:border-[#7c6ef5]/30 transition-colors cursor-pointer',
        rank === 0 ? 'border-[#7c6ef5]/40 bg-[#7c6ef5]/[0.06]' : 'border-white/[0.07]',
        selected && 'border-[#7c6ef5]/60',
      )}
      onClick={onSelect}
    >
      <Badge variant={rankVariant} className="mb-2.5">
        {rank === 0 && <Trophy className="w-3 h-3" />}
        {rank === 0 ? 'AI 추천' : `${rank + 1}순위`}
      </Badge>

      <div className="font-semibold mb-1.5">{route.label}</div>

      <div className="flex gap-4 text-xs text-[#888899] flex-wrap mb-3">
        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{route.totalDurationMinutes}분</span>
        <span className="inline-flex items-center gap-1"><Coins className="w-3 h-3" />{formatCurrency(route.totalCost)}</span>
        <span className="inline-flex items-center gap-1"><Leaf className="w-3 h-3" />친환경 {route.ecoScore}%</span>
        <span className="inline-flex items-center gap-1"><Smile className="w-3 h-3" />편의 {route.comfortScore}%</span>
        <span className="inline-flex items-center gap-1"><ArrowLeftRight className="w-3 h-3" />환승 {route.transferCount}회</span>
      </div>

      <div className="mb-3">
        <RouteStepTimeline steps={route.steps} />
      </div>

      <div className="flex gap-2 items-center">
        <Button size="sm" onClick={(e) => { e.stopPropagation(); onBook(); }}>예약</Button>
        <span className="text-xs text-[#5de6d0] flex items-center gap-1">
          +{formatPoints(route.muPointEarn)} 적립
        </span>
      </div>
    </div>
  );
}
