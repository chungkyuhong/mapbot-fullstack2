'use client';
import { Pin, Calendar, AlertTriangle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { Bot } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { LaasPlan } from '@/types';

interface PlanResultCardProps {
  plan: LaasPlan | null;
  userAge?: string;
  userBudget?: number;
}

export default function PlanResultCard({ plan, userAge, userBudget }: PlanResultCardProps) {
  if (!plan) {
    return (
      <Card className="h-full flex items-center justify-center">
        <EmptyState
          icon={Bot}
          title="AI 플랜을 생성해보세요"
          description="도메인을 선택하고 정보를 입력하면 AI가 나만의 플랜을 제안합니다"
        />
      </Card>
    );
  }

  return (
    <div className="p-6 rounded-2xl border border-[#7c6ef5]/20 bg-gradient-to-br from-[#7c6ef5]/[0.08] to-[#5de6d0]/[0.04]">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="font-serif text-xl mb-1">{plan.title}</h2>
          <p className="text-xs text-[#888899]">
            {userAge ? `${userAge}세 · ` : ''}월 {formatCurrency(userBudget ?? plan.estimatedBudget)} 예산
          </p>
        </div>
        <Badge variant="teal">AI 생성</Badge>
      </div>

      <div className="mb-5">
        <div className="text-xs font-bold tracking-widest uppercase text-[#7c6ef5] mb-3 flex items-center gap-1.5">
          <Pin className="w-3 h-3" /> 전략
        </div>
        <div className="flex flex-wrap gap-2">
          {plan.strategy.map((s) => <Badge key={s}>{s}</Badge>)}
        </div>
      </div>

      <div className="mb-5">
        <div className="text-xs font-bold tracking-widest uppercase text-[#7c6ef5] mb-3 flex items-center gap-1.5">
          <Calendar className="w-3 h-3" /> 4주 실행 플랜
        </div>
        {plan.weeklyActions.map((a, i) => (
          <div key={i} className="flex gap-3 py-2.5 border-b border-white/[0.05] text-sm last:border-0">
            <span className="text-[#7c6ef5] font-bold text-xs w-5">{i + 1}주</span>
            <span className="text-[#888899]">{a}</span>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <div className="text-xs font-bold tracking-widest uppercase text-[#f55e5e] mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" /> 주의사항
        </div>
        {plan.warnings.map((w) => (
          <div key={w} className="text-xs text-[#888899] py-1 flex items-start gap-1.5">
            <AlertTriangle className="w-3 h-3 text-[#f55e5e] mt-0.5 flex-shrink-0" />
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {plan.kpis.map((k) => (
          <Card key={k.label} variant="compact" className="text-center">
            <div className="font-bold text-[#5de6d0] mb-1">{k.target}</div>
            <div className="text-xs text-[#888899]">{k.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
