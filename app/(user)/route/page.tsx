'use client';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import RouteSearchForm from '@/components/features/route/RouteSearchForm';
import RouteResultsList from '@/components/features/route/RouteResultsList';
import BookingConfirmModal from '@/components/features/route/BookingConfirmModal';
import { useMapBotStore } from '@/lib/store';
import { useRealtimeVehicles } from '@/hooks/useRealtime';
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/ui/Toast';
import { POHANG_LOCATIONS } from '@/lib/constants';
import type { RouteOption } from '@/types';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false });

export default function RoutePage() {
  useRealtimeVehicles();
  const { vehicles, routeOptions, setRouteOptions, selectedRoute, setSelectedRoute,
    isLoading, setLoading, setError, muPoints, setMuPoints } = useMapBotStore();
  const { toasts, notify, dismissToast } = useToast();

  const [step, setStep] = useState(1);
  const [bookingRoute, setBookingRoute] = useState<RouteOption | null>(null);
  const [originKey, setOriginKey] = useState('pohang_station');
  const [destKey, setDestKey] = useState('pohang_airport');

  const originName = POHANG_LOCATIONS[originKey]?.name ?? '출발지';
  const destName = POHANG_LOCATIONS[destKey]?.name ?? '목적지';

  const handleSearch = useCallback(async (params: {
    originKey: string; destKey: string; purpose: string; priority: string; passengers: number;
  }) => {
    setLoading(true);
    setError(null);
    setOriginKey(params.originKey);
    setDestKey(params.destKey);
    setStep(2);
    try {
      const res = await fetch('/api/transit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originKey: params.originKey,
          destinationKey: params.destKey,
          priority: params.priority,
          passengers: params.passengers,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRouteOptions(json.data);
        setSelectedRoute(json.data[0] ?? null);
        notify(`${json.data.length}개 경로를 찾았습니다!`);
      } else {
        setError(json.error);
        notify(json.error, 'error');
      }
    } catch {
      notify('경로 탐색 오류', 'error');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setRouteOptions, setSelectedRoute, notify]);

  const handleConfirmBooking = (phone: string, notes: string) => {
    if (!bookingRoute) return;
    setBookingRoute(null);
    setStep(3);
    setMuPoints(muPoints + bookingRoute.muPointEarn);
    notify('예약 확정! MU Point 적립 완료');
  };

  const steps = ['여정 입력', 'AI 추천', '예약 확정'];

  return (
    <PageContainer title="이동" subtitle="AI 최적 경로 검색 + DRT 배차 통합">
      {/* Steps indicator */}
      <div className="flex gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 text-center relative text-xs text-[#888899] font-medium">
            {i < 2 && <div className="absolute top-[18px] left-1/2 w-full h-px bg-white/[0.07]" />}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2 relative z-10 border transition-all ${
              step > i + 1 ? 'bg-[#7c6ef5] border-[#7c6ef5] text-white' :
              step === i + 1 ? 'bg-[#7c6ef5]/20 border-[#7c6ef5] text-[#7c6ef5]' :
              'bg-[#111118] border-white/[0.07]'
            }`}>
              {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            {s}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <RouteSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <div>
          <div className="w-full h-96 rounded-2xl overflow-hidden border border-white/[0.07] mb-5">
            <KakaoMap
              center={{ lat: 36.0320, lng: 129.3650 }}
              vehicles={vehicles}
              selectedRoute={selectedRoute}
              mode="route"
              originName={originName}
              destName={destName}
              className="w-full h-full"
            />
          </div>
          <RouteResultsList
            routes={routeOptions}
            selectedRoute={selectedRoute}
            originName={originName}
            destName={destName}
            isLoading={isLoading}
            onSelectRoute={setSelectedRoute}
            onBookRoute={(route) => setBookingRoute(route)}
          />
        </div>
      </div>

      <BookingConfirmModal
        open={!!bookingRoute}
        onClose={() => setBookingRoute(null)}
        onConfirm={handleConfirmBooking}
        route={bookingRoute}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </PageContainer>
  );
}
