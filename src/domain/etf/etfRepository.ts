import { etfData } from "../../data/etfData";
import type { ETFCategory, ETFDividendInfo } from "./etfTypes";

export function getAllEtfs(): ETFDividendInfo[] {
  return etfData;
}

export function getEtfByTicker(ticker: string): ETFDividendInfo | undefined {
  const normalizedTicker = ticker.trim().toUpperCase();

  return etfData.find((etf) => etf.ticker === normalizedTicker);
}

export function getEtfsByCategory(category: ETFCategory): ETFDividendInfo[] {
  return etfData.filter((etf) => etf.category === category);
}

export function searchEtfs(keyword: string): ETFDividendInfo[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (normalizedKeyword.length === 0) {
    return getAllEtfs();
  }

  return etfData.filter((etf) => {
    return [etf.ticker, etf.name, etf.description].some((value) =>
      value.toLowerCase().includes(normalizedKeyword),
    );
  });
}
