export const Pill: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <span
    className={`inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ${className ?? ''}`}
  >
    {children}
  </span>
);
