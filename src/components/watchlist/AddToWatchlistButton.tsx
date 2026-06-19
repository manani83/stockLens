"use client";

import { useSyncExternalStore } from "react";
import {
  addWatchlistItem,
  isWatchlisted,
  removeWatchlistItem,
} from "@/domain/watchlist/watchlistService";
import { formatTicker } from "@/lib/format";

export const WATCHLIST_UPDATED_EVENT = "dividend-lab-watchlist-updated";

type AddToWatchlistButtonProps = {
  ticker: string;
};

export function AddToWatchlistButton({ ticker }: AddToWatchlistButtonProps) {
  const formattedTicker = formatTicker(ticker);
  const active = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener(WATCHLIST_UPDATED_EVENT, onStoreChange);
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener(WATCHLIST_UPDATED_EVENT, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    () => isWatchlisted(formattedTicker),
    () => false,
  );

  function handleClick() {
    if (active) {
      removeWatchlistItem(formattedTicker);
    } else {
      addWatchlistItem(formattedTicker);
    }

    window.dispatchEvent(new Event(WATCHLIST_UPDATED_EVENT));
  }

  return (
    <button
      aria-label={`${formattedTicker} ${active ? "관심종목 해제" : "관심종목 추가"}`}
      className={
        active
          ? "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          : "rounded-md border border-teal-700 bg-teal-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-teal-800"
      }
      onClick={handleClick}
      type="button"
    >
      {active ? "관심종목 해제" : "관심종목 추가"}
    </button>
  );
}
