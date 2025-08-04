'use client';

import { useEffect } from 'react';
import { GlobalErrorFallback } from '@/shared/ui/fallback';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
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
