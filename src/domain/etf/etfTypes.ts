// ETF categories are intentionally coarse for the MVP and can be expanded later.
export type ETFCategory =
  | "DividendGrowth"
  | "CoveredCall"
  | "BroadMarket"
  | "Technology"
  | "Bond"
  | "REIT"
  | "Unknown";

// Dividend payout cadence used for filtering and display.
export type PayoutCycle =
  | "Monthly"
  | "Quarterly"
  | "SemiAnnual"
  | "Annual"
  | "Unknown";

// Simple risk label for MVP cards and detail pages.
export type ETFRiskLevel = "Low" | "Medium" | "High" | "Unknown";

// Static ETF profile shape used by the initial MVP data source.
export type ETFDividendInfo = {
  ticker: string;
  name: string;
  issuer: string;
  category: ETFCategory;
  dividendYieldPercent: number;
  expenseRatioPercent: number;
  payoutCycle: PayoutCycle;
  riskLevel: ETFRiskLevel;
  description: string;
  strengths: string[];
  weaknesses: string[];
  suitableFor: string[];
  dataAsOf?: string;
  dataNote?: string;
};
