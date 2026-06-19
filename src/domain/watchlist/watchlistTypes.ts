// A watchlist entry is keyed by ticker and stored in localStorage for the initial MVP.
export type WatchlistItem = {
  ticker: string;
  addedAt: string;
  memo?: string;
};

// Client-side watchlist state.
export type WatchlistState = {
  items: WatchlistItem[];
};

// Standard result shape for add/remove watchlist actions.
export type WatchlistActionResult = {
  success: boolean;
  message?: string;
  items?: WatchlistItem[];
};
