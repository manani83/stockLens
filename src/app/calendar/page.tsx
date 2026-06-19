import type { Metadata } from "next";
import { ActionButton, PageContainer, PageHero } from "@/components/common";
import { DataSourceNotice } from "@/components/data";
import { CalendarDisclaimer, MarketCalendar } from "@/components/calendar";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { getAllCalendarEvents } from "@/domain/calendar/calendarRepository";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("배당락/실적 캘린더"),
  description:
    "SCHD, JEPI, JEPQ, QQQI, QYLD 같은 미국 배당 ETF의 배당락일, 배당 지급일, 주요 이벤트를 확인해보세요.",
};

export default function CalendarPage() {
  const events = getAllCalendarEvents();

  return (
    <PageContainer>
      <PageHero
        eyebrow="Calendar"
        title="배당락/실적 캘린더"
        description="미국 배당 ETF의 배당락일, 배당 지급일, 주요 이벤트를 확인해보세요."
      >
        <ActionButton href="/portfolio/calendar" variant="secondary">
          포트폴리오 기준으로 보기
        </ActionButton>
      </PageHero>
      <MarketCalendar events={events} />
      <CalendarDisclaimer />
      <DataSourceNotice />
      <InternalLinkSection />
    </PageContainer>
  );
}
