export const HeroCard = ({ title, tag, color }: { title: string; tag: string; color: string }) => (
  <>
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-60`} />
    <div className="relative flex h-full flex-col justify-between">
      <span className="self-start rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-slate-700 ring-1 ring-slate-200">
        {tag}
      </span>
      <div className="text-sm font-semibold text-slate-800">{title}</div>
    </div>
  </>
);
