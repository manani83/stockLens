import type { DividendSimulationYearResult } from "@/domain/simulation/simulationTypes";
import { formatKrw } from "@/lib/format";

type DividendSimulationTableProps = {
  results: DividendSimulationYearResult[];
};

export function DividendSimulationTable({ results }: DividendSimulationTableProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">연도별 결과</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {["연도", "시작 금액", "연간 추가 투자금", "세후 배당금", "재투자 배당금", "성장 금액", "연말 평가금액", "예상 월 배당금"].map((label) => (
                <th className="px-3 py-3 font-bold text-slate-700" key={label}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr className="border-b border-slate-100" key={result.year}>
                <td className="px-3 py-3 font-bold text-slate-950">{result.year}년</td>
                <td className="px-3 py-3 text-slate-700">{formatKrw(result.beginningBalanceKrw)}</td>
                <td className="px-3 py-3 text-slate-700">{formatKrw(result.yearlyContributionKrw)}</td>
                <td className="px-3 py-3 text-slate-700">{formatKrw(result.yearlyDividendAfterTaxKrw)}</td>
                <td className="px-3 py-3 text-slate-700">{formatKrw(result.reinvestedDividendKrw)}</td>
                <td className="px-3 py-3 text-slate-700">{formatKrw(result.growthAmountKrw)}</td>
                <td className="px-3 py-3 font-bold text-slate-950">{formatKrw(result.endingBalanceKrw)}</td>
                <td className="px-3 py-3 text-slate-700">{formatKrw(result.estimatedMonthlyDividendAfterTaxKrw)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
