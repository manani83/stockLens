import type { DividendSimulationResult } from "@/domain/simulation/simulationTypes";
import { formatKrw } from "@/lib/format";

type DividendSimulationSummaryProps = {
  result: DividendSimulationResult;
};

export function DividendSimulationSummary({ result }: DividendSimulationSummaryProps) {
  const items = [
    ["최종 예상 평가금액", formatKrw(result.finalBalanceKrw)],
    ["총 투자원금", formatKrw(result.totalContributionKrw)],
    ["누적 세후 배당금", formatKrw(result.totalDividendAfterTaxKrw)],
    ["최종 예상 세후 월 배당금", formatKrw(result.finalEstimatedMonthlyDividendAfterTaxKrw)],
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([label, value]) => (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={label}>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
        </div>
      ))}
    </section>
  );
}
