'use client';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  accent: 'bg-gradient-to-br from-[#7c6ef5] to-[#9b8ff8] text-white shadow-[0_4px_16px_rgba(124,110,245,0.25)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,110,245,0.4)]',
  ghost: 'bg-transparent border border-white/[0.07] text-[#e8e8f0] hover:border-[#7c6ef5] hover:text-[#7c6ef5]',
  teal: 'bg-gradient-to-br from-[#5de6d0] to-[#3dd5c0] text-[#0a0a0f] hover:-translate-y-0.5',
  gold: 'bg-gradient-to-br from-[#f5c842] to-[#e6a020] text-[#0a0a0f] hover:-translate-y-0.5',
  danger: 'bg-gradient-to-br from-[#f55e5e] to-[#e04040] text-white hover:-translate-y-0.5',
} as const;

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3 text-base rounded-xl gap-2.5',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'accent', size = 'md', loading, fullWidth, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
export default Button;
