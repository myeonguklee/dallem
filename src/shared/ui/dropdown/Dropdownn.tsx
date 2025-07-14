'use client';

import { FC, ReactNode, useState } from 'react';

interface DropdownProps {
  children: (props: { isOpen: boolean; toggle: () => void }) => ReactNode;
}

export const Dropdown: FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return <>{children({ isOpen, toggle })}</>;
};
