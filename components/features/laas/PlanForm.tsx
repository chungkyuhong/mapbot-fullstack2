'use client';
import { Bot, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import DomainSelector from './DomainSelector';
import { useState } from 'react';

const genderOptions = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
  { value: 'unspecified', label: '미지정' },
];

interface PlanFormProps {
  onGenerate: (params: {
    domain: string;
    age: string;
    gender: string;
    goal: string;
    budget: number;
  }) => void;
}

export default function PlanForm({ onGenerate }: PlanFormProps) {
  const [domain, setDomain] = useState<string | null>(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState(300000);

  const handleGenerate = () => {
    if (!domain) return;
    onGenerate({ domain, age, gender, goal, budget });
  };

  return (
    <Card>
      <div className="flex items-center gap-2 font-serif text-xl mb-5">
        <Bot className="w-5 h-5 text-[#7c6ef5]" />
        나만의 LaaS AI 에이전트
        <span className="font-sans text-xs text-[#888899] font-normal ml-1">Life as a Service</span>
      </div>

      <div className="mb-5">
        <DomainSelector selected={domain} onSelect={setDomain} />
      </div>

      <div className="space-y-4 mb-5">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="나이"
            type="number"
            placeholder="35"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={15}
            max={80}
          />
          <Select
            label="성별"
            options={genderOptions}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <Input
          label="목표 / 관심사"
          type="text"
          placeholder="예: 직장인 데일리룩, 체중감량 10kg"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <Input
          label="월 예산 (원)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
          step={50000}
        />
      </div>

      <Button fullWidth onClick={handleGenerate} disabled={!domain}>
        <Sparkles className="w-4 h-4" />
        AI 개인 플랜 생성
      </Button>
    </Card>
  );
}
