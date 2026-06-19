import type { Metadata } from "next";
import Link from "next/link";
import { NotFoundState } from "@/components/common";
import { DividendCalculator } from "@/components/dividend";
import { DataFreshnessNotice, DataSourceNotice } from "@/components/data";
import {
  ETFDetailCard,
  ETFInfoGrid,
  ETFProsCons,
  ETFSuitableFor,
} from "@/components/etf";
import { AffiliateDisclosure, AdPlaceholder } from "@/components/monetization";
import { getEtfByTicker } from "@/domain/etf/etfRepository";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildEtfMetaDescription, buildEtfMetaTitle } from "@/lib/seo";

type EtfDetailPageProps = {
  params: Promise<{
    ticker: string;
  }>;
};

export async function generateMetadata({
  params,
}: EtfDetailPageProps): Promise<Metadata> {
  const { ticker } = await params;
  const etf = getEtfByTicker(ticker);

  if (!etf) {
    return {
      title: "ETF 정보를 찾을 수 없습니다 | Dividend Lab Korea",
      description: "현재 MVP 기본 데이터에 없는 ETF ticker입니다.",
    };
  }

  return {
    title: buildEtfMetaTitle(etf.ticker),
    description: buildEtfMetaDescription(etf.ticker, etf.name),
  };
}

export default async function EtfDetailPage({ params }: EtfDetailPageProps) {
  const { ticker } = await params;
  const etf = getEtfByTicker(ticker);

  if (!etf) {
    return (
      <main className="page-shell grid gap-4 py-10">
        <NotFoundState
          title="ETF 정보를 찾을 수 없습니다"
          description={`요청한 티커 ${ticker.toUpperCase()}는 현재 MVP 기본 데이터에 없습니다. SCHD, JEPI, JEPQ, QQQI, QYLD 중 하나를 확인해주세요.`}
          actionLabel="ETF 랭킹 보기"
          actionHref="/rankings"
        />
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50" href="/">
            메인 페이지
          </Link>
          <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50" href="/">
            배당 계산기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <ETFDetailCard etf={etf} />
      <DataFreshnessNotice dataAsOf={etf.dataAsOf} message={etf.dataNote} />
      <ETFInfoGrid etf={etf} />
      <ETFProsCons etf={etf} />
      <ETFSuitableFor etf={etf} />

      <AdPlaceholder slotName={`etf-${etf.ticker.toLowerCase()}-detail`} />

      <section className="grid gap-4">
        <h2 className="text-2xl font-bold text-slate-950">
          {etf.ticker} 기준 배당금 계산기
        </h2>
        <DividendCalculator initialTicker={etf.ticker} />
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        본 페이지의 ETF 정보와 계산 결과는 단순 참고용이며 실제 배당금, 환율,
        세금, 분배금 정책에 따라 달라질 수 있습니다. 투자 판단의 최종 책임은
        투자자 본인에게 있습니다.
      </section>
      <DataSourceNotice />
      <AffiliateDisclosure />
      <InternalLinkSection />
    </main>
  );
}
