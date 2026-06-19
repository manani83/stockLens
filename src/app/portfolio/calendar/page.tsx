import type { Metadata } from "next";
import { PageContainer, PageHero } from "@/components/common";
import {
  PortfolioCalendarDisclaimer,
  PortfolioCalendarPanel,
  PortfolioCalendarSummary,
} from "@/components/portfolioCalendar";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("내 포트폴리오 배당 캘린더"),
  description:
    "저장한 미국 배당 ETF를 기준으로 배당락일, 배당 지급일, 주요 이벤트를 확인해보세요.",
};

export default function PortfolioCalendarPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Portfolio Calendar"
        title="내 포트폴리오 배당 캘린더"
        description="저장한 ETF 기준으로 배당락일, 배당 지급일, 주요 이벤트를 확인해보세요."
      />
      <PortfolioCalendarSummary />
      <PortfolioCalendarPanel />
      <PortfolioCalendarDisclaimer />
      <InternalLinkSection />
    </PageContainer>
  );
}
