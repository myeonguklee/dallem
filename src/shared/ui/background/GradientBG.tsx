export function GradientBG() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-28 -left-24 h-[44rem] w-[44rem] rounded-full bg-gradient-to-tr from-amber-200/60 via-rose-200/50 to-sky-200/60 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-orange-200/50 via-cyan-200/50 to-indigo-200/50 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_55%)]" />
    </div>
  );
}
