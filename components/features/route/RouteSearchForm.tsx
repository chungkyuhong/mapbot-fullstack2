'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { POHANG_LOCATIONS, TRIP_PURPOSES, ROUTE_PRIORITIES } from '@/lib/constants';
import { validatePassengers, validateDifferentLocations, validateAll } from '@/lib/validators';
import { useFormValidation } from '@/hooks/useFormValidation';

const locationOptions = Object.entries(POHANG_LOCATIONS).map(([k, v]) => ({ value: k, label: v.name }));

interface RouteSearchFormProps {
  onSearch: (params: {
    originKey: string;
    destKey: string;
    purpose: string;
    priority: string;
    passengers: number;
  }) => void;
  isLoading: boolean;
}

export default function RouteSearchForm({ onSearch, isLoading }: RouteSearchFormProps) {
  const [originKey, setOriginKey] = useState('pohang_station');
  const [destKey, setDestKey] = useState('pohang_airport');
  const [purpose, setPurpose] = useState('business');
  const [priority, setPriority] = useState('fastest');
  const [passengers, setPassengers] = useState(1);
  const { errors, validateAll: runValidation } = useFormValidation();

  const handleSearch = () => {
    const valid = runValidation({
      locations: () => validateDifferentLocations(originKey, destKey),
      passengers: () => validatePassengers(passengers),
    });
    if (!valid) return;
    onSearch({ originKey, destKey, purpose, priority, passengers });
  };

  return (
    <Card>
      <div className="font-serif text-xl mb-5 flex items-center gap-2">
        <Search className="w-5 h-5 text-[#7c6ef5]" />
        이동 여정 검색
        <span className="font-sans text-xs text-[#888899] font-normal ml-1">카카오맵 · ODsay 연동</span>
      </div>

      <div className="space-y-4">
        <Select
          label="출발지"
          options={locationOptions}
          value={originKey}
          onChange={(e) => setOriginKey(e.target.value)}
          error={errors.locations}
        />
        <Select
          label="목적지"
          options={locationOptions}
          value={destKey}
          onChange={(e) => setDestKey(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="이동 목적"
            options={TRIP_PURPOSES as unknown as { value: string; label: string }[]}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <Select
            label="우선 순위"
            options={ROUTE_PRIORITIES as unknown as { value: string; label: string }[]}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <Input
          label="탑승 인원"
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
          min={1}
          max={8}
          error={errors.passengers}
        />
        <Button fullWidth loading={isLoading} onClick={handleSearch}>
          <Search className="w-4 h-4" />
          AI 최적 경로 탐색
        </Button>
      </div>
    </Card>
  );
}
