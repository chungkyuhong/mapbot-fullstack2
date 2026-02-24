'use client';
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { TRANSPORT_MODES, PRICING_TIERS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { calculateDynamicPrice } from '@/lib/dispatch-engine';

interface PricingCalculatorProps {
  muPoints: number;
  onMuPointsChange: (points: number) => void;
}

export default function PricingCalculator({ muPoints, onMuPointsChange }: PricingCalculatorProps) {
  const [distance, setDistance] = useState(15);
  const [mode, setMode] = useState('drt');
  const [tier, setTier] = useState('normal');

  const priceData = calculateDynamicPrice({
    distanceKm: distance, mode, pricingTier: tier, muPoints, passengerCount: 1,
  });

  const breakdownItems = [
    { label: '기본 요금', value: formatCurrency(priceData.subtotal), color: '#e8e8f0' },
    { label: 'Point 할인', value: `-${formatCurrency(priceData.muPointDiscount)}`, color: '#5de67a' },
    { label: '최종 결제', value: formatCurrency(priceData.finalFare), color: '#7c6ef5' },
    { label: '적립 Point', value: `+${priceData.muPointEarn}P`, color: '#5de6d0' },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2 font-serif text-xl mb-5">
        <Calculator className="w-5 h-5 text-[#7c6ef5]" />
        동적 요금 계산
        <span className="font-sans text-xs text-[#888899] font-normal ml-1">MU Point 적용</span>
      </div>

      <div className="space-y-4 mb-5">
        <Input
          label="이동 거리 (km)"
          type="number"
          value={distance}
          onChange={(e) => setDistance(parseFloat(e.target.value) || 15)}
          min={1}
          max={500}
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="이동 수단"
            options={TRANSPORT_MODES as unknown as { value: string; label: string }[]}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          />
          <Select
            label="시간대"
            options={PRICING_TIERS as unknown as { value: string; label: string }[]}
            value={tier}
            onChange={(e) => setTier(e.target.value)}
          />
        </div>
        <Input
          label="보유 MU Point"
          type="number"
          value={muPoints}
          onChange={(e) => onMuPointsChange(parseInt(e.target.value) || 0)}
          min={0}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {breakdownItems.map((item) => (
          <div key={item.label} className="bg-[#16161f] border border-white/[0.07] rounded-xl p-4 text-center">
            <div className="text-xl font-bold mb-1" style={{ color: item.color }}>{item.value}</div>
            <div className="text-xs text-[#888899] uppercase tracking-wide">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
