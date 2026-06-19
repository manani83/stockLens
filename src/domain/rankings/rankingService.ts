import type {
  ETFCategory,
  ETFDividendInfo,
  ETFRiskLevel,
} from "@/domain/etf/etfTypes";
import type { RankingFilters } from "./rankingTypes";

export function sortEtfsByDividendYield(etfs: ETFDividendInfo[]): ETFDividendInfo[] {
  return [...etfs].sort(
    (first, second) => second.dividendYieldPercent - first.dividendYieldPercent,
  );
}

export function sortEtfsByExpenseRatio(etfs: ETFDividendInfo[]): ETFDividendInfo[] {
  return [...etfs].sort(
    (first, second) => first.expenseRatioPercent - second.expenseRatioPercent,
  );
}

export function filterMonthlyDividendEtfs(etfs: ETFDividendInfo[]): ETFDividendInfo[] {
  return etfs.filter((etf) => etf.payoutCycle === "Monthly");
}

export function filterEtfsByCategory(
  etfs: ETFDividendInfo[],
  category: ETFCategory,
): ETFDividendInfo[] {
  return etfs.filter((etf) => etf.category === category);
}

export function filterEtfsByRiskLevel(
  etfs: ETFDividendInfo[],
  riskLevel: ETFRiskLevel,
): ETFDividendInfo[] {
  return etfs.filter((etf) => etf.riskLevel === riskLevel);
}

export function filterHighDividendEtfs(
  etfs: ETFDividendInfo[],
  minYieldPercent: number,
): ETFDividendInfo[] {
  return etfs.filter((etf) => etf.dividendYieldPercent >= minYieldPercent);
}

export function applyRankingFilters(
  etfs: ETFDividendInfo[],
  filters: RankingFilters,
): ETFDividendInfo[] {
  return etfs.filter((etf) => {
    const matchesCategory =
      !filters.category || filters.category === "All" || etf.category === filters.category;
    const matchesPayoutCycle =
      !filters.payoutCycle ||
      filters.payoutCycle === "All" ||
      etf.payoutCycle === filters.payoutCycle;
    const matchesRisk =
      !filters.riskLevel || filters.riskLevel === "All" || etf.riskLevel === filters.riskLevel;
    const matchesMinYield =
      filters.minDividendYieldPercent === undefined ||
      etf.dividendYieldPercent >= filters.minDividendYieldPercent;
    const matchesMaxExpense =
      filters.maxExpenseRatioPercent === undefined ||
      etf.expenseRatioPercent <= filters.maxExpenseRatioPercent;

    return (
      matchesCategory &&
      matchesPayoutCycle &&
      matchesRisk &&
      matchesMinYield &&
      matchesMaxExpense
    );
  });
}
