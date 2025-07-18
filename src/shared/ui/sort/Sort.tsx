import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { BlackStateIcon } from '@/shared/ui/icon';
import {
  type SortButtonVariants,
  type SortOptionVariants,
  sortButtonVariants,
  sortOptionVariants,
} from './variants';

interface SortOption {
  label: string;
  value: string;
}

export interface SortProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SortOption[];
  selected: string;
  onChange: (value: string) => void;
  buttonProps?: SortButtonVariants;
  optionProps?: SortOptionVariants;
}

export const Sort = ({
  options,
  selected,
  onChange,
  className,
  buttonProps,
  optionProps,
  ...props
}: SortProps) => {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  // 유효한 선택인지 확인하고, 유효하지 않으면 첫 번째 옵션으로 변경
  const isValidSelection = options.some((o) => o.value === selected);
  const currentSelected = isValidSelection ? selected : (options[0]?.value ?? '');

  // 유효하지 않은 선택이면 첫 번째 옵션으로 자동 변경
  useEffect(() => {
    if (!isValidSelection && options.length > 0 && selected !== options[0]?.value) {
      onChange(options[0].value);
    }
  }, [selected, options, isValidSelection, onChange]);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
    setFocusIdx(-1);
  };

  // ESC, 방향키, Enter/Space로 내비게이션
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === 'Escape') {
      setOpen(false);
      setFocusIdx(-1);
    } else if (e.key === 'ArrowDown') {
      setFocusIdx((prev) => (prev + 1) % options.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setFocusIdx((prev) => (prev - 1 + options.length) % options.length);
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (focusIdx >= 0 && focusIdx < options.length) {
        handleSelect(options[focusIdx].value);
      }
    }
  };

  // 드롭다운 열릴 때, 선택된 항목에 포커스
  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === selected);
      setFocusIdx(idx >= 0 ? idx : 0);
    } else {
      setFocusIdx(-1);
    }
  }, [open, options, selected]);

  // 포커스 인덱스가 바뀔 때 해당 버튼에 포커스
  useEffect(() => {
    if (open && focusIdx >= 0 && buttonsRef.current[focusIdx]) {
      buttonsRef.current[focusIdx]?.focus();
    }
  }, [focusIdx, open]);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusIdx(-1);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <button
        type="button"
        className={sortButtonVariants({
          size: 'default',
          className,
          ...buttonProps,
        })}
        onClick={() => setOpen((prev) => !prev)}
      >
        <BlackStateIcon />
        {/* md 이상에서만 label 노출 */}
        <span className="tablet:inline hidden font-medium text-[var(--color-font-base)]">
          {options.find((o) => o.value === currentSelected)?.label}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 z-[var(--z-dropdown)] mt-2 min-w-32 rounded-lg border border-gray-200 bg-white">
          {options.map((option, idx) => (
            <button
              key={option.value}
              ref={(el) => {
                buttonsRef.current[idx] = el;
              }}
              className={sortOptionVariants({
                selected: option.value === selected,
                ...optionProps,
              })}
              onClick={() => handleSelect(option.value)}
              tabIndex={-1}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
