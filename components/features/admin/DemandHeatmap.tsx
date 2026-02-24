'use client';
import dynamic from 'next/dynamic';
import { Map } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { POHANG_CENTER } from '@/lib/constants';
import type { HeatmapPoint } from '@/types';

const KakaoMap = dynamic(() => import('@/components/KakaoMap'), { ssr: false });

interface DemandHeatmapProps {
  heatmapData: HeatmapPoint[];
}

export default function DemandHeatmap({ heatmapData }: DemandHeatmapProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 font-serif text-xl mb-4">
        <Map className="w-5 h-5 text-[#7c6ef5]" />
        수요 히트맵
        <span className="font-sans text-xs text-[#888899] font-normal ml-1">포항시 기준</span>
      </div>
      <div className="w-full h-80 rounded-xl overflow-hidden border border-white/[0.07]">
        <KakaoMap
          center={POHANG_CENTER}
          heatmapPoints={heatmapData}
          mode="heatmap"
          level={8}
          className="w-full h-full"
        />
      </div>
      <div className="flex gap-3 mt-3">
        <Badge variant="red">고수요</Badge>
        <Badge variant="gold">중수요</Badge>
        <Badge variant="teal">저수요</Badge>
      </div>
    </Card>
  );
}
