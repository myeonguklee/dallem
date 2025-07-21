'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar } from '../calendar';

interface CalenderPopupProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  position: { top: number; left: number };
}

export const CalenderPopup = ({ value, onChange, position }: CalenderPopupProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="absolute z-50 rounded-xl bg-white shadow-xl"
      style={{
        top: position.top,
        left: position.left,
        position: 'absolute',
      }}
    >
      <Calendar
        value={value}
        onChange={onChange}
      />
    </div>,
    document.body,
  );
};
