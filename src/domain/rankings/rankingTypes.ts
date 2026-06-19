import type {
  ETFCategory,
  ETFRiskLevel,
  PayoutCycle,
} from "@/domain/etf/etfTypes";

export type RankingFilters = {
  category?: ETFCategory | "All";
  payoutCycle?: PayoutCycle | "All";
  riskLevel?: ETFRiskLevel | "All";
  minDividendYieldPercent?: number;
  maxExpenseRatioPercent?: number;
};
