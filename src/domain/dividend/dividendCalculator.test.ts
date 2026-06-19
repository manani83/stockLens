import { describe, expect, it } from "vitest";
import {
  calculateDividend,
  normalizePercent,
  validateDividendInput,
} from "./dividendCalculator";
import type { DividendInput } from "./dividendTypes";

const baseInput: DividendInput = {
  investmentKrw: 10_000_000,
  exchangeRate: 1350,
  dividendYieldPercent: 5,
  taxRatePercent: 15,
};

describe("calculateDividend", () => {
  it("TC-001 기본 배당 계산", () => {
    const result = calculateDividend(baseInput);

    expect(result.investmentUsd).toBeCloseTo(7407.407407, 5);
    expect(result.annualDividendBeforeTaxUsd).toBeCloseTo(370.37037, 5);
    expect(result.annualDividendAfterTaxUsd).toBeCloseTo(314.814814, 5);
    expect(result.monthlyDividendBeforeTaxUsd).toBeCloseTo(30.864197, 5);
    expect(result.monthlyDividendAfterTaxUsd).toBeCloseTo(26.234568, 5);
    expect(result.annualDividendBeforeTaxKrw).toBeCloseTo(500_000, 5);
    expect(result.annualDividendAfterTaxKrw).toBeCloseTo(425_000, 5);
    expect(result.monthlyDividendBeforeTaxKrw).toBeCloseTo(41_666.666667, 5);
    expect(result.monthlyDividendAfterTaxKrw).toBeCloseTo(35_416.666667, 5);
  });

  it("TC-002 배당률 0%에서는 투자금만 달러로 환산하고 배당금은 0으로 계산한다", () => {
    const result = calculateDividend({
      ...baseInput,
      dividendYieldPercent: 0,
    });

    expect(result.investmentUsd).toBeCloseTo(7407.407407, 6);
    expect(result.annualDividendBeforeTaxUsd).toBe(0);
    expect(result.annualDividendAfterTaxUsd).toBe(0);
    expect(result.monthlyDividendBeforeTaxUsd).toBe(0);
    expect(result.monthlyDividendAfterTaxUsd).toBe(0);
    expect(result.annualDividendBeforeTaxKrw).toBe(0);
    expect(result.annualDividendAfterTaxKrw).toBe(0);
    expect(result.monthlyDividendBeforeTaxKrw).toBe(0);
    expect(result.monthlyDividendAfterTaxKrw).toBe(0);
  });

  it("TC-003 세율 0%에서는 세전 배당금과 세후 배당금이 같다", () => {
    const result = calculateDividend({
      ...baseInput,
      taxRatePercent: 0,
    });

    expect(result.annualDividendAfterTaxUsd).toBe(result.annualDividendBeforeTaxUsd);
    expect(result.monthlyDividendAfterTaxUsd).toBe(result.monthlyDividendBeforeTaxUsd);
    expect(result.annualDividendAfterTaxKrw).toBe(result.annualDividendBeforeTaxKrw);
    expect(result.monthlyDividendAfterTaxKrw).toBe(result.monthlyDividendBeforeTaxKrw);
  });

  it("TC-004 투자금 0원 오류를 반환하고 계산 시 Error를 발생시킨다", () => {
    const input = { ...baseInput, investmentKrw: 0 };

    expect(validateDividendInput(input)).toEqual([
      { field: "investmentKrw", message: "투자금은 0보다 커야 합니다." },
    ]);
    expect(() => calculateDividend(input)).toThrow("투자금은 0보다 커야 합니다.");
  });

  it("TC-005 환율 0원 오류를 반환하고 계산 시 Error를 발생시킨다", () => {
    const input = { ...baseInput, exchangeRate: 0 };

    expect(validateDividendInput(input)).toEqual([
      { field: "exchangeRate", message: "환율은 0보다 커야 합니다." },
    ]);
    expect(() => calculateDividend(input)).toThrow("환율은 0보다 커야 합니다.");
  });

  it("TC-006 음수 배당률 오류를 반환하고 계산 시 Error를 발생시킨다", () => {
    const input = { ...baseInput, dividendYieldPercent: -1 };

    expect(validateDividendInput(input)).toEqual([
      { field: "dividendYieldPercent", message: "배당률은 0 이상이어야 합니다." },
    ]);
    expect(() => calculateDividend(input)).toThrow("배당률은 0 이상이어야 합니다.");
  });

  it("TC-007 세율 100 초과 오류를 반환하고 계산 시 Error를 발생시킨다", () => {
    const input = { ...baseInput, taxRatePercent: 101 };

    expect(validateDividendInput(input)).toEqual([
      { field: "taxRatePercent", message: "세율은 0 이상 100 이하이어야 합니다." },
    ]);
    expect(() => calculateDividend(input)).toThrow("세율은 0 이상 100 이하이어야 합니다.");
  });
});

describe("normalizePercent", () => {
  it.each([
    [5, 0.05],
    [15, 0.15],
    [0, 0],
    [100, 1],
  ])("TC-008 %s를 %s로 변환한다", (input, expected) => {
    expect(normalizePercent(input)).toBe(expected);
  });
});
