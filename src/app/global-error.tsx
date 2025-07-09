'use client';

import { useEffect } from 'react';
import { GlobalErrorFallback } from '@/shared/ui/fallback/globalErrorFallback';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary Caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <GlobalErrorFallback
          error={error}
          reset={reset}
        />
      </body>
    </html>
  );
}
