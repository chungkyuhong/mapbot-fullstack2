'use client';
import { MapPin } from 'lucide-react';
import RouteResultCard from './RouteResultCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import type { RouteOption } from '@/types';

interface RouteResultsListProps {
  routes: RouteOption[];
  selectedRoute: RouteOption | null;
  originName: string;
  destName: string;
  isLoading: boolean;
  onSelectRoute: (route: RouteOption) => void;
  onBookRoute: (route: RouteOption) => void;
}

export default function RouteResultsList({
  routes, selectedRoute, originName, destName, isLoading, onSelectRoute, onBookRoute,
}: RouteResultsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!routes.length) {
    return (
      <EmptyState
        icon={MapPin}
        title="경로를 검색해주세요"
        description="출발지와 목적지를 선택하고 AI 최적 경로 탐색 버튼을 눌러주세요"
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-[#888899] flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        {originName} &rarr; {destName} — AI 추천 경로
      </div>
      {routes.slice(0, 3).map((route, i) => (
        <RouteResultCard
          key={route.id}
          route={route}
          rank={i}
          selected={selectedRoute?.id === route.id}
          onSelect={() => onSelectRoute(route)}
          onBook={() => onBookRoute(route)}
        />
      ))}
    </div>
  );
}
