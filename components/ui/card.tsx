import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={
        'rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10 shadow-soft ' +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
}
