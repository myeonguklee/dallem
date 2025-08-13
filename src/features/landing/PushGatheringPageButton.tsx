'use client';

import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';

export function PushGatheringPageButton({ label }: { label: string }) {
  return (
    <Link
      href={ROUTES.GATHERING}
      className="bg-primary rounded-lg px-6 py-3 font-semibold text-white hover:brightness-95"
    >
      {label}
    </Link>
  );
}
