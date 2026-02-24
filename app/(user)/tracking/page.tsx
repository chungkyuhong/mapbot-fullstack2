'use client';
import dynamic from 'next/dynamic';
import PageContainer from '@/components/layout/PageContainer';
import FleetTable from '@/components/features/fleet/FleetTable';
import FleetStats from '@/components/features/fleet/FleetStats';
import RideStatusCard from '@/components/features/tracking/RideStatusCard';
import { useMapBotStore } from '@/lib/store';
import { useRealtimeVehicles } from '@/hooks/useRealtime';
import { POHANG_CENTER } from '@/lib/constants';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false });

export default function TrackingPage() {
  useRealtimeVehicles();
  const vehicles = useMapBotStore((s) => s.vehicles);
  const dispatchResult = useMapBotStore((s) => s.dispatchResult);

  return (
    <PageContainer title="실시간" subtitle="라이브 차량 지도 + 탑승 현황">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-white/[0.07] mb-5">
            <KakaoMap
              center={POHANG_CENTER}
              vehicles={vehicles}
              mode="fleet"
              className="w-full h-full"
            />
          </div>
          <FleetStats vehicles={vehicles} />
        </div>
        <div className="space-y-5">
          <RideStatusCard dispatch={dispatchResult} />
          <FleetTable vehicles={vehicles} />
        </div>
      </div>
    </PageContainer>
  );
}
