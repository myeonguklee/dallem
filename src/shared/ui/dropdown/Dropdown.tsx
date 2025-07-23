'use client';

import { ReactNode, useState } from 'react';

interface DropdownProps {
  children: (props: {
    isOpen: boolean;
    toggle: () => void;
    selectedValue?: string;
    onSelect: (value: string) => void;
  }) => ReactNode;
  defaultValue?: string;
}

export const Dropdown = ({ children, defaultValue }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  const toggle = () => setIsOpen((prev) => !prev);
  const onSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return <>{children({ isOpen, toggle, selectedValue, onSelect })}</>;
};
