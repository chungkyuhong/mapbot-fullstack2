'use client';
import { Bus, TrainFront, Car, Footprints, Zap } from 'lucide-react';
import type { TransitStep } from '@/types';

const modeIcons: Record<string, React.ElementType> = {
  bus: Bus,
  subway: TrainFront,
  taxi: Car,
  drt: Zap,
  walk: Footprints,
};

const modeColors: Record<string, string> = {
  bus: '#5de6d0',
  subway: '#f5c842',
  taxi: '#f5a742',
  drt: '#7c6ef5',
  walk: '#888899',
};

export default function RouteStepTimeline({ steps }: { steps: TransitStep[] }) {
  return (
    <div className="text-xs text-[#888899] flex items-center flex-wrap gap-1">
      {steps.map((s, i) => {
        const Icon = modeIcons[s.mode] || Car;
        const color = modeColors[s.mode] || '#7c6ef5';
        return (
          <span key={i} className="inline-flex items-center gap-1">
            {i > 0 && <span className="text-white/20 mx-0.5">&rarr;</span>}
            {s.from}
            <Icon className="w-3 h-3" style={{ color }} />
            <span style={{ color }}>({s.mode})</span>
          </span>
        );
      })}
    </div>
  );
}
