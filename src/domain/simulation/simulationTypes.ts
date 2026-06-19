export type DividendSimulationInput = {
  initialInvestmentKrw: number;
  monthlyContributionKrw: number;
  exchangeRate: number;
  dividendYieldPercent: number;
  annualGrowthRatePercent: number;
  taxRatePercent: number;
  years: number;
  reinvestDividends: boolean;
};

export type DividendSimulationYearResult = {
  year: number;
  beginningBalanceKrw: number;
  yearlyContributionKrw: number;
  yearlyDividendBeforeTaxKrw: number;
  yearlyDividendAfterTaxKrw: number;
  reinvestedDividendKrw: number;
  growthAmountKrw: number;
  endingBalanceKrw: number;
  estimatedMonthlyDividendAfterTaxKrw: number;
};

export type DividendSimulationResult = {
  input: DividendSimulationInput;
  yearlyResults: DividendSimulationYearResult[];
  totalContributionKrw: number;
  totalDividendBeforeTaxKrw: number;
  totalDividendAfterTaxKrw: number;
  finalBalanceKrw: number;
  finalEstimatedMonthlyDividendAfterTaxKrw: number;
};
