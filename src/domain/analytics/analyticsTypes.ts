export type AnalyticsEventName =
  | "DividendCalculated"
  | "ETFViewed"
  | "WatchlistAdded"
  | "WatchlistRemoved"
  | "ETFCompared"
  | "RankingViewed"
  | "SimulationCalculated"
  | "CalendarViewed"
  | "AlertRuleCreated"
  | "PortfolioHoldingAdded"
  | "BackupExported"
  | "BackupImported"
  | "AffiliateBoxViewed"
  | "AdPlaceholderViewed";

export type AnalyticsEventPayload = {
  ticker?: string;
  tickerA?: string;
  tickerB?: string;
  page?: string;
  value?: number;
  category?: string;
  label?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type AnalyticsProvider = "None" | "GA4" | "GTM" | "Custom";
