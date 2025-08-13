import { FadeIn } from '@/shared/ui/FadeIn';

export const StepCard = ({ step, i }: { step: { title: string; desc: string }; i: number }) => (
  <FadeIn
    key={i}
    delay={0.05 * i}
  >
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="bg-primary absolute -top-3 left-5 rounded-full px-2 py-0.5 text-xs font-bold text-white">
        {i + 1}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
    </div>
  </FadeIn>
);
