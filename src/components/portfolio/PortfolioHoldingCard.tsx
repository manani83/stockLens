"use client";

import { getEtfByTicker } from "@/domain/etf/etfRepository";
import type { PortfolioHolding } from "@/domain/portfolio/portfolioTypes";
import { formatKrw, formatNumber, formatPercent, formatUsd } from "@/lib/format";

type PortfolioHoldingCardProps = {
  exchangeRate: number;
  holding: PortfolioHolding;
  onRemove: (id: string) => void;
};

export function PortfolioHoldingCard({
  exchangeRate,
  holding,
  onRemove,
}: PortfolioHoldingCardProps) {
  const etf = getEtfByTicker(holding.ticker);
  const investmentKrw =
    holding.investmentKrw ??
    ((holding.quantity ?? 0) * (holding.averagePriceUsd ?? 0) * exchangeRate);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">{holding.ticker}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">
            {etf?.name ?? "ETF 정보 없음"}
          </h3>
        </div>
        <button
          className="w-fit rounded-md border border-rose-300 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-50"
          onClick={() => onRemove(holding.id)}
          type="button"
        >
          삭제
        </button>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-slate-500">투자금</dt>
          <dd className="mt-1 font-bold text-slate-950">{formatKrw(investmentKrw)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">수량</dt>
          <dd className="mt-1 font-bold text-slate-950">
            {holding.quantity ? formatNumber(holding.quantity) : "-"}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">평균단가</dt>
          <dd className="mt-1 font-bold text-slate-950">
            {holding.averagePriceUsd ? formatUsd(holding.averagePriceUsd) : "-"}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">예상 배당률</dt>
          <dd className="mt-1 font-bold text-slate-950">
            {etf ? formatPercent(etf.dividendYieldPercent) : "-"}
          </dd>
        </div>
      </dl>
      {holding.memo ? (
        <p className="mt-4 text-sm leading-6 text-slate-600">{holding.memo}</p>
      ) : null}
    </article>
  );
}
