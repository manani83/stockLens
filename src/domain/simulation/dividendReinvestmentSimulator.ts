import { normalizePercent } from "../dividend/dividendCalculator";
import type {
  DividendSimulationInput,
  DividendSimulationResult,
  DividendSimulationYearResult,
} from "./simulationTypes";

function validateSimulationInput(input: DividendSimulationInput): void {
  if (input.initialInvestmentKrw < 0) {
    throw new Error("초기 투자금은 0 이상이어야 합니다.");
  }

  if (input.monthlyContributionKrw < 0) {
    throw new Error("월 추가 투자금은 0 이상이어야 합니다.");
  }

  if (input.exchangeRate <= 0) {
    throw new Error("환율은 0보다 커야 합니다.");
  }

  if (input.dividendYieldPercent < 0) {
    throw new Error("배당률은 0 이상이어야 합니다.");
  }

  if (input.annualGrowthRatePercent <= -100) {
    throw new Error("예상 성장률은 -100보다 커야 합니다.");
  }

  if (input.taxRatePercent < 0 || input.taxRatePercent > 100) {
    throw new Error("세율은 0 이상 100 이하이어야 합니다.");
  }

  if (input.years < 1 || input.years > 40) {
    throw new Error("투자 기간은 1 이상 40 이하이어야 합니다.");
  }
}

export function simulateDividendReinvestment(
  input: DividendSimulationInput,
): DividendSimulationResult {
  validateSimulationInput(input);

  const dividendYieldDecimal = normalizePercent(input.dividendYieldPercent);
  const annualGrowthRateDecimal = normalizePercent(input.annualGrowthRatePercent);
  const taxRateDecimal = normalizePercent(input.taxRatePercent);
  const yearlyContributionKrw = input.monthlyContributionKrw * 12;
  const yearlyResults: DividendSimulationYearResult[] = [];
  let beginningBalanceKrw = input.initialInvestmentKrw;
  let totalDividendBeforeTaxKrw = 0;
  let totalDividendAfterTaxKrw = 0;

  for (let year = 1; year <= input.years; year += 1) {
    const dividendBaseKrw = beginningBalanceKrw + yearlyContributionKrw;
    const yearlyDividendBeforeTaxKrw = dividendBaseKrw * dividendYieldDecimal;
    const yearlyDividendAfterTaxKrw =
      yearlyDividendBeforeTaxKrw * (1 - taxRateDecimal);
    const reinvestedDividendKrw = input.reinvestDividends
      ? yearlyDividendAfterTaxKrw
      : 0;
    const growthBaseKrw =
      beginningBalanceKrw + yearlyContributionKrw + reinvestedDividendKrw;
    const growthAmountKrw = growthBaseKrw * annualGrowthRateDecimal;
    const endingBalanceKrw = growthBaseKrw + growthAmountKrw;
    const estimatedMonthlyDividendAfterTaxKrw =
      (endingBalanceKrw * dividendYieldDecimal * (1 - taxRateDecimal)) / 12;

    totalDividendBeforeTaxKrw += yearlyDividendBeforeTaxKrw;
    totalDividendAfterTaxKrw += yearlyDividendAfterTaxKrw;

    yearlyResults.push({
      year,
      beginningBalanceKrw,
      yearlyContributionKrw,
      yearlyDividendBeforeTaxKrw,
      yearlyDividendAfterTaxKrw,
      reinvestedDividendKrw,
      growthAmountKrw,
      endingBalanceKrw,
      estimatedMonthlyDividendAfterTaxKrw,
    });

    beginningBalanceKrw = endingBalanceKrw;
  }

  const finalYear = yearlyResults[yearlyResults.length - 1];

  return {
    input,
    yearlyResults,
    totalContributionKrw:
      input.initialInvestmentKrw + yearlyContributionKrw * input.years,
    totalDividendBeforeTaxKrw,
    totalDividendAfterTaxKrw,
    finalBalanceKrw: finalYear.endingBalanceKrw,
    finalEstimatedMonthlyDividendAfterTaxKrw:
      finalYear.estimatedMonthlyDividendAfterTaxKrw,
  };
}
