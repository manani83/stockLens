import type { PortfolioHolding } from "./portfolioTypes";

export const PORTFOLIO_STORAGE_KEY = "dividend-lab-portfolio";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getPortfolioHoldings(): PortfolioHolding[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  const rawHoldings = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);

  if (!rawHoldings) {
    return [];
  }

  try {
    const parsedHoldings = JSON.parse(rawHoldings);
    return Array.isArray(parsedHoldings) ? parsedHoldings : [];
  } catch {
    return [];
  }
}

export function savePortfolioHoldings(holdings: PortfolioHolding[]): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(holdings));
}

export function clearPortfolio(): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}
