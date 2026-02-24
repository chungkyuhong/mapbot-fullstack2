'use client';
import { CheckCircle2, AlertCircle, CircleOff } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { VehicleStatus } from '@/types';

const statusConfig: Record<VehicleStatus, { label: string; variant: 'green' | 'gold' | 'muted'; icon: React.ElementType }> = {
  available: { label: '대기', variant: 'green', icon: CheckCircle2 },
  busy: { label: '운행', variant: 'gold', icon: AlertCircle },
  offline: { label: '오프', variant: 'muted', icon: CircleOff },
  charging: { label: '충전', variant: 'teal' as 'green', icon: AlertCircle },
};

export default function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  const config = statusConfig[status] ?? statusConfig.offline;
  const Icon = config.icon;
  return (
    <Badge variant={config.variant}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
