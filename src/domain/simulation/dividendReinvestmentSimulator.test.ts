import { describe, expect, it } from "vitest";
import { simulateDividendReinvestment } from "./dividendReinvestmentSimulator";
import type { DividendSimulationInput } from "./simulationTypes";

const baseInput: DividendSimulationInput = {
  initialInvestmentKrw: 10_000_000,
  monthlyContributionKrw: 500_000,
  exchangeRate: 1350,
  dividendYieldPercent: 5,
  annualGrowthRatePercent: 3,
  taxRatePercent: 15,
  years: 10,
  reinvestDividends: true,
};

describe("simulateDividendReinvestment", () => {
  it("10년 시뮬레이션 결과가 10개 연도 결과를 반환한다", () => {
    const result = simulateDividendReinvestment(baseInput);

    expect(result.yearlyResults).toHaveLength(10);
    expect(result.yearlyResults[0].year).toBe(1);
    expect(result.yearlyResults[9].year).toBe(10);
  });

  it("배당 재투자 true일 때 reinvestedDividendKrw가 0보다 크다", () => {
    const result = simulateDividendReinvestment({
      ...baseInput,
      reinvestDividends: true,
    });

    expect(result.yearlyResults[0].reinvestedDividendKrw).toBeGreaterThan(0);
  });

  it("배당 재투자 false일 때 reinvestedDividendKrw가 0이다", () => {
    const result = simulateDividendReinvestment({
      ...baseInput,
      reinvestDividends: false,
    });

    expect(result.yearlyResults.every((year) => year.reinvestedDividendKrw === 0)).toBe(true);
  });

  it("월 추가 투자금이 누적 투자금에 반영된다", () => {
    const result = simulateDividendReinvestment(baseInput);

    expect(result.totalContributionKrw).toBe(70_000_000);
  });

  it("최종 예상 월 배당금이 계산된다", () => {
    const result = simulateDividendReinvestment(baseInput);

    expect(result.finalEstimatedMonthlyDividendAfterTaxKrw).toBeGreaterThan(0);
  });

  it("잘못된 years 입력 시 오류가 발생한다", () => {
    expect(() =>
      simulateDividendReinvestment({
        ...baseInput,
        years: 41,
      }),
    ).toThrow("투자 기간은 1 이상 40 이하이어야 합니다.");
  });

  it("잘못된 exchangeRate 입력 시 오류가 발생한다", () => {
    expect(() =>
      simulateDividendReinvestment({
        ...baseInput,
        exchangeRate: 0,
      }),
    ).toThrow("환율은 0보다 커야 합니다.");
  });

  it("annualGrowthRatePercent가 음수인 경우도 계산 가능하다", () => {
    const result = simulateDividendReinvestment({
      ...baseInput,
      annualGrowthRatePercent: -5,
    });

    expect(result.yearlyResults).toHaveLength(10);
    expect(result.finalBalanceKrw).toBeGreaterThan(0);
  });
});
