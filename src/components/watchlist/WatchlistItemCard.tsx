"use client";

import Link from "next/link";
import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { removeWatchlistItem } from "@/domain/watchlist/watchlistService";
import { formatPercent } from "@/lib/format";
import { WATCHLIST_UPDATED_EVENT } from "./AddToWatchlistButton";

type WatchlistItemCardProps = {
  etf: ETFDividendInfo;
};

export function WatchlistItemCard({ etf }: WatchlistItemCardProps) {
  function handleRemove() {
    removeWatchlistItem(etf.ticker);
    window.dispatchEvent(new Event(WATCHLIST_UPDATED_EVENT));
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{etf.ticker}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{etf.name}</p>
        </div>
        <div className="flex gap-2">
          <Link
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            href={`/etf/${etf.ticker.toLowerCase()}`}
          >
            상세 보기
          </Link>
          <button
            aria-label={`${etf.ticker} 관심종목 삭제`}
            className="rounded-md border border-rose-300 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-50"
            onClick={handleRemove}
            type="button"
          >
            삭제
          </button>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-slate-500">배당률</dt>
          <dd className="mt-1 font-bold text-slate-950">{formatPercent(etf.dividendYieldPercent)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">배당주기</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.payoutCycle}</dd>
        </div>
        <div>
          <dt className="text-slate-500">카테고리</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.category}</dd>
        </div>
        <div>
          <dt className="text-slate-500">운용사</dt>
          <dd className="mt-1 font-bold text-slate-950">{etf.issuer}</dd>
        </div>
      </dl>
    </article>
  );
}
