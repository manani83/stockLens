import type { ETFDividendInfo } from "@/domain/etf/etfTypes";

export type ComparePair = {
  firstTicker: string;
  secondTicker: string;
};

export type ETFComparison = {
  first: ETFDividendInfo;
  second: ETFDividendInfo;
  higherDividendYieldTicker?: string;
  lowerExpenseRatioTicker?: string;
  monthlyDividendTickers: string[];
  highRiskTickers: string[];
};
