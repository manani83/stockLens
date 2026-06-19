import {
  clearWatchlistStorage,
  getWatchlistItems,
  saveWatchlistItems,
} from "./watchlistStorage";
import type { WatchlistActionResult, WatchlistItem } from "./watchlistTypes";

function normalizeTicker(ticker: string): string {
  return ticker.trim().toUpperCase();
}

export { getWatchlistItems, saveWatchlistItems };

export function addWatchlistItem(
  ticker: string,
  memo?: string,
): WatchlistActionResult {
  const normalizedTicker = normalizeTicker(ticker);

  if (!normalizedTicker) {
    return {
      success: false,
      message: "티커를 입력해주세요.",
      items: getWatchlistItems(),
    };
  }

  const items = getWatchlistItems();

  if (items.some((item) => normalizeTicker(item.ticker) === normalizedTicker)) {
    return {
      success: false,
      message: "이미 관심종목에 추가된 티커입니다.",
      items,
    };
  }

  const nextItems: WatchlistItem[] = [
    ...items,
    {
      ticker: normalizedTicker,
      addedAt: new Date().toISOString(),
      ...(memo ? { memo } : {}),
    },
  ];

  saveWatchlistItems(nextItems);

  return {
    success: true,
    message: "관심종목에 추가했습니다.",
    items: nextItems,
  };
}

export function removeWatchlistItem(ticker: string): WatchlistActionResult {
  const normalizedTicker = normalizeTicker(ticker);
  const items = getWatchlistItems();
  const nextItems = items.filter(
    (item) => normalizeTicker(item.ticker) !== normalizedTicker,
  );

  if (nextItems.length === items.length) {
    return {
      success: false,
      message: "관심종목에 없는 티커입니다.",
      items,
    };
  }

  saveWatchlistItems(nextItems);

  return {
    success: true,
    message: "관심종목에서 삭제했습니다.",
    items: nextItems,
  };
}

export function isWatchlisted(ticker: string): boolean {
  const normalizedTicker = normalizeTicker(ticker);

  return getWatchlistItems().some(
    (item) => normalizeTicker(item.ticker) === normalizedTicker,
  );
}

export function clearWatchlist(): void {
  clearWatchlistStorage();
}
