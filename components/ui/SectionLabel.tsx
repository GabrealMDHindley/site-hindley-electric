export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-red" aria-hidden />
      <span className="font-display text-xs uppercase tracking-[0.3em] text-red">
        {children}
      </span>
    </div>
  );
}
