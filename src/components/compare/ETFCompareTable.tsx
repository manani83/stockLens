import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { formatPercent } from "@/lib/format";

type ETFCompareTableProps = {
  first: ETFDividendInfo;
  second: ETFDividendInfo;
};

export function ETFCompareTable({ first, second }: ETFCompareTableProps) {
  const rows = [
    ["티커", first.ticker, second.ticker],
    ["ETF 이름", first.name, second.name],
    ["운용사", first.issuer, second.issuer],
    ["카테고리", first.category, second.category],
    ["배당률", formatPercent(first.dividendYieldPercent), formatPercent(second.dividendYieldPercent)],
    ["운용보수", formatPercent(first.expenseRatioPercent), formatPercent(second.expenseRatioPercent)],
    ["배당주기", first.payoutCycle, second.payoutCycle],
    ["위험도", first.riskLevel, second.riskLevel],
    ["투자 성격", first.description, second.description],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">비교 표</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-3 py-3 font-bold text-slate-700">항목</th>
              <th className="px-3 py-3 font-bold text-slate-950">{first.ticker}</th>
              <th className="px-3 py-3 font-bold text-slate-950">{second.ticker}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, firstValue, secondValue]) => (
              <tr className="border-b border-slate-100" key={label}>
                <th className="w-40 px-3 py-3 font-semibold text-slate-700">{label}</th>
                <td className="px-3 py-3 text-slate-700">{firstValue}</td>
                <td className="px-3 py-3 text-slate-700">{secondValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
