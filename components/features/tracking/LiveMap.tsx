'use client';
import dynamic from 'next/dynamic';
import { POHANG_CENTER } from '@/lib/constants';
import type { Vehicle, RouteOption } from '@/types';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false });

interface LiveMapProps {
  vehicles: Vehicle[];
  selectedRoute?: RouteOption | null;
  mode?: 'route' | 'fleet' | 'heatmap';
  originName?: string;
  destName?: string;
  className?: string;
}

export default function LiveMap({
  vehicles, selectedRoute, mode = 'fleet', originName, destName, className,
}: LiveMapProps) {
  return (
    <div className={`w-full h-96 rounded-2xl overflow-hidden border border-white/[0.07] ${className ?? ''}`}>
      <KakaoMap
        center={POHANG_CENTER}
        vehicles={vehicles}
        selectedRoute={selectedRoute}
        mode={mode}
        originName={originName}
        destName={destName}
        className="w-full h-full"
      />
    </div>
  );
}
