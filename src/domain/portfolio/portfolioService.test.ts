import { beforeEach, describe, expect, it } from "vitest";
import {
  addPortfolioHolding,
  calculatePortfolioSummary,
  clearPortfolio,
  getPortfolioHoldings,
  removePortfolioHolding,
  updatePortfolioHolding,
  validatePortfolioInput,
} from "./portfolioService";
import { PORTFOLIO_STORAGE_KEY } from "./portfolioStorage";

function createLocalStorageMock(): Storage {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear: () => {
      store = {};
    },
    getItem: (key: string) => store[key] ?? null,
    key: (index: number) => Object.keys(store)[index] ?? null,
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
}

describe("portfolioService", () => {
  beforeEach(() => {
    const localStorageMock = createLocalStorageMock();

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: localStorageMock,
    });
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: localStorageMock,
      },
    });

    localStorage.clear();
  });

  it("보유 ETF를 추가한다", () => {
    const result = addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 });

    expect(result.success).toBe(true);
    expect(getPortfolioHoldings()).toHaveLength(1);
  });

  it("ticker를 대문자로 저장한다", () => {
    addPortfolioHolding({ ticker: "schd", investmentKrw: 1000000 });

    expect(getPortfolioHoldings()[0]?.ticker).toBe("SCHD");
  });

  it("보유 ETF를 삭제한다", () => {
    const id = addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 })
      .holdings?.[0]?.id;

    const result = removePortfolioHolding(id ?? "");

    expect(result.success).toBe(true);
    expect(getPortfolioHoldings()).toEqual([]);
  });

  it("보유 ETF를 수정한다", () => {
    const id = addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 })
      .holdings?.[0]?.id;

    const result = updatePortfolioHolding(id ?? "", { memo: "장기 보유" });

    expect(result.success).toBe(true);
    expect(getPortfolioHoldings()[0]?.memo).toBe("장기 보유");
  });

  it("investmentKrw 기준으로 포트폴리오 요약을 계산한다", () => {
    addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 });
    const summary = calculatePortfolioSummary(1350, 15);

    expect(summary.totalInvestmentKrw).toBe(1000000);
    expect(summary.estimatedAnnualDividendBeforeTaxKrw).toBe(35000);
    expect(summary.estimatedAnnualDividendAfterTaxKrw).toBe(29750);
  });

  it("quantity와 averagePriceUsd 기준으로 포트폴리오 요약을 계산한다", () => {
    addPortfolioHolding({ ticker: "SCHD", quantity: 10, averagePriceUsd: 70 });
    const summary = calculatePortfolioSummary(1000, 15);

    expect(summary.totalInvestmentKrw).toBe(700000);
    expect(summary.estimatedAnnualDividendBeforeTaxKrw).toBeCloseTo(24500);
  });

  it("잘못된 입력값을 검증한다", () => {
    expect(validatePortfolioInput({ ticker: "", investmentKrw: 1000 })).not.toEqual([]);
    expect(validatePortfolioInput({ ticker: "SCHD", investmentKrw: -1 })).not.toEqual([]);
  });

  it("존재하지 않는 ticker를 검증한다", () => {
    expect(validatePortfolioInput({ ticker: "NOPE", investmentKrw: 1000 })).not.toEqual([]);
  });

  it("localStorage JSON 파싱 오류 시 빈 배열을 반환한다", () => {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, "{bad json");

    expect(getPortfolioHoldings()).toEqual([]);
  });

  it("clearPortfolio가 저장된 포트폴리오를 삭제한다", () => {
    addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 });
    clearPortfolio();

    expect(getPortfolioHoldings()).toEqual([]);
  });
});
