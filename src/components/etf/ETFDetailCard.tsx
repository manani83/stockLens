import type { ETFDividendInfo } from "@/domain/etf/etfTypes";

type ETFDetailCardProps = {
  etf: ETFDividendInfo;
};

export function ETFDetailCard({ etf }: ETFDetailCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-bold text-teal-700">{etf.ticker}</p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
        {etf.name}
      </h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">{etf.issuer}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{etf.category}</span>
      </div>
      <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
        {etf.description}
      </p>
    </section>
  );
}
