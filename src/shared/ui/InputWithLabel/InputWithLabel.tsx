'use client';

import { Input } from '@/shared/ui/input';
import { InputProps } from '@/shared/ui/input/Input';

export type InputWithLabelProps = {
  label: string;
} & InputProps;

export const InputWithLabel = ({ label, ...props }: InputWithLabelProps) => {
  return (
    <div className="min-h-[96px]">
      <label className="text-font-base mb-2 block text-sm font-semibold">{label}</label>
      <Input {...props} />
    </div>
  );
};
