export type PortfolioHolding = {
  id: string;
  ticker: string;
  quantity?: number;
  averagePriceUsd?: number;
  investmentKrw?: number;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioInput = {
  ticker: string;
  quantity?: number;
  averagePriceUsd?: number;
  investmentKrw?: number;
  memo?: string;
};

export type PortfolioSummaryResult = {
  totalInvestmentKrw: number;
  estimatedAnnualDividendBeforeTaxKrw: number;
  estimatedAnnualDividendAfterTaxKrw: number;
  estimatedMonthlyDividendBeforeTaxKrw: number;
  estimatedMonthlyDividendAfterTaxKrw: number;
  holdingCount: number;
};

export type PortfolioActionResult = {
  success: boolean;
  message?: string;
  holdings?: PortfolioHolding[];
};
