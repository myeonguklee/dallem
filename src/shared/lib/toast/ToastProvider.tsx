'use client';

import { Toaster } from 'react-hot-toast';

// 토스트 설정
const toastConfig = {
  position: 'top-center' as const,
  duration: 3000,
  style: {
    background: '#333',
    color: '#fff',
  },
};

export function ToastProvider() {
  return <Toaster {...toastConfig} />;
}
