import type { ETFDividendInfo } from "@/domain/etf/etfTypes";

type ETFSuitableForProps = {
  etf: ETFDividendInfo;
};

export function ETFSuitableFor({ etf }: ETFSuitableForProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">어울리는 투자자</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {etf.suitableFor.map((item) => (
          <li className="rounded-md bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
