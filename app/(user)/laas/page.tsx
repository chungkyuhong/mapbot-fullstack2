'use client';
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PlanForm from '@/components/features/laas/PlanForm';
import PlanResultCard from '@/components/features/laas/PlanResultCard';
import ToastContainer from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import type { LaasPlan } from '@/types';

const LAAS_DATA: Record<string, LaasPlan> = {
  fashion: {
    domain: 'fashion', title: '퍼스널 스타일링 플랜',
    summary: '체형·라이프스타일 기반 AI 패션 전략',
    strategy: ['퍼스널 컬러 분석', '체형별 핏 가이드', '시즌 코디북', '스마트 쇼핑 연계'],
    weeklyActions: ['기본 아이템 3종 구매', '스타일링 피드백 수신', '코디 완성도 점검', '다음달 위시리스트'],
    warnings: ['트렌드 아이템 과소비 주의', '계절 아이템 우선 투자'],
    kpis: [{ label: '코디 완성도', target: '80%+' }, { label: '예산 준수율', target: '95%+' }, { label: '활용률', target: '70%+' }],
    estimatedBudget: 300000, generatedAt: new Date(),
  },
  healthcare: {
    domain: 'healthcare', title: '건강관리 로드맵',
    summary: '생활습관 개선 + 예방적 건강관리 AI 플랜',
    strategy: ['체성분 기반 운동 강도', '식이요법 캘린더', '수면·스트레스 모니터링', '정기검진 알림'],
    weeklyActions: ['기초 체력 측정', '식단 일지 시작', '운동 루틴 2회/주', '중간 점검'],
    warnings: ['본 플랜은 의료 진단이 아닙니다', '이상 증상 시 전문의 상담'],
    kpis: [{ label: '주 3회 운동', target: '달성' }, { label: '수면', target: '7시간+' }, { label: '체중 변화', target: '모니터링' }],
    estimatedBudget: 200000, generatedAt: new Date(),
  },
  beauty: {
    domain: 'beauty', title: '뷰티 루틴 설계',
    summary: '피부 타입·시즌·예산 기반 맞춤 스킨케어',
    strategy: ['피부 타입 진단', '루틴 최적화', '성분 중복 체크', '레이어링 가이드'],
    weeklyActions: ['현재 제품 성분 분석', '세럼·선크림 업그레이드', '10분 모닝 케어 정착', '피부 변화 사진 기록'],
    warnings: ['패치 테스트 권장', '의약품 성분 함유 제품 주의'],
    kpis: [{ label: '수분도', target: '+15%' }, { label: '루틴 준수율', target: '90%+' }, { label: '예산', target: '초과 없음' }],
    estimatedBudget: 150000, generatedAt: new Date(),
  },
  investment: {
    domain: 'investment', title: '스마트 투자 전략',
    summary: '리스크 분산·목표 수익률 기반 포트폴리오',
    strategy: ['ETF 60:40 분산', '안전자산 20% 편입', '적립식 코스트 애버리징', '분기 리밸런싱'],
    weeklyActions: ['비상금 6개월치 확보', 'ETF 포트폴리오 구성', '자동이체 설정', '분기 수익률 리뷰'],
    warnings: ['본 플랜은 투자 자문이 아닙니다', '원금 손실 가능성 존재', '최종 결정은 본인 책임'],
    kpis: [{ label: '목표 수익률', target: '8~12%/년' }, { label: '최대 낙폭', target: '-15% 이내' }, { label: '적립식 납입', target: '준수' }],
    estimatedBudget: 500000, generatedAt: new Date(),
  },
};

export default function LaasPage() {
  const [plan, setPlan] = useState<LaasPlan | null>(null);
  const [userAge, setUserAge] = useState('');
  const [userBudget, setUserBudget] = useState(300000);
  const { toasts, notify, dismissToast } = useToast();

  const handleGenerate = (params: {
    domain: string; age: string; gender: string; goal: string; budget: number;
  }) => {
    const baseData = LAAS_DATA[params.domain];
    if (!baseData) { notify('도메인을 선택해주세요', 'error'); return; }
    const newPlan = { ...baseData, estimatedBudget: params.budget, generatedAt: new Date() };
    setPlan(newPlan);
    setUserAge(params.age);
    setUserBudget(params.budget);
    notify(`${newPlan.title} 생성 완료!`);
  };

  return (
    <PageContainer title="LaaS AI" subtitle="Life as a Service — AI 라이프스타일 플랜">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlanForm onGenerate={handleGenerate} />
        <PlanResultCard plan={plan} userAge={userAge} userBudget={userBudget} />
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </PageContainer>
  );
}
