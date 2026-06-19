import type {
  DividendInput,
  DividendResult,
  DividendValidationError,
} from "./dividendTypes";

export function normalizePercent(value: number): number {
  return value / 100;
}

export function validateDividendInput(input: DividendInput): DividendValidationError[] {
  const errors: DividendValidationError[] = [];

  if (input.investmentKrw <= 0) {
    errors.push({
      field: "investmentKrw",
      message: "투자금은 0보다 커야 합니다.",
    });
  }

  if (input.exchangeRate <= 0) {
    errors.push({
      field: "exchangeRate",
      message: "환율은 0보다 커야 합니다.",
    });
  }

  if (input.dividendYieldPercent < 0) {
    errors.push({
      field: "dividendYieldPercent",
      message: "배당률은 0 이상이어야 합니다.",
    });
  }

  if (input.taxRatePercent < 0 || input.taxRatePercent > 100) {
    errors.push({
      field: "taxRatePercent",
      message: "세율은 0 이상 100 이하이어야 합니다.",
    });
  }

  return errors;
}

export function calculateDividend(input: DividendInput): DividendResult {
  const errors = validateDividendInput(input);

  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(" "));
  }

  const dividendYieldDecimal = normalizePercent(input.dividendYieldPercent);
  const taxRateDecimal = normalizePercent(input.taxRatePercent);
  const investmentUsd = input.investmentKrw / input.exchangeRate;
  const annualDividendBeforeTaxUsd = investmentUsd * dividendYieldDecimal;
  const annualDividendAfterTaxUsd =
    annualDividendBeforeTaxUsd * (1 - taxRateDecimal);
  const monthlyDividendBeforeTaxUsd = annualDividendBeforeTaxUsd / 12;
  const monthlyDividendAfterTaxUsd = annualDividendAfterTaxUsd / 12;

  return {
    investmentUsd,
    annualDividendBeforeTaxUsd,
    annualDividendAfterTaxUsd,
    monthlyDividendBeforeTaxUsd,
    monthlyDividendAfterTaxUsd,
    annualDividendBeforeTaxKrw: annualDividendBeforeTaxUsd * input.exchangeRate,
    annualDividendAfterTaxKrw: annualDividendAfterTaxUsd * input.exchangeRate,
    monthlyDividendBeforeTaxKrw: monthlyDividendBeforeTaxUsd * input.exchangeRate,
    monthlyDividendAfterTaxKrw: monthlyDividendAfterTaxUsd * input.exchangeRate,
  };
}
