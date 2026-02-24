'use client';
import PageContainer from '@/components/layout/PageContainer';
import KPIGrid from '@/components/features/admin/KPIGrid';
import DemandHeatmap from '@/components/features/admin/DemandHeatmap';
import PolicyComplianceList from '@/components/features/admin/PolicyComplianceList';
import { useRealtimeHeatmap } from '@/hooks/useRealtime';
import { useMapBotStore } from '@/lib/store';

export default function AdminDashboardPage() {
  useRealtimeHeatmap();
  const heatmapData = useMapBotStore((s) => s.heatmapData);

  return (
    <PageContainer title="관리자 대시보드" subtitle="KPI · 수요 히트맵 · 정책 관리">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DemandHeatmap heatmapData={heatmapData} />
        <div className="space-y-5">
          <KPIGrid />
          <PolicyComplianceList />
        </div>
      </div>
    </PageContainer>
  );
}
