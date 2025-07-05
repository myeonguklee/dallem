'use client';

import { type ReactNode } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { queryClient } from './client';

interface HydrationProviderProps {
  children: ReactNode;
}

export function HydrationProvider({ children }: HydrationProviderProps) {
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
