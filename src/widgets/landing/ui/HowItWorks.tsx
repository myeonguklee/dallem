'use client';

import { useTranslations } from 'next-intl';
import { StepCard } from '@/entities/landing/ui/StepCard';
import { PushGatheringPageButton } from '@/features/landing/PushGatheringPageButton';

const STRING_KEYS = ['one', 'two', 'three'] as const;
type StringKey = (typeof STRING_KEYS)[number];

export function HowItWorks() {
  const t = useTranslations('pages.landing');
  const steps = t.raw('how.steps') as Record<StringKey, { title: string; desc: string }>;

  return (
    <section
      id="how"
      className="border-y border-slate-200 bg-gradient-to-b from-orange-50/60 to-sky-50/60 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
          {t('how.title')}
        </h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
          {STRING_KEYS.map((k, i) => (
            <StepCard
              key={k}
              step={steps[k]}
              i={i}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <PushGatheringPageButton label={t('how.cta')} />
        </div>
      </div>
    </section>
  );
}
