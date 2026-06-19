type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

export function PageHero({ children, description, eyebrow, title }: PageHeroProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {eyebrow ? <p className="text-sm font-bold text-teal-700">{eyebrow}</p> : null}
      <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
