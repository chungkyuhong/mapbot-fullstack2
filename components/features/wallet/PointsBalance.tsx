'use client';
import { Star } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatPoints } from '@/lib/utils';

interface PointsBalanceProps {
  points: number;
}

export default function PointsBalance({ points }: PointsBalanceProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-[#f5c842]" />
        <span className="font-serif text-xl">MU Point 현황</span>
      </div>
      <div className="text-3xl font-bold text-[#5de6d0] mb-2">{formatPoints(points)}</div>
      <p className="text-xs text-[#888899]">이용 시 최대 30% 할인 적용 가능</p>
    </Card>
  );
}
