'use client';
import PageContainer from '@/components/layout/PageContainer';
import PolicyComplianceList from '@/components/features/admin/PolicyComplianceList';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

const policyRules = [
  { label: '일일 교통비 한도', value: '₩150,000', status: 'active' },
  { label: '숙박비 한도 (1박)', value: '₩120,000', status: 'active' },
  { label: '항공권 승인 기준', value: '₩300,000 초과 시', status: 'active' },
  { label: '식비 수당', value: '₩30,000/일', status: 'active' },
  { label: '사전승인 필요', value: '₩200,000 초과', status: 'active' },
];

export default function AdminPolicyPage() {
  return (
    <PageContainer title="정책관리" subtitle="법인 정책 · 위반 로그 · 승인 체계">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-2 font-serif text-xl mb-4">
              <FileText className="w-5 h-5 text-[#7c6ef5]" />
              법인 정책 규칙
            </div>
            <div className="space-y-2">
              {policyRules.map((rule) => (
                <div key={rule.label} className="flex justify-between items-center py-3 border-b border-white/[0.05] last:border-0 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5de67a]" />
                    <span>{rule.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{rule.value}</span>
                    <Badge variant="green">활성</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 font-serif text-xl mb-4">
              <AlertTriangle className="w-5 h-5 text-[#f55e5e]" />
              최근 위반 사항
            </div>
            <div className="text-sm text-[#888899] space-y-3">
              <div className="flex justify-between py-2 border-b border-white/[0.05]">
                <span>이○○ 대리 — 항공권 한도 초과</span>
                <Badge variant="red">처리중</Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.05]">
                <span>최○○ 사원 — 사전승인 미이행</span>
                <Badge variant="gold">검토중</Badge>
              </div>
            </div>
          </Card>
        </div>

        <PolicyComplianceList />
      </div>
    </PageContainer>
  );
}
