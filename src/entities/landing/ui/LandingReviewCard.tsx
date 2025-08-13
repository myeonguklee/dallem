import { useTranslations } from 'next-intl';
import { FadeIn } from '@/shared/ui/FadeIn';

type ReviewData = {
  title: string;
  body: string;
  meta: string;
};

export const LandingReviewCard = ({ reviewData, i }: { reviewData: ReviewData; i: number }) => {
  const t = useTranslations('pages.landing');
  return (
    <FadeIn delay={0.05 * i}>
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-2 inline-flex items-center gap-2 text-xs text-slate-600">
          <span>❤️</span>
          <span>{t('stories.badge')}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{reviewData.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{reviewData.body}</p>
        <div className="mt-4 text-xs text-slate-500">{reviewData.meta}</div>
      </article>
    </FadeIn>
  );
};
