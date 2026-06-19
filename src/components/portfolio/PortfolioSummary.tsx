"use client";

import { useEffect, useState } from "react";
import { calculatePortfolioSummary } from "@/domain/portfolio/portfolioService";
import type { PortfolioSummaryResult } from "@/domain/portfolio/portfolioTypes";
import { formatKrw } from "@/lib/format";
import { PORTFOLIO_UPDATED_EVENT } from "./PortfolioForm";

type PortfolioSummaryProps = {
  exchangeRate: number;
  taxRatePercent: number;
};

const emptySummary: PortfolioSummaryResult = {
  totalInvestmentKrw: 0,
  estimatedAnnualDividendBeforeTaxKrw: 0,
  estimatedAnnualDividendAfterTaxKrw: 0,
  estimatedMonthlyDividendBeforeTaxKrw: 0,
  estimatedMonthlyDividendAfterTaxKrw: 0,
  holdingCount: 0,
};

export function PortfolioSummary({
  exchangeRate,
  taxRatePercent,
}: PortfolioSummaryProps) {
  const [summary, setSummary] = useState<PortfolioSummaryResult>(emptySummary);

  useEffect(() => {
    function refreshSummary() {
      setSummary(calculatePortfolioSummary(exchangeRate, taxRatePercent));
    }

    queueMicrotask(refreshSummary);
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, refreshSummary);
    window.addEventListener("storage", refreshSummary);

    return () => {
      window.removeEventListener(PORTFOLIO_UPDATED_EVENT, refreshSummary);
      window.removeEventListener("storage", refreshSummary);
    };
  }, [exchangeRate, taxRatePercent]);

  const items = [
    ["총 투자금", formatKrw(summary.totalInvestmentKrw)],
    ["예상 세전 연 배당금", formatKrw(summary.estimatedAnnualDividendBeforeTaxKrw)],
    ["예상 세후 연 배당금", formatKrw(summary.estimatedAnnualDividendAfterTaxKrw)],
    ["예상 세전 월 배당금", formatKrw(summary.estimatedMonthlyDividendBeforeTaxKrw)],
    ["예상 세후 월 배당금", formatKrw(summary.estimatedMonthlyDividendAfterTaxKrw)],
    ["보유 ETF 수", `${summary.holdingCount}개`],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">포트폴리오 요약</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <div className="rounded-md bg-slate-50 p-4" key={label}>
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="mt-1 text-lg font-bold text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
