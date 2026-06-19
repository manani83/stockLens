import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { formatPercent } from "@/lib/format";

type ETFInfoGridProps = {
  etf: ETFDividendInfo;
};

export function ETFInfoGrid({ etf }: ETFInfoGridProps) {
  const items = [
    ["배당률", formatPercent(etf.dividendYieldPercent)],
    ["운용보수", formatPercent(etf.expenseRatioPercent)],
    ["배당주기", etf.payoutCycle],
    ["위험도", etf.riskLevel],
    ["투자 유형", etf.category],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">핵심 정보</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([label, value]) => (
          <div className="rounded-md bg-slate-50 p-4" key={label}>
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="mt-1 text-lg font-bold text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
