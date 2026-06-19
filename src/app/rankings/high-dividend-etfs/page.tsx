import type { Metadata } from "next";
import { DataFreshnessNotice } from "@/components/data";
import { AffiliateDisclosure, AdPlaceholder } from "@/components/monetization";
import { ETFRankingTable, RankingIntro } from "@/components/rankings";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { getAllEtfs } from "@/domain/etf/etfRepository";
import { sortEtfsByDividendYield } from "@/domain/rankings/rankingService";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("고배당 ETF 순위"),
  description:
    "배당률이 높은 미국 ETF를 비교하고 운용보수와 위험도를 함께 확인해보세요.",
};

export default function HighDividendEtfsPage() {
  const etfs = sortEtfsByDividendYield(getAllEtfs());

  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <RankingIntro
        title="고배당 ETF 순위"
        description="배당률이 높은 ETF를 확인하되, 높은 배당률이 항상 좋은 투자를 의미하지는 않습니다."
      />
      <DataFreshnessNotice dataAsOf={etfs[0]?.dataAsOf} />
      <ETFRankingTable etfs={etfs} />
      <AdPlaceholder slotName="high-dividend-rankings-table-bottom" />
      <InternalLinkSection />
      <AffiliateDisclosure />
    </main>
  );
}
