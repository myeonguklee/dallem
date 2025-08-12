'use client';

import { useTranslations } from 'next-intl';
import { HeroCard } from '@/entities/landing/ui/HeroCard';
import { PushGatheringPageButton } from '@/features/landing/PushGatheringPageButton';
import { Link } from '@/i18n';
import { FadeIn } from '@/shared/ui/FadeIn';
import { Pill } from '@/shared/ui/Pill';
import { CalendarIcon } from '@/shared/ui/icon/icons/CalendarIcon';
import { LandingUsersIcon } from '@/shared/ui/icon/icons/LandingUsersIcon';
import { LeafIcon } from '@/shared/ui/icon/icons/LeafIcon';
import { motion } from 'framer-motion';

export function Hero() {
  const t = useTranslations('pages.landing');

  return (
    <section className="relative">
      <div className="tablet:grid-cols-2 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-6 md:py-24">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-6">
            <Pill>
              <LeafIcon
                className="mr-1 h-3.5 w-3.5"
                style={{ color: 'oklch(65% 0.13 70)' }}
              />
              {t('hero.badge.context')}
            </Pill>
            <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              {t('hero.title.top')}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, var(--color-orange-500), oklch(0.75 0.22 53.77), oklch(0.82 0.19 94.91))`,
                }}
              >
                {t('hero.title.highlight')}
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PushGatheringPageButton label={t('hero.cta.primary')} />
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                {t('hero.cta.secondary')}
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
              <Pill className="gap-1 border-orange-200 bg-orange-50 text-orange-700">
                <LeafIcon className="h-3.5 w-3.5" />
                {t('hero.pill.mindfulness')}
              </Pill>
              <Pill className="gap-1 border-sky-200 bg-sky-50 text-sky-700">
                <LandingUsersIcon className="h-3.5 w-3.5" />
                {t('hero.pill.smallGroup')}
              </Pill>
              <Pill className="gap-1 border-amber-200 bg-amber-50 text-amber-700">
                <CalendarIcon className="h-3.5 w-3.5" />
                {t('hero.pill.afterWork')}
              </Pill>
            </div>
          </div>
        </FadeIn>

        {/* Hero Visual */}
        <FadeIn delay={0.1}>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
              {/* Faux UI Card Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  {
                    title: 'hero.grid.card.walk',
                    tag: 'hero.grid.tag.mapo',
                    color: 'from-orange-200 to-cyan-200',
                  },
                  {
                    title: 'hero.grid.card.candle',
                    tag: 'hero.grid.tag.seongsu',
                    color: 'from-rose-200 to-pink-200',
                  },
                  {
                    title: 'hero.grid.card.meditation',
                    tag: 'hero.grid.tag.gangnam',
                    color: 'from-sky-200 to-indigo-200',
                  },
                  {
                    title: 'hero.grid.card.book',
                    tag: 'hero.grid.tag.hyehwa',
                    color: 'from-amber-200 to-rose-200',
                  },
                  {
                    title: 'hero.grid.card.board',
                    tag: 'hero.grid.tag.hongdae',
                    color: 'from-violet-200 to-fuchsia-200',
                  },
                  {
                    title: 'hero.grid.card.running',
                    tag: 'hero.grid.tag.yeouido',
                    color: 'from-lime-200 to-teal-200',
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <HeroCard
                      title={t(card.title)}
                      tag={t(card.tag)}
                      color={card.color}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 left-6 rotate-2 rounded-2xl bg-white px-3 py-2 text-xs text-slate-600 shadow ring-1 ring-slate-200">
              {t('hero.grid.caption')}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
