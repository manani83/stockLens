const SITE_NAME = "Dividend Lab Korea";

export function buildPageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

export function buildEtfMetaTitle(ticker: string): string {
  return `${ticker.toUpperCase()} 배당금 계산기 | ${SITE_NAME}`;
}

export function buildEtfMetaDescription(ticker: string, name: string): string {
  return `${ticker.toUpperCase()} ETF(${name})의 배당률, 운용보수, 배당주기와 예상 세후 월 배당금을 원화 기준으로 계산해보세요.`;
}

export function buildCompareMetaTitle(tickerA: string, tickerB: string): string {
  return `${tickerA.toUpperCase()} vs ${tickerB.toUpperCase()} 비교 | ${SITE_NAME}`;
}

export function buildCompareMetaDescription(tickerA: string, tickerB: string): string {
  return `${tickerA.toUpperCase()}와 ${tickerB.toUpperCase()}의 배당률, 운용보수, 배당주기, 투자 성격을 비교해보세요.`;
}
