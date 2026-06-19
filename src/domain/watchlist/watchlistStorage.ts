import type { WatchlistItem } from "./watchlistTypes";

export const WATCHLIST_STORAGE_KEY = "dividend-lab-watchlist";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getWatchlistItems(): WatchlistItem[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  const rawItems = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);

  if (!rawItems) {
    return [];
  }

  try {
    const parsedItems = JSON.parse(rawItems);
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
}

export function saveWatchlistItems(items: WatchlistItem[]): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
}

export function clearWatchlistStorage(): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(WATCHLIST_STORAGE_KEY);
}
