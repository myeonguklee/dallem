'use client';

import { Toaster } from 'react-hot-toast';
import { TOAST_CONFIG } from './toastConfig';

export function ToastProvider() {
  return <Toaster {...TOAST_CONFIG} />;
}
