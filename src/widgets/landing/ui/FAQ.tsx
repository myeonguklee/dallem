'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/shared/ui/FadeIn';

const FAQ_KEYS = ['one', 'two', 'three'] as const;
type FAQKey = (typeof FAQ_KEYS)[number];

export const FAQ = () => {
  const t = useTranslations('pages.landing');
  const fqaItems = t.raw('faq.items') as Record<FAQKey, { q: string; a: string }>;

  return (
    <section
      id="faq"
      className="border-t border-slate-200 bg-white/70 py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            {t('faq.title')}
          </h2>
        </FadeIn>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4">
          {FAQ_KEYS.map((k, i) => {
            const item = fqaItems[k];
            return (
              <FadeIn
                key={i}
                delay={0.05 * i}
              >
                <details
                  key={k}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                    <span className="bg-primary mr-2 rounded-full px-2 py-0.5 text-xs font-bold text-white">
                      Q
                    </span>
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{item.a}</p>
                </details>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
