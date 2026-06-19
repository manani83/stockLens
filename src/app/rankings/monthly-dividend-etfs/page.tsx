import type { Metadata } from "next";
import { DataFreshnessNotice } from "@/components/data";
import { AffiliateDisclosure, AdPlaceholder } from "@/components/monetization";
import { ETFRankingTable, RankingIntro } from "@/components/rankings";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { getAllEtfs } from "@/domain/etf/etfRepository";
import {
  filterMonthlyDividendEtfs,
  sortEtfsByDividendYield,
} from "@/domain/rankings/rankingService";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("월배당 ETF 순위"),
  description: "매월 분배금을 지급하는 미국 월배당 ETF를 비교해보세요.",
};

export default function MonthlyDividendEtfsPage() {
  const etfs = sortEtfsByDividendYield(filterMonthlyDividendEtfs(getAllEtfs()));

  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <RankingIntro
        title="월배당 ETF 순위"
        description="매월 분배금을 지급하는 성격의 ETF를 확인해보세요."
      />
      <DataFreshnessNotice dataAsOf={etfs[0]?.dataAsOf} />
      <ETFRankingTable etfs={etfs} />
      <AdPlaceholder slotName="monthly-rankings-table-bottom" />
      <InternalLinkSection />
      <AffiliateDisclosure />
    </main>
  );
}
