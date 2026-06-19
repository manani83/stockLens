import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { formatPercent } from "@/lib/format";

type ETFCompareCardProps = {
  etf: ETFDividendInfo;
};

export function ETFCompareCard({ etf }: ETFCompareCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-teal-700">{etf.ticker}</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{etf.name}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{etf.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">배당률</dt>
          <dd className="mt-1 font-bold text-slate-950">{formatPercent(etf.dividendYieldPercent)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">운용보수</dt>
          <dd className="mt-1 font-bold text-slate-950">{formatPercent(etf.expenseRatioPercent)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">배당주기</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.payoutCycle}</dd>
        </div>
        <div>
          <dt className="text-slate-500">위험도</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.riskLevel}</dd>
        </div>
      </dl>
    </article>
  );
}
