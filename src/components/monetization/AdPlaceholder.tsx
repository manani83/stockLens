type AdPlaceholderProps = {
  slotName: string;
  className?: string;
};

export function AdPlaceholder({ slotName, className = "" }: AdPlaceholderProps) {
  return (
    <aside
      aria-label={`${slotName} 광고 영역`}
      className={`rounded-lg border border-dashed border-slate-300 bg-slate-100/80 px-4 py-5 text-center text-sm text-slate-600 sm:px-6 ${className}`}
    >
      <p className="font-bold text-slate-700">광고 영역</p>
      <p className="mt-1">추후 광고가 표시될 수 있습니다.</p>
      <p className="mt-2 text-xs text-slate-500">{slotName}</p>
    </aside>
  );
}
