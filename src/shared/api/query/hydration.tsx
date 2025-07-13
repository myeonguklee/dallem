'use client';

import { type ReactNode } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';

interface HydrationProviderProps {
  children: ReactNode;
  dehydratedState?: unknown; // 서버에서 전달받은 상태
}

export function HydrationProvider({ children, dehydratedState }: HydrationProviderProps) {
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
