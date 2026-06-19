import type { ETFDividendInfo } from "../domain/etf/etfTypes";

// 투자 판단용 실시간 데이터가 아닙니다. 모든 수치는 초기값이며 추후 검증 필요합니다.
export const etfData: ETFDividendInfo[] = [
  {
    ticker: "SCHD",
    name: "Schwab U.S. Dividend Equity ETF",
    issuer: "Charles Schwab",
    category: "DividendGrowth",
    dividendYieldPercent: 3.5, // 초기값이며 추후 검증 필요
    expenseRatioPercent: 0.06, // 초기값이며 추후 검증 필요
    payoutCycle: "Quarterly",
    riskLevel: "Medium",
    description:
      "미국 배당 성장주에 투자하는 ETF로, 상대적으로 낮은 운용보수와 배당 성장 성격을 가진 상품입니다.",
    strengths: ["배당 성장 성격", "상대적으로 낮은 운용보수", "장기 투자에 적합"],
    weaknesses: ["고배당 인컴 ETF 대비 분배율이 낮을 수 있음", "시장 하락 위험 존재"],
    suitableFor: ["장기 배당 성장 투자자", "낮은 비용을 선호하는 투자자"],
  },
  {
    ticker: "JEPI",
    name: "JPMorgan Equity Premium Income ETF",
    issuer: "J.P. Morgan",
    category: "CoveredCall",
    dividendYieldPercent: 7.5, // 초기값이며 추후 검증 필요
    expenseRatioPercent: 0.35, // 초기값이며 추후 검증 필요
    payoutCycle: "Monthly",
    riskLevel: "Medium",
    description:
      "커버드콜 기반 인컴 ETF로 월배당 성격이 강하며 높은 현금흐름을 원하는 투자자에게 적합합니다.",
    strengths: ["월배당 성격", "상대적으로 높은 배당수익률", "인컴 투자에 적합"],
    weaknesses: ["상승장 수익률 제한 가능성", "옵션 전략 이해 필요"],
    suitableFor: ["월 현금흐름을 원하는 투자자", "높은 배당수익률을 원하는 투자자"],
  },
  {
    ticker: "JEPQ",
    name: "JPMorgan Nasdaq Equity Premium Income ETF",
    issuer: "J.P. Morgan",
    category: "CoveredCall",
    dividendYieldPercent: 9.0, // 초기값이며 추후 검증 필요
    expenseRatioPercent: 0.35, // 초기값이며 추후 검증 필요
    payoutCycle: "Monthly",
    riskLevel: "High",
    description:
      "나스닥 기반 커버드콜 ETF로 기술주 노출과 월배당 인컴 성격을 함께 제공합니다.",
    strengths: ["월배당 성격", "기술주 기반 인컴", "높은 분배율 추구"],
    weaknesses: ["성장주 변동성 영향", "상승장 수익률 제한 가능성"],
    suitableFor: ["기술주 기반 인컴 투자자", "높은 월분배금을 원하는 투자자"],
  },
  {
    ticker: "QQQI",
    name: "NEOS Nasdaq 100 High Income ETF",
    issuer: "NEOS",
    category: "CoveredCall",
    dividendYieldPercent: 12.0, // 초기값이며 추후 검증 필요
    expenseRatioPercent: 0.68, // 초기값이며 추후 검증 필요
    payoutCycle: "Monthly",
    riskLevel: "High",
    description:
      "나스닥 기반 고배당 또는 옵션 인컴 성격 ETF로 높은 분배율을 추구합니다.",
    strengths: ["월배당 성격", "높은 분배율 추구", "나스닥 기반 인컴 전략"],
    weaknesses: ["초기 데이터 검증 필요", "옵션 전략과 기술주 변동성 위험"],
    suitableFor: ["높은 분배율을 추구하는 투자자", "나스닥 기반 인컴 투자자"],
  },
  {
    ticker: "QYLD",
    name: "Global X Nasdaq 100 Covered Call ETF",
    issuer: "Global X",
    category: "CoveredCall",
    dividendYieldPercent: 11.0, // 초기값이며 추후 검증 필요
    expenseRatioPercent: 0.60, // 초기값이며 추후 검증 필요
    payoutCycle: "Monthly",
    riskLevel: "High",
    description:
      "나스닥 100 커버드콜 ETF로 월배당 성격과 높은 분배율을 추구하는 상품입니다.",
    strengths: ["월배당 성격", "높은 분배율 추구", "나스닥 100 기반"],
    weaknesses: ["장기 가격 상승 제한 가능성", "옵션 전략에 따른 기회비용"],
    suitableFor: ["높은 분배율을 추구하는 투자자", "월배당 ETF 선호 투자자"],
  },
];
