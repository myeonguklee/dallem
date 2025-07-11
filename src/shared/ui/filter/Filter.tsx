import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { ArrowDownIcon, ArrowUpIcon, WhiteArrowDownIcon } from '../icon';

interface FilterOption {
  label: string;
  value: string;
}

const filterButtonVariants = cva(
  'flex h-10 min-w-32 items-center justify-center gap-2 rounded-[var(--dimension-button-rounded)] border border-gray-200 p-2 transition-colors',
  {
    variants: {
      variant: {
        all: 'bg-white text-[var(--color-font-base)]',
        selected: 'bg-black text-white',
      },
    },
    defaultVariants: {
      variant: 'all',
    },
  },
);

const filterOptionVariants = cva(
  'w-full px-2 py-3 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-orange-200',
  {
    variants: {
      selected: {
        true: 'font-bold text-[var(--semantic-color-primary)]',
        false: 'text-[var(--color-font-base)]',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

// 타입 추출
type FilterButtonVariants = VariantProps<typeof filterButtonVariants>;
type FilterOptionVariants = VariantProps<typeof filterOptionVariants>;

interface FilterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  allValue?: string; // 전체보기 값 (기본값: 'all')
  buttonProps?: FilterButtonVariants;
  optionProps?: FilterOptionVariants;
}

export const Filter = ({
  options,
  selected,
  onChange,
  className,
  allValue = 'all',
  buttonProps,
  optionProps,
  ...props
}: FilterProps) => {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
    setFocusIdx(-1);
  };

  // 전체보기인지 확인
  const isAllSelected = selected === allValue;

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
        className={filterButtonVariants({
          variant: isAllSelected ? 'all' : 'selected',
          className,
          ...buttonProps,
        })}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-medium">{options.find((o) => o.value === selected)?.label}</span>
        {open ? (
          isAllSelected ? (
            <ArrowUpIcon />
          ) : (
            <WhiteArrowDownIcon className="rotate-180" />
          )
        ) : isAllSelected ? (
          <ArrowDownIcon />
        ) : (
          <WhiteArrowDownIcon />
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 min-w-32 rounded-lg border border-gray-200 bg-white">
          {options.map((option, idx) => (
            <button
              key={option.value}
              ref={(el) => {
                buttonsRef.current[idx] = el;
              }}
              className={filterOptionVariants({
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
