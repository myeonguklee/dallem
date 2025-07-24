// 페이지 작업시 위치 변경 예정
import React, { useState } from 'react';
import { BoxSelector } from './BoxSelector';

export interface BoxSelectorOption {
  id: string;
  title: string;
  subtitle?: string;
  disabled?: boolean;
}

export interface BoxSelectorGroupProps {
  options: BoxSelectorOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
  gap?: string;
}

export const BoxSelectorGroup = ({
  options,
  value,
  onChange,
  multiple = false,
  disabled = false,
  className = '',
  layout = 'horizontal',
  gap = '16px',
}: BoxSelectorGroupProps) => {
  const [internalValue, setInternalValue] = useState<string | null>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const setCurrentValue = (newValue: string | null) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleSelect = (optionId: string) => {
    if (disabled) return;

    if (multiple) {
      // 다중 선택 로직 (현재는 단일 선택만 구현)
      setCurrentValue(currentValue === optionId ? null : optionId);
    } else {
      // 단일 선택 로직
      setCurrentValue(currentValue === optionId ? null : optionId);
    }
  };

  const getLayoutClass = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col';
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'flex';
    }
  };

  const containerStyle = {
    gap,
  };

  return (
    <div
      className={`${getLayoutClass()} ${className}`}
      style={containerStyle}
    >
      {options.map((option) => (
        <BoxSelector
          key={option.id}
          title={option.title}
          subtitle={option.subtitle}
          isSelected={currentValue === option.id}
          disabled={disabled || option.disabled}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </div>
  );
};
