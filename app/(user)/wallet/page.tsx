'use client';
import { CreditCard, Smartphone, Star, Building2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import PointsBalance from '@/components/features/wallet/PointsBalance';
import TransactionHistory from '@/components/features/wallet/TransactionHistory';
import PricingCalculator from '@/components/features/wallet/PricingCalculator';
import Card from '@/components/ui/Card';
import { useMapBotStore } from '@/lib/store';

const paymentIcons: Record<string, React.ElementType> = {
  CreditCard, Smartphone, Star, Building2,
};

const paymentMethods = [
  { value: 'card', label: '신용카드', icon: 'CreditCard' },
  { value: 'kakao', label: '카카오페이', icon: 'Smartphone' },
  { value: 'mu', label: 'MU Point 전액', icon: 'Star' },
  { value: 'corp', label: '법인카드', icon: 'Building2' },
];

const mockTransactions = [
  { date: '오늘', desc: 'DRT 이용', delta: 120 },
  { date: '어제', desc: '버스 이용', delta: 30 },
  { date: '2일 전', desc: 'DRT 이용', delta: 150, used: -200 },
  { date: '3일 전', desc: '택시 이용', delta: 120 },
];

export default function WalletPage() {
  const muPoints = useMapBotStore((s) => s.muPoints);
  const setMuPoints = useMapBotStore((s) => s.setMuPoints);

  return (
    <PageContainer title="포인트" subtitle="MU Point · 요금 계산 · 결제수단">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <PricingCalculator muPoints={muPoints} onMuPointsChange={setMuPoints} />
        </div>
        <div className="space-y-5">
          <PointsBalance points={muPoints} />
          <TransactionHistory transactions={mockTransactions} />
          <Card>
            <div className="font-serif text-lg mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#7c6ef5]" />
              결제 수단
            </div>
            <div className="space-y-2.5">
              {paymentMethods.map((pm) => {
                const Icon = paymentIcons[pm.icon];
                return (
                  <label key={pm.value} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] cursor-pointer hover:border-[#7c6ef5]/30 transition-colors">
                    <input type="radio" name="pay" value={pm.value} className="accent-[#7c6ef5]" defaultChecked={pm.value === 'card'} />
                    <Icon className="w-4 h-4 text-[#888899]" />
                    <span className="text-sm">{pm.label}</span>
                  </label>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
