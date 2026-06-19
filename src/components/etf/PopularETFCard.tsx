import Link from "next/link";
import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { formatPercent } from "@/lib/format";
import { AddToWatchlistButton } from "../watchlist";

type PopularETFCardProps = {
  etf: ETFDividendInfo;
};

export function PopularETFCard({ etf }: PopularETFCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{etf.ticker}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{etf.name}</p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-800">
          {formatPercent(etf.dividendYieldPercent)}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">배당주기</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.payoutCycle}</dd>
        </div>
        <div>
          <dt className="text-slate-500">카테고리</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.category}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          href={`/etf/${etf.ticker.toLowerCase()}`}
        >
          상세 보기
        </Link>
        <AddToWatchlistButton ticker={etf.ticker} />
      </div>
    </article>
  );
}
