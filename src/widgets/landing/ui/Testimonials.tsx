'use client';

import type { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import { LandingReviewCard } from '@/entities/landing/ui/LandingReviewCard';

const STRING_KEYS = ['one', 'two', 'three'] as const;
type StringKey = (typeof STRING_KEYS)[number];

// LandingReviewCard가 기대하는 데이터 타입 재사용
type ReviewData = ComponentProps<typeof LandingReviewCard>['reviewData'];

export const Testimonials = () => {
  const t = useTranslations('pages.landing');

  // 전체 묶음을 한 번에 읽고 키로 접근 (any 제거)
  const cards = t.raw('stories.cards') as Record<StringKey, ReviewData>;

  return (
    <section
      id="stories"
      className="relative"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('stories.title')}</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STRING_KEYS.map((k, i) => (
            <LandingReviewCard
              reviewData={cards[k]}
              key={k}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
