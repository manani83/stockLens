import type { DividendResult } from "@/domain/dividend/dividendTypes";
import { formatKrw, formatUsd } from "@/lib/format";

type DividendResultCardProps = {
  result: DividendResult;
};

export function DividendResultCard({ result }: DividendResultCardProps) {
  const items = [
    ["달러 기준 투자금", formatUsd(result.investmentUsd)],
    ["세전 연 배당금", formatUsd(result.annualDividendBeforeTaxUsd)],
    ["세후 연 배당금", formatUsd(result.annualDividendAfterTaxUsd)],
    ["세전 월 배당금", formatUsd(result.monthlyDividendBeforeTaxUsd)],
    ["세후 월 배당금", formatUsd(result.monthlyDividendAfterTaxUsd)],
    ["원화 기준 세전 연 배당금", formatKrw(result.annualDividendBeforeTaxKrw)],
    ["원화 기준 세후 연 배당금", formatKrw(result.annualDividendAfterTaxKrw)],
    ["원화 기준 세전 월 배당금", formatKrw(result.monthlyDividendBeforeTaxKrw)],
    ["원화 기준 세후 월 배당금", formatKrw(result.monthlyDividendAfterTaxKrw)],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-slate-950">예상 배당금</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div className="rounded-md bg-slate-50 p-4" key={label}>
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="mt-1 text-xl font-bold text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
