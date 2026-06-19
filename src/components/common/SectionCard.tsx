type SectionCardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({
  children,
  className = "",
  description,
  title,
}: SectionCardProps) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {title ? <h2 className="text-xl font-bold text-slate-950">{title}</h2> : null}
      {description ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      <div className={title || description ? "mt-4" : ""}>{children}</div>
    </section>
  );
}
