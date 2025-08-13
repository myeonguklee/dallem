import { useTranslations } from 'next-intl';
import { FadeIn } from '@/shared/ui/FadeIn';
import { LandingCalendarIcon } from '@/shared/ui/icon/icons/LandingCalendarIcon';
import { LandingHeartIcon } from '@/shared/ui/icon/icons/LandingHeartIcon';
import { LandingUsersIcon } from '@/shared/ui/icon/icons/LandingUsersIcon';

export const FeaturesGrid = () => {
  const t = useTranslations('pages.landing');

  return (
    <section
      id="features"
      className="relative"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('features.title')}</h2>
            <p className="mt-3 text-slate-600">{t('features.lead')}</p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <LandingCalendarIcon className="h-5 w-5" />,
              title: t('features.items.match.title'),
              desc: t('features.items.match.desc'),
            },
            {
              icon: <LandingUsersIcon className="h-5 w-5" />,
              title: t('features.items.smallSafe.title'),
              desc: t('features.items.smallSafe.desc'),
            },
            {
              icon: <LandingHeartIcon className="h-5 w-5" />,
              title: t('features.items.wellbeing.title'),
              desc: t('features.items.wellbeing.desc'),
            },
          ].map((f, i) => (
            <FadeIn
              key={f.title}
              delay={0.05 * i}
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                  {f.icon}
                  <span>FEATURE</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
