import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'brand' | 'success' | 'accent';
}

const toneClasses = {
  brand: 'bg-brand-500/10 text-brand-200 ring-brand-500/20',
  success: 'bg-emerald-500/10 text-emerald-200 ring-emerald-500/20',
  accent: 'bg-sky-500/10 text-sky-200 ring-sky-500/20',
};

export function Badge({ children, tone = 'brand' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
