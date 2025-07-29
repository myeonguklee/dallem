'use client';

import React, { useEffect, useRef } from 'react';
import { Spinner } from '../icon';

interface InfiniteScrollObserverProps {
  onFetchNextPage: () => void; //
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

export const InfiniteScrollObserver = ({
  onFetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  loader = (
    <div className="flex h-14 items-center justify-center text-[var(--color-primary)]">
      <Spinner color="currentColor" />
    </div>
  ),
  endMessage = '',
}: InfiniteScrollObserverProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 즉시중단,
    if (typeof window === 'undefined' || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        onFetchNextPage();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onFetchNextPage]);

  return (
    <div
      ref={ref}
      className=""
    >
      {isFetchingNextPage && loader}
      {!hasNextPage && endMessage}
    </div>
  );
};
