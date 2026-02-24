'use client';
import { Car } from 'lucide-react';
import Card from '@/components/ui/Card';
import VehicleStatusBadge from './VehicleStatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { SkeletonTable } from '@/components/ui/Skeleton';
import type { Vehicle } from '@/types';

interface FleetTableProps {
  vehicles: Vehicle[];
  loading?: boolean;
}

export default function FleetTable({ vehicles, loading }: FleetTableProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 font-serif text-xl mb-5">
        <Car className="w-5 h-5 text-[#7c6ef5]" />
        실시간 Fleet 현황
        <span className="font-sans text-xs text-[#5de67a] font-normal ml-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5de67a] animate-pulse inline-block" />
          실시간 SSE
        </span>
      </div>

      {loading ? (
        <SkeletonTable rows={5} />
      ) : !vehicles.length ? (
        <EmptyState icon={Car} title="차량 데이터 로딩 중..." description="실시간 SSE 연결을 대기합니다" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {['차량ID', '유형', '위치', '상태', 'ETA', '승객'].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#888899]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-bold">{v.id}</td>
                  <td className="py-3 px-3 text-[#888899]">{v.type}</td>
                  <td className="py-3 px-3 text-[#888899]">{v.locationName}</td>
                  <td className="py-3 px-3"><VehicleStatusBadge status={v.status} /></td>
                  <td className="py-3 px-3">{v.etaMinutes > 0 ? `${v.etaMinutes}분` : '즉시'}</td>
                  <td className="py-3 px-3">{v.currentPassengers}명</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
