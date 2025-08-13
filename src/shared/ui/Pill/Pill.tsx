import type { HTMLAttributes, PropsWithChildren } from 'react';

export const Pill: React.FC<PropsWithChildren<HTMLAttributes<HTMLSpanElement>>> = ({
  children,
  className,
  ...rest
}) => (
  <span
    className={`inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ${className ?? ''}`}
    {...rest}
  >
    {children}
  </span>
);
