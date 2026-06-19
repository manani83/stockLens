import { describe, expect, it } from "vitest";
import { getAllEtfs } from "../etf/etfRepository";
import {
  filterEtfsByCategory,
  filterEtfsByRiskLevel,
  filterHighDividendEtfs,
  filterMonthlyDividendEtfs,
  sortEtfsByDividendYield,
  sortEtfsByExpenseRatio,
} from "./rankingService";

describe("rankingService", () => {
  const etfs = getAllEtfs();

  it("배당률 내림차순 정렬", () => {
    const sorted = sortEtfsByDividendYield(etfs);

    expect(sorted[0].dividendYieldPercent).toBeGreaterThanOrEqual(
      sorted[1].dividendYieldPercent,
    );
  });

  it("운용보수 오름차순 정렬", () => {
    const sorted = sortEtfsByExpenseRatio(etfs);

    expect(sorted[0].expenseRatioPercent).toBeLessThanOrEqual(
      sorted[1].expenseRatioPercent,
    );
  });

  it("월배당 ETF 필터", () => {
    expect(filterMonthlyDividendEtfs(etfs).every((etf) => etf.payoutCycle === "Monthly")).toBe(true);
  });

  it("카테고리 필터", () => {
    expect(filterEtfsByCategory(etfs, "CoveredCall").every((etf) => etf.category === "CoveredCall")).toBe(true);
  });

  it("위험도 필터", () => {
    expect(filterEtfsByRiskLevel(etfs, "High").every((etf) => etf.riskLevel === "High")).toBe(true);
  });

  it("최소 배당률 필터", () => {
    expect(filterHighDividendEtfs(etfs, 8).every((etf) => etf.dividendYieldPercent >= 8)).toBe(true);
  });
});
