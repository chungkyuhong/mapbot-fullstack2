'use client';
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.replace(/\s/g, '-').toLowerCase() : undefined);
    return (
      <div className="mb-0">
        {label && (
          <label htmlFor={inputId} className="block text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-[#888899] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-white/[0.04] border rounded-xl text-[#e8e8f0] px-4 py-3 font-[Manrope] text-sm transition-colors focus:outline-none',
            error ? 'border-[#f55e5e] focus:border-[#f55e5e]' : 'border-white/[0.07] focus:border-[#7c6ef5]',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-[#f55e5e]">{error}</p>}
        {helper && !error && <p className="mt-1.5 text-xs text-[#888899]">{helper}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;
