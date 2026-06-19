import type { GuideArticle } from "@/domain/content/contentTypes";

export const guideArticles: GuideArticle[] = [
  {
    slug: "how-to-calculate-monthly-dividend",
    title: "월 배당금 계산하는 법",
    description:
      "투자금, 배당률, 세율, 환율을 기준으로 예상 월 배당금을 계산하는 방법을 알아봅니다.",
    category: "DividendBasics",
    keywords: ["월 배당금", "배당 계산", "세후 배당금", "환율"],
    body:
      "월 배당금은 투자금, 예상 배당률, 배당세, 환율을 함께 고려해 계산합니다.\n\n먼저 원화 투자금을 환율로 나누어 달러 기준 투자금을 계산합니다. 이후 예상 배당률을 적용해 연 배당금을 구하고, 12로 나누면 월 배당금 추정치를 확인할 수 있습니다.\n\n세후 금액을 보려면 배당세를 차감해야 합니다. 실제 세금과 환율은 시점에 따라 달라질 수 있으므로 계산 결과는 참고용으로만 활용해야 합니다.\n\nDividend Lab Korea의 배당금 계산기는 이 과정을 빠르게 계산해볼 수 있도록 구성되어 있습니다.",
    relatedSlugs: ["us-dividend-etf-tax-basics", "dividend-reinvestment-basics"],
    createdAt: "2026-06-19",
    updatedAt: "2026-06-19",
  },
  {
    slug: "schd-vs-jepi-guide",
    title: "SCHD와 JEPI 차이 쉽게 보기",
    description:
      "배당성장 ETF와 월배당 인컴 ETF의 차이를 SCHD와 JEPI 예시로 비교합니다.",
    category: "ETFComparison",
    keywords: ["SCHD", "JEPI", "ETF 비교", "월배당", "배당성장"],
    body:
      "SCHD와 JEPI는 모두 미국 배당 ETF로 자주 언급되지만 성격은 다릅니다.\n\nSCHD는 배당 성장 성격을 가진 ETF로 장기 배당 성장과 낮은 비용을 함께 보는 투자자가 비교 대상으로 삼는 경우가 많습니다. JEPI는 월배당과 인컴 성격이 강한 ETF로 현금흐름을 확인하려는 사용자가 자주 살펴봅니다.\n\n두 ETF를 비교할 때는 배당률만 보지 말고 운용보수, 배당주기, 전략, 위험도, 가격 변동 가능성을 함께 확인해야 합니다.\n\n이 글은 특정 ETF 매수 또는 매도를 권유하지 않으며, 실제 투자 전 공식 자료를 확인해야 합니다.",
    relatedSlugs: ["high-dividend-etf-risk", "how-to-calculate-monthly-dividend"],
    createdAt: "2026-06-19",
    updatedAt: "2026-06-19",
  },
  {
    slug: "us-dividend-etf-tax-basics",
    title: "미국 배당 ETF 세금 기본",
    description:
      "미국 배당 ETF 투자 시 알아야 할 배당세와 세후 배당금 계산 방식을 정리합니다.",
    category: "Tax",
    keywords: ["미국 배당 ETF", "배당세", "세후 배당금", "원화 배당"],
    body:
      "미국 배당 ETF의 배당금은 세전 금액과 세후 금액을 구분해 보는 것이 좋습니다.\n\n예상 배당금은 배당률을 기준으로 단순 계산할 수 있지만, 실제로 받는 금액은 세금, 환율, 분배금 정책에 따라 달라질 수 있습니다.\n\n세후 배당금을 계산할 때는 배당세율을 입력하고, 달러 금액을 원화로 환산하는 환율도 함께 고려합니다.\n\n세금 기준은 개인 상황과 제도 변화에 따라 달라질 수 있으므로 세무 전문가 또는 공식 자료 확인이 필요합니다.",
    relatedSlugs: ["how-to-calculate-monthly-dividend", "dividend-reinvestment-basics"],
    createdAt: "2026-06-19",
    updatedAt: "2026-06-19",
  },
  {
    slug: "dividend-reinvestment-basics",
    title: "배당 재투자란 무엇인가",
    description:
      "배당금을 다시 투자할 때 장기 투자 결과가 어떻게 달라질 수 있는지 알아봅니다.",
    category: "Simulation",
    keywords: ["배당 재투자", "복리", "시뮬레이션", "장기 투자"],
    body:
      "배당 재투자는 받은 배당금을 다시 투자금에 더해 장기 결과를 계산하는 방식입니다.\n\n단순 계산에서는 매년 받은 세후 배당금을 다시 투자한다고 가정할 수 있습니다. 이 경우 시간이 길어질수록 투자금과 예상 배당금이 함께 변할 수 있습니다.\n\n다만 실제 시장에서는 ETF 가격, 배당률, 세금, 환율이 계속 변합니다. 따라서 시뮬레이션 결과는 미래 수익을 보장하지 않습니다.\n\n배당 재투자 시뮬레이션은 가정에 따른 참고용 결과로 활용하는 것이 적절합니다.",
    relatedSlugs: ["how-to-calculate-monthly-dividend", "high-dividend-etf-risk"],
    createdAt: "2026-06-19",
    updatedAt: "2026-06-19",
  },
  {
    slug: "high-dividend-etf-risk",
    title: "고배당 ETF를 볼 때 주의할 점",
    description:
      "높은 배당률을 가진 ETF를 볼 때 확인해야 할 위험 요소를 정리합니다.",
    category: "Risk",
    keywords: ["고배당 ETF", "리스크", "배당률", "커버드콜"],
    body:
      "높은 배당률은 눈에 띄지만, 배당률만으로 ETF를 판단해서는 안 됩니다.\n\n고배당 ETF는 가격 변동, 분배금 변동, 옵션 전략, 기회비용 같은 위험을 함께 가질 수 있습니다. 특히 커버드콜 성격의 ETF는 상승장에서 수익이 제한될 수 있습니다.\n\n운용보수, 분배금 지속 가능성, ETF 전략, 기초자산 변동성을 함께 확인해야 합니다.\n\n이 글은 교육용 설명이며 특정 ETF를 추천하지 않습니다. 실제 투자 전 운용사 공식 자료와 최신 공시를 확인해야 합니다.",
    relatedSlugs: ["schd-vs-jepi-guide", "us-dividend-etf-tax-basics"],
    createdAt: "2026-06-19",
    updatedAt: "2026-06-19",
  },
];
