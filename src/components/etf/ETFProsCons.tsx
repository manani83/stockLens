import type { ETFDividendInfo } from "@/domain/etf/etfTypes";

type ETFProsConsProps = {
  etf: ETFDividendInfo;
};

export function ETFProsCons({ etf }: ETFProsConsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">장점</h2>
        <ul className="mt-4 grid gap-3">
          {etf.strengths.map((strength) => (
            <li className="rounded-md bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950" key={strength}>
              {strength}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-rose-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">단점</h2>
        <ul className="mt-4 grid gap-3">
          {etf.weaknesses.map((weakness) => (
            <li className="rounded-md bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-950" key={weakness}>
              {weakness}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
