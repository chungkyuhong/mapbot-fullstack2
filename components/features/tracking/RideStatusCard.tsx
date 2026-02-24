'use client';
import { Car, MapPin, Clock, Users } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import type { DispatchResult } from '@/types';

interface RideStatusCardProps {
  dispatch: DispatchResult | null;
}

export default function RideStatusCard({ dispatch }: RideStatusCardProps) {
  if (!dispatch || dispatch.status !== 'assigned') {
    return (
      <Card>
        <div className="text-center py-8 text-[#888899]">
          <Car className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">현재 진행 중인 탑승이 없습니다</p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="highlighted">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-[#7c6ef5]" />
          <span className="font-serif text-lg">현재 탑승 현황</span>
        </div>
        <Badge variant="green">배차 완료</Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-[#888899]" />
          <span className="text-[#888899]">배정 차량</span>
          <span className="font-semibold ml-auto">{dispatch.assignedVehicle.id}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-[#888899]" />
          <span className="text-[#888899]">예상 도착</span>
          <span className="font-semibold ml-auto">{dispatch.etaMinutes}분 후</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Users className="w-4 h-4 text-[#888899]" />
          <span className="text-[#888899]">차량 유형</span>
          <span className="font-semibold ml-auto">{dispatch.assignedVehicle.type}</span>
        </div>
      </div>

      {dispatch.poolingAvailable && (
        <div className="mt-4 p-3 rounded-lg bg-[#5de6d0]/10 text-[#5de6d0] text-xs font-medium flex items-center gap-2">
          <Users className="w-3.5 h-3.5" />
          합승 가능 — 요금 20% 절감 옵션이 있습니다
        </div>
      )}
    </Card>
  );
}
