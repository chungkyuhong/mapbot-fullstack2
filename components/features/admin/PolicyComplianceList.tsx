'use client';
import { ShieldCheck, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const complianceData = [
  { type: '승인완료', user: '김○○ 팀장', route: '포항→서울', cost: '₩182,000', status: 'ok' as const },
  { type: '정책위반', user: '이○○ 대리', route: '서울→제주', cost: '₩320,000', status: 'warn' as const, note: '항공권 한도 초과' },
  { type: '승인대기', user: '박○○ 과장', route: '포항→부산', cost: '₩95,000', status: 'pending' as const },
];

const statusConfig = {
  ok: { label: '승인', variant: 'green' as const, icon: CheckCircle2 },
  warn: { label: '위반', variant: 'red' as const, icon: AlertTriangle },
  pending: { label: '대기', variant: 'muted' as const, icon: Clock },
};

export default function PolicyComplianceList() {
  return (
    <Card>
      <div className="flex items-center gap-2 font-serif text-xl mb-4">
        <ShieldCheck className="w-5 h-5 text-[#7c6ef5]" />
        기업 정책 준수 현황
      </div>
      <div className="space-y-2">
        {complianceData.map((c, i) => {
          const config = statusConfig[c.status];
          const Icon = config.icon;
          return (
            <div key={i} className="flex justify-between items-start py-3 border-b border-white/[0.05] last:border-0 text-sm">
              <div>
                <Badge variant={config.variant}>
                  <Icon className="w-3 h-3" />
                  {config.label}
                </Badge>
                <span className="ml-2 text-[#888899]">{c.user} · {c.route}</span>
                {c.note && (
                  <div className="text-xs text-[#f55e5e] mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {c.note}
                  </div>
                )}
              </div>
              <span className="font-semibold">{c.cost}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
