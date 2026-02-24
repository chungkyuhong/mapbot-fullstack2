'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  Route, MapPin, Wallet, Sparkles, Car, Zap, TrendingUp,
  ArrowRight, Users, BarChart3, Leaf,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PageContainer from '@/components/layout/PageContainer';
import { useMapBotStore } from '@/lib/store';
import { useRealtimeVehicles } from '@/hooks/useRealtime';

export default function HomePage() {
  useRealtimeVehicles();
  const vehicles = useMapBotStore((s) => s.vehicles);
  const muPoints = useMapBotStore((s) => s.muPoints);

  const quickActions = [
    { label: '경로 검색', icon: Route, href: '/route', color: '#7c6ef5' },
    { label: '실시간 추적', icon: MapPin, href: '/tracking', color: '#5de6d0' },
    { label: 'MU 포인트', icon: Wallet, href: '/wallet', color: '#f5c842' },
    { label: 'LaaS AI', icon: Sparkles, href: '/laas', color: '#5de67a' },
  ];

  const stats = [
    { label: '운행 차량', value: vehicles.length || 128, icon: Car, color: '#7c6ef5' },
    { label: '일 이용건', value: '1,240', icon: TrendingUp, color: '#5de6d0' },
    { label: '연계 도시', value: 12, icon: BarChart3, color: '#f5c842' },
    { label: '만족도', value: '4.9', icon: Users, color: '#5de67a' },
  ];

  return (
    <PageContainer>
      {/* Hero section */}
      <div className="text-center mb-10 pt-4">
        <div className="text-[#7c6ef5] text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          Mobility AI Agent · MaaS · LaaS
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-4">
          당신의 일상을<br />
          <strong className="font-semibold gradient-text">서비스로 누리세요</strong>
        </h1>
        <p className="text-[#888899] text-base max-w-lg mx-auto leading-relaxed mb-8">
          카카오맵 + 실시간 대중교통 + DRT 배차<br />
          이동·숙박·패션·헬스케어·미용·투자까지
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card variant="compact" className="text-center hover:border-[#7c6ef5]/30 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: action.color }} />
                </div>
                <div className="font-medium text-sm">{action.label}</div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="compact" className="text-center">
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
              <div className="font-serif text-2xl font-medium mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-[#888899] uppercase tracking-widest">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* MU Points + Recent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#f5c842]" />
              <span className="font-serif text-lg">MU Point</span>
            </div>
            <Link href="/wallet">
              <Button variant="ghost" size="sm">
                상세보기 <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="text-3xl font-bold text-[#5de6d0] mb-2">{muPoints.toLocaleString()}P</div>
          <p className="text-xs text-[#888899]">이용 시 최대 30% 할인</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-[#7c6ef5]" />
              <span className="font-serif text-lg">차량 현황</span>
            </div>
            <Link href="/tracking">
              <Button variant="ghost" size="sm">
                실시간 보기 <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="text-2xl font-bold text-[#5de67a]">
                {vehicles.filter((v) => v.status === 'available').length}
              </div>
              <div className="text-xs text-[#888899]">대기중</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#f5c842]">
                {vehicles.filter((v) => v.status === 'busy').length}
              </div>
              <div className="text-xs text-[#888899]">운행중</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#5de6d0]">
                <Leaf className="w-5 h-5 inline" /> {vehicles.filter((v) => v.isEV).length}
              </div>
              <div className="text-xs text-[#888899]">친환경</div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
