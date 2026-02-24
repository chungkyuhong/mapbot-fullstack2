'use client';
import { BarChart3 } from 'lucide-react';
import Card from '@/components/ui/Card';

const kpiData = [
  { label: '평균 대기', value: '3.2분', trend: '↓', color: '#5de67a' },
  { label: '가동률', value: '78%', trend: '↑', color: '#f5c842' },
  { label: '일 이동건', value: '1,240', trend: '↑', color: '#7c6ef5' },
  { label: 'CO₂ 절감', value: '4.2톤', trend: '↑', color: '#5de6d0' },
  { label: '만족도', value: '4.88', trend: '→', color: '#f5c842' },
  { label: '평균 요금', value: '₩16,400', trend: '↑', color: '#e8e8f0' },
];

export default function KPIGrid() {
  return (
    <Card>
      <div className="flex items-center gap-2 font-serif text-xl mb-4">
        <BarChart3 className="w-5 h-5 text-[#7c6ef5]" />
        운영 지표
      </div>
      <div className="grid grid-cols-2 gap-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} variant="compact">
            <div className="text-xs text-[#888899] uppercase tracking-wide mb-1.5">{kpi.label}</div>
            <div className="text-xl font-bold" style={{ color: kpi.color }}>
              {kpi.value} <span className="text-sm">{kpi.trend}</span>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
