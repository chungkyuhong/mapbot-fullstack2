'use client';
import Card from '@/components/ui/Card';
import type { Vehicle } from '@/types';

interface FleetStatsProps {
  vehicles: Vehicle[];
}

export default function FleetStats({ vehicles }: FleetStatsProps) {
  const stats = [
    { label: '대기중', value: vehicles.filter((v) => v.status === 'available').length, color: '#5de67a' },
    { label: '운행중', value: vehicles.filter((v) => v.status === 'busy').length, color: '#f5c842' },
    { label: '오프라인', value: vehicles.filter((v) => v.status === 'offline').length, color: '#888899' },
    { label: '탑승객', value: vehicles.reduce((s, v) => s + v.currentPassengers, 0), color: '#5de6d0' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((s) => (
        <Card key={s.label} variant="compact" className="text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
          <div className="text-xs text-[#888899] uppercase tracking-wide">{s.label}</div>
        </Card>
      ))}
    </div>
  );
}
