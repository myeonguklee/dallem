'use client';

import { ReactNode, useState } from 'react';

interface DropdownProps {
  children: (props: { isOpen: boolean; toggle: () => void }) => ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return <>{children({ isOpen, toggle })}</>;
}
