import type { Metadata } from "next";
import { DataSourceNotice } from "@/components/data";
import { AffiliateDisclosure, AdPlaceholder } from "@/components/monetization";
import { DividendSimulationForm } from "@/components/simulation";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("배당 재투자 시뮬레이션"),
  description:
    "초기 투자금, 월 추가 투자금, 배당률, 성장률을 기준으로 장기 배당 재투자 결과를 계산해보세요.",
};

export default function SimulationPage() {
  return (
    <main className="page-shell grid gap-6 py-8 sm:py-10">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-bold text-teal-700">Simulation</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
          배당 재투자 시뮬레이션
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          투자금, 월 추가 투자금, 배당률, 성장률을 기준으로 장기 배당 재투자
          결과를 계산해보세요.
        </p>
      </section>
      <DividendSimulationForm />
      <DataSourceNotice />
      <AdPlaceholder slotName="simulation-result-summary" />
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        본 시뮬레이션은 단순 가정에 따른 계산 결과이며 실제 수익률, 배당금,
        환율, 세금, ETF 운용 정책에 따라 달라질 수 있습니다. 투자 판단의 최종
        책임은 투자자 본인에게 있습니다.
      </section>
      <InternalLinkSection />
      <AffiliateDisclosure />
    </main>
  );
}
