'use client';
import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: readonly SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helper, options, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.replace(/\s/g, '-').toLowerCase() : undefined);
    return (
      <div className="mb-0">
        {label && (
          <label htmlFor={selectId} className="block text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-[#888899] mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full bg-white/[0.04] border rounded-xl text-[#e8e8f0] px-4 py-3 font-[Manrope] text-sm transition-colors focus:outline-none',
            error ? 'border-[#f55e5e] focus:border-[#f55e5e]' : 'border-white/[0.07] focus:border-[#7c6ef5]',
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-xs text-[#f55e5e]">{error}</p>}
        {helper && !error && <p className="mt-1.5 text-xs text-[#888899]">{helper}</p>}
      </div>
    );
  },
);
Select.displayName = 'Select';
export default Select;
