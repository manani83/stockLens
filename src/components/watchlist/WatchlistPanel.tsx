"use client";

import { useEffect, useState } from "react";
import { getEtfByTicker } from "@/domain/etf/etfRepository";
import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import { getWatchlistItems } from "@/domain/watchlist/watchlistService";
import { WATCHLIST_UPDATED_EVENT } from "./AddToWatchlistButton";
import { EmptyWatchlist } from "./EmptyWatchlist";
import { WatchlistItemCard } from "./WatchlistItemCard";

function readWatchlistEtfs(): ETFDividendInfo[] {
  return getWatchlistItems()
    .map((item) => getEtfByTicker(item.ticker))
    .filter((etf): etf is ETFDividendInfo => Boolean(etf));
}

export function WatchlistPanel() {
  const [items, setItems] = useState<ETFDividendInfo[]>([]);

  useEffect(() => {
    function refreshItems() {
      setItems(readWatchlistEtfs());
    }

    refreshItems();
    window.addEventListener(WATCHLIST_UPDATED_EVENT, refreshItems);
    window.addEventListener("storage", refreshItems);

    return () => {
      window.removeEventListener(WATCHLIST_UPDATED_EVENT, refreshItems);
      window.removeEventListener("storage", refreshItems);
    };
  }, []);

  if (items.length === 0) {
    return <EmptyWatchlist />;
  }

  return (
    <div className="grid gap-4">
      {items.map((etf) => (
        <WatchlistItemCard etf={etf} key={etf.ticker} />
      ))}
    </div>
  );
}
