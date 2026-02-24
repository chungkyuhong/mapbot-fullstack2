'use client';
import Card from '@/components/ui/Card';

interface Transaction {
  date: string;
  desc: string;
  delta: number;
  used?: number;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <Card>
      <div className="font-serif text-lg mb-4">거래 내역</div>
      <div className="space-y-1">
        {transactions.map((h, i) => (
          <div key={i} className="flex justify-between py-2.5 border-b border-white/[0.05] text-sm last:border-0">
            <span className="text-[#888899]">{h.date} · {h.desc}</span>
            <span>
              {h.delta > 0 && <span className="text-[#5de67a]">+{h.delta}P</span>}
              {h.used && <span className="text-[#f55e5e] ml-2">{h.used}P</span>}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
