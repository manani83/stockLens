// User-entered values for dividend estimates. Percent fields are stored as percent values, not decimals.
export type DividendInput = {
  investmentKrw: number;
  exchangeRate: number;
  dividendYieldPercent: number;
  taxRatePercent: number;
};

// Calculated dividend result in both USD and KRW, split by annual/monthly and before/after tax.
export type DividendResult = {
  investmentUsd: number;
  annualDividendBeforeTaxUsd: number;
  annualDividendAfterTaxUsd: number;
  monthlyDividendBeforeTaxUsd: number;
  monthlyDividendAfterTaxUsd: number;
  annualDividendBeforeTaxKrw: number;
  annualDividendAfterTaxKrw: number;
  monthlyDividendBeforeTaxKrw: number;
  monthlyDividendAfterTaxKrw: number;
};

// Validation output for invalid calculator inputs.
export type DividendValidationError = {
  field: string;
  message: string;
};
