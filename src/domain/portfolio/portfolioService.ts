import { getEtfByTicker } from "../etf/etfRepository";
import {
  clearPortfolio,
  getPortfolioHoldings,
  savePortfolioHoldings,
} from "./portfolioStorage";
import type {
  PortfolioActionResult,
  PortfolioHolding,
  PortfolioInput,
  PortfolioSummaryResult,
} from "./portfolioTypes";

function normalizeTicker(ticker: string): string {
  return ticker.trim().toUpperCase();
}

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `portfolio-${Date.now()}`;
}

function getInvestmentKrw(
  holding: Pick<PortfolioHolding, "investmentKrw" | "quantity" | "averagePriceUsd">,
  exchangeRate: number,
): number {
  if (holding.investmentKrw && holding.investmentKrw > 0) {
    return holding.investmentKrw;
  }

  if (holding.quantity && holding.averagePriceUsd) {
    return holding.quantity * holding.averagePriceUsd * exchangeRate;
  }

  return 0;
}

export { clearPortfolio, getPortfolioHoldings, savePortfolioHoldings };

export function validatePortfolioInput(input: PortfolioInput): string[] {
  const errors: string[] = [];
  const normalizedTicker = normalizeTicker(input.ticker);

  if (!normalizedTicker) {
    errors.push("티커를 선택해주세요.");
  } else if (!getEtfByTicker(normalizedTicker)) {
    errors.push("지원하지 않는 ETF 티커입니다.");
  }

  if (input.investmentKrw !== undefined && input.investmentKrw <= 0) {
    errors.push("투자금은 0보다 커야 합니다.");
  }

  if (input.quantity !== undefined && input.quantity <= 0) {
    errors.push("수량은 0보다 커야 합니다.");
  }

  if (input.averagePriceUsd !== undefined && input.averagePriceUsd <= 0) {
    errors.push("평균단가는 0보다 커야 합니다.");
  }

  if (!input.investmentKrw && (!input.quantity || !input.averagePriceUsd)) {
    errors.push("투자금 또는 수량과 평균단가를 입력해주세요.");
  }

  return errors;
}

export function addPortfolioHolding(input: PortfolioInput): PortfolioActionResult {
  const errors = validatePortfolioInput(input);
  const holdings = getPortfolioHoldings();

  if (errors.length > 0) {
    return {
      success: false,
      message: errors.join(" "),
      holdings,
    };
  }

  const now = new Date().toISOString();
  const nextHoldings: PortfolioHolding[] = [
    ...holdings,
    {
      id: createId(),
      ticker: normalizeTicker(input.ticker),
      quantity: input.quantity,
      averagePriceUsd: input.averagePriceUsd,
      investmentKrw: input.investmentKrw,
      memo: input.memo,
      createdAt: now,
      updatedAt: now,
    },
  ];

  savePortfolioHoldings(nextHoldings);

  return {
    success: true,
    message: "포트폴리오에 추가했습니다.",
    holdings: nextHoldings,
  };
}

export function removePortfolioHolding(id: string): PortfolioActionResult {
  const holdings = getPortfolioHoldings();
  const nextHoldings = holdings.filter((holding) => holding.id !== id);

  if (nextHoldings.length === holdings.length) {
    return {
      success: false,
      message: "삭제할 보유 항목을 찾을 수 없습니다.",
      holdings,
    };
  }

  savePortfolioHoldings(nextHoldings);

  return {
    success: true,
    message: "보유 항목을 삭제했습니다.",
    holdings: nextHoldings,
  };
}

export function updatePortfolioHolding(
  id: string,
  input: Partial<PortfolioInput>,
): PortfolioActionResult {
  const holdings = getPortfolioHoldings();
  let found = false;
  const nextHoldings = holdings.map((holding) => {
    if (holding.id !== id) {
      return holding;
    }

    found = true;
    return {
      ...holding,
      ...input,
      ticker: input.ticker ? normalizeTicker(input.ticker) : holding.ticker,
      updatedAt: new Date().toISOString(),
    };
  });

  if (!found) {
    return {
      success: false,
      message: "수정할 보유 항목을 찾을 수 없습니다.",
      holdings,
    };
  }

  savePortfolioHoldings(nextHoldings);

  return {
    success: true,
    message: "보유 항목을 수정했습니다.",
    holdings: nextHoldings,
  };
}

export function calculatePortfolioSummary(
  exchangeRate: number,
  taxRatePercent: number,
): PortfolioSummaryResult {
  const holdings = getPortfolioHoldings();
  const taxRate = taxRatePercent / 100;

  const totals = holdings.reduce(
    (summary, holding) => {
      const etf = getEtfByTicker(holding.ticker);
      const investmentKrw = getInvestmentKrw(holding, exchangeRate);
      const annualDividendBeforeTaxKrw =
        investmentKrw * ((etf?.dividendYieldPercent ?? 0) / 100);

      return {
        totalInvestmentKrw: summary.totalInvestmentKrw + investmentKrw,
        estimatedAnnualDividendBeforeTaxKrw:
          summary.estimatedAnnualDividendBeforeTaxKrw + annualDividendBeforeTaxKrw,
      };
    },
    {
      totalInvestmentKrw: 0,
      estimatedAnnualDividendBeforeTaxKrw: 0,
    },
  );

  const estimatedAnnualDividendAfterTaxKrw =
    totals.estimatedAnnualDividendBeforeTaxKrw * (1 - taxRate);

  return {
    totalInvestmentKrw: totals.totalInvestmentKrw,
    estimatedAnnualDividendBeforeTaxKrw:
      totals.estimatedAnnualDividendBeforeTaxKrw,
    estimatedAnnualDividendAfterTaxKrw,
    estimatedMonthlyDividendBeforeTaxKrw:
      totals.estimatedAnnualDividendBeforeTaxKrw / 12,
    estimatedMonthlyDividendAfterTaxKrw:
      estimatedAnnualDividendAfterTaxKrw / 12,
    holdingCount: holdings.length,
  };
}
