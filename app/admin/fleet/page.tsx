'use client';
import dynamic from 'next/dynamic';
import PageContainer from '@/components/layout/PageContainer';
import FleetTable from '@/components/features/fleet/FleetTable';
import FleetStats from '@/components/features/fleet/FleetStats';
import { useRealtimeVehicles } from '@/hooks/useRealtime';
import { useMapBotStore } from '@/lib/store';
import { POHANG_CENTER } from '@/lib/constants';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false });

export default function AdminFleetPage() {
  useRealtimeVehicles();
  const vehicles = useMapBotStore((s) => s.vehicles);

  return (
    <PageContainer title="차량관리" subtitle="Fleet 모니터링 · 실시간 차량 상태">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <FleetTable vehicles={vehicles} />
        </div>
        <div className="space-y-5">
          <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-white/[0.07]">
            <KakaoMap
              center={POHANG_CENTER}
              vehicles={vehicles}
              mode="fleet"
              className="w-full h-full"
            />
          </div>
          <FleetStats vehicles={vehicles} />
        </div>
      </div>
    </PageContainer>
  );
}
