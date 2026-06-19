type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div>
      {eyebrow ? <p className="text-sm font-bold text-teal-700">{eyebrow}</p> : null}
      <h2 className="mt-1 text-2xl font-bold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
