import { useTranslations } from 'next-intl';
import { FadeIn } from '@/shared/ui/FadeIn';

export function Stats() {
  const t = useTranslations();

  return (
    <section className="border-y border-slate-200/80 bg-white/70 py-8 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 md:px-6">
        {[
          { label: t('stats.totalMembers'), value: '12,842' },
          { label: t('stats.rating'), value: '4.9/5.0' },
          { label: t('stats.weekly'), value: '120+' },
          { label: t('stats.cancel'), value: '<3%' },
        ].map((s, i) => (
          <FadeIn key={i}>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-2xl font-bold tracking-tight text-slate-900">{s.value}</div>
              <div className="mt-1 text-xs text-slate-600">{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
