'use client';
import { Ticket } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { formatCurrency, formatPoints } from '@/lib/utils';
import { validatePhone } from '@/lib/validators';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useState } from 'react';
import type { RouteOption } from '@/types';

interface BookingConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (phone: string, notes: string) => void;
  route: RouteOption | null;
}

export default function BookingConfirmModal({ open, onClose, onConfirm, route }: BookingConfirmModalProps) {
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const { errors, validateAll } = useFormValidation();

  if (!route) return null;

  const handleConfirm = () => {
    const valid = validateAll({
      phone: () => validatePhone(phone),
    });
    if (!valid) return;
    onConfirm(phone, notes);
  };

  const details = [
    ['경로', route.label],
    ['이동 수단', route.steps[0]?.mode ?? 'DRT'],
    ['소요 시간', `${route.totalDurationMinutes}분`],
    ['결제 금액', formatCurrency(route.totalCost)],
    ['예상 적립', `+${formatPoints(route.muPointEarn)}`],
  ];

  return (
    <Modal open={open} onClose={onClose} title="예약 확인">
      <div className="flex items-center gap-2 mb-5 text-[#7c6ef5]">
        <Ticket className="w-5 h-5" />
        <span className="font-medium text-sm">예약 상세</span>
      </div>

      <div className="bg-white/[0.03] rounded-xl p-5 mb-5 space-y-2.5">
        {details.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm py-1.5 border-b border-white/[0.05] last:border-0">
            <span className="text-[#888899]">{k}</span>
            <span className={k === '예상 적립' ? 'text-[#5de6d0] font-semibold' : 'font-semibold'}>{v}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-5">
        <Input
          label="연락처"
          type="tel"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
        <div>
          <label className="block text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-[#888899] mb-2">
            특이사항
          </label>
          <textarea
            className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl text-[#e8e8f0] px-4 py-3 font-[Manrope] text-sm transition-colors focus:border-[#7c6ef5] focus:outline-none"
            placeholder="휠체어 필요, 유아 동반 등"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <Button fullWidth onClick={handleConfirm}>
        예약 확정
      </Button>
    </Modal>
  );
}
