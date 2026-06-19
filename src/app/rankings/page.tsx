import Link from "next/link";
import type { Metadata } from "next";
import { ETFRankingFilters, RankingIntro } from "@/components/rankings";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { getAllEtfs } from "@/domain/etf/etfRepository";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("미국 배당 ETF 랭킹"),
  description:
    "미국 배당 ETF를 배당률, 운용보수, 배당주기 기준으로 비교해보세요.",
};

const rankingLinks = [
  ["월배당 ETF 순위", "/rankings/monthly-dividend-etfs"],
  ["고배당 ETF 순위", "/rankings/high-dividend-etfs"],
  ["운용보수 낮은 ETF 순위", "/rankings?sort=expense"],
  ["커버드콜 ETF 순위", "/rankings?category=CoveredCall"],
];

export default function RankingsPage() {
  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <RankingIntro
        title="ETF 랭킹"
        description="미국 배당 ETF를 배당률, 배당주기, 운용보수 기준으로 비교해보세요."
      />
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">대표 랭킹 링크</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rankingLinks.map(([label, href]) => (
            <Link className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </section>
      <ETFRankingFilters etfs={getAllEtfs()} />
      <InternalLinkSection />
    </main>
  );
}
