import type { Metadata } from "next";
import { ActionButton, PageContainer, PageHero } from "@/components/common";
import {
  PortfolioDisclaimer,
  PortfolioForm,
  PortfolioHoldingsList,
  PortfolioSummary,
} from "@/components/portfolio";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildPageTitle } from "@/lib/seo";

const DEFAULT_EXCHANGE_RATE = 1350;
const DEFAULT_TAX_RATE_PERCENT = 15;

export const metadata: Metadata = {
  title: buildPageTitle("내 배당 포트폴리오"),
  description:
    "보유 중인 미국 배당 ETF를 입력하고 예상 세후 월 배당금과 연 배당금을 계산해보세요.",
};

export default function PortfolioPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Portfolio"
        title="내 배당 포트폴리오"
        description="보유 ETF를 입력하고 예상 세후 월 배당금을 확인해보세요."
      >
        <ActionButton href="/portfolio/calendar" variant="secondary">
          내 배당 캘린더 보기
        </ActionButton>
      </PageHero>
      <PortfolioForm />
      <PortfolioSummary
        exchangeRate={DEFAULT_EXCHANGE_RATE}
        taxRatePercent={DEFAULT_TAX_RATE_PERCENT}
      />
      <PortfolioHoldingsList exchangeRate={DEFAULT_EXCHANGE_RATE} />
      <PortfolioDisclaimer />
      <InternalLinkSection />
    </PageContainer>
  );
}
