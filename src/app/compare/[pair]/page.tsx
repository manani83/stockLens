import type { Metadata } from "next";
import Link from "next/link";
import { NotFoundState } from "@/components/common";
import {
  ETFCompareCard,
  ETFCompareSummary,
  ETFCompareTable,
} from "@/components/compare";
import { DataSourceNotice } from "@/components/data";
import { BrokerAffiliateBox } from "@/components/monetization";
import { parseComparePair } from "@/domain/compare/compareService";
import { getEtfByTicker } from "@/domain/etf/etfRepository";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import {
  buildCompareMetaDescription,
  buildCompareMetaTitle,
} from "@/lib/seo";

type ComparePairPageProps = {
  params: Promise<{
    pair: string;
  }>;
};

export async function generateMetadata({
  params,
}: ComparePairPageProps): Promise<Metadata> {
  const { pair } = await params;
  const parsedPair = parseComparePair(pair);

  if (!parsedPair) {
    return {
      title: "ETF 비교 | Dividend Lab Korea",
      description: "미국 배당 ETF 2개의 배당률, 운용보수, 배당주기를 비교해보세요.",
    };
  }

  return {
    title: buildCompareMetaTitle(parsedPair.firstTicker, parsedPair.secondTicker),
    description: buildCompareMetaDescription(
      parsedPair.firstTicker,
      parsedPair.secondTicker,
    ),
  };
}

export default async function ComparePairPage({ params }: ComparePairPageProps) {
  const { pair } = await params;
  const parsedPair = parseComparePair(pair);
  const first = parsedPair ? getEtfByTicker(parsedPair.firstTicker) : undefined;
  const second = parsedPair ? getEtfByTicker(parsedPair.secondTicker) : undefined;

  if (!parsedPair || !first || !second || first.ticker === second.ticker) {
    return (
      <main className="page-shell grid gap-4 py-8 sm:py-10">
        <NotFoundState
          title="비교할 ETF 정보를 찾을 수 없습니다"
          description="URL은 schd-vs-jepi 형식이어야 하며, 서로 다른 MVP 기본 ETF 티커만 비교할 수 있습니다."
          actionLabel="ETF 비교 페이지로 이동"
          actionHref="/compare"
        />
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50" href="/rankings">
            ETF 랭킹
          </Link>
          <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50" href="/">
            메인 페이지
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-bold text-teal-700">Compare</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
          {first.ticker} vs {second.ticker}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          정적 ETF 데이터를 기준으로 배당률, 운용보수, 배당주기, 위험도와 투자
          성격을 비교합니다.
        </p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <ETFCompareCard etf={first} />
        <ETFCompareCard etf={second} />
      </section>
      <ETFCompareSummary first={first} second={second} />
      <ETFCompareTable first={first} second={second} />
      <DataSourceNotice />
      <BrokerAffiliateBox />
      <InternalLinkSection />
    </main>
  );
}
