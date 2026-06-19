import type { ETFDividendInfo } from "@/domain/etf/etfTypes";
import type { ComparePair, ETFComparison } from "./compareTypes";

function formatTicker(ticker: string): string {
  return ticker.trim().toUpperCase();
}

function pickHigherDividendYield(first: ETFDividendInfo, second: ETFDividendInfo): string | undefined {
  if (first.dividendYieldPercent === second.dividendYieldPercent) {
    return undefined;
  }

  return first.dividendYieldPercent > second.dividendYieldPercent
    ? first.ticker
    : second.ticker;
}

function pickLowerExpenseRatio(first: ETFDividendInfo, second: ETFDividendInfo): string | undefined {
  if (first.expenseRatioPercent === second.expenseRatioPercent) {
    return undefined;
  }

  return first.expenseRatioPercent < second.expenseRatioPercent
    ? first.ticker
    : second.ticker;
}

export function parseComparePair(pair: string): ComparePair | undefined {
  const [firstTicker, secondTicker, extra] = pair.split("-vs-");

  if (!firstTicker || !secondTicker || extra) {
    return undefined;
  }

  return {
    firstTicker: formatTicker(firstTicker),
    secondTicker: formatTicker(secondTicker),
  };
}

export function compareEtfs(
  first: ETFDividendInfo,
  second: ETFDividendInfo,
): ETFComparison {
  return {
    first,
    second,
    higherDividendYieldTicker: pickHigherDividendYield(first, second),
    lowerExpenseRatioTicker: pickLowerExpenseRatio(first, second),
    monthlyDividendTickers: [first, second]
      .filter((etf) => etf.payoutCycle === "Monthly")
      .map((etf) => etf.ticker),
    highRiskTickers: [first, second]
      .filter((etf) => etf.riskLevel === "High")
      .map((etf) => etf.ticker),
  };
}

export function buildCompareSummary(comparison: ETFComparison): string {
  const { first, second } = comparison;
  const dividendText = comparison.higherDividendYieldTicker
    ? `배당률만 보면 ${comparison.higherDividendYieldTicker}가 더 높습니다.`
    : "두 ETF의 배당률은 같습니다.";
  const expenseText = comparison.lowerExpenseRatioTicker
    ? `운용보수는 ${comparison.lowerExpenseRatioTicker}가 더 낮습니다.`
    : "두 ETF의 운용보수는 같습니다.";
  const monthlyText =
    comparison.monthlyDividendTickers.length > 0
      ? `${comparison.monthlyDividendTickers.join(", ")}는 월배당 성격으로 분류됩니다.`
      : "두 ETF 모두 월배당 ETF로 분류되지 않습니다.";
  const riskText =
    comparison.highRiskTickers.length > 0
      ? `${comparison.highRiskTickers.join(", ")}는 High 위험도이므로 변동성에 유의해야 합니다.`
      : "두 ETF 모두 High 위험도로 분류되지 않습니다.";

  return `${first.ticker}는 ${first.category} 성격이고, ${second.ticker}는 ${second.category} 성격입니다. ${dividendText} ${expenseText} ${monthlyText} ${riskText} 이 비교 결과는 단순 참고용입니다.`;
}
