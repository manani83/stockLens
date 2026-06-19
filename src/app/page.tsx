import Link from "next/link";
import type { Metadata } from "next";
import { DividendCalculator } from "@/components/dividend";
import { DisclaimerBox } from "@/components/common/DisclaimerBox";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PopularETFSection } from "@/components/etf";
import { AffiliateDisclosure, AdPlaceholder } from "@/components/monetization";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { WatchlistPanel } from "@/components/watchlist";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("미국주식 배당·ETF 계산기"),
  description:
    "투자금, 환율, 배당률, 세율을 입력해 SCHD, JEPI, JEPQ, QQQI, QYLD의 예상 월 배당금과 연 배당금을 계산해보세요.",
};

export default function Home() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-[var(--line)] bg-white">
        <div className="page-shell py-12 sm:py-16">
          <p className="eyebrow">Dividend Lab Korea</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            한국 투자자를 위한 미국주식 배당·ETF 계산기
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            SCHD, JEPI, JEPQ, QQQI, QYLD 같은 미국 배당 ETF의 예상 월
            배당금을 원화 기준 세후 금액으로 계산해보세요.
          </p>
        </div>
      </section>

      <div className="page-shell grid gap-8 py-8 sm:py-10">
        <section className="grid gap-4">
          <SectionHeader
            eyebrow="Calculator"
            title="배당금 계산기"
            description="투자금, 환율, 배당률, 세율을 입력하면 예상 월 배당금과 연 배당금을 계산합니다."
          />
          <DividendCalculator />
        </section>

        <section className="grid gap-4">
          <SectionHeader
            eyebrow="Popular ETFs"
            title="인기 ETF"
            description="초기 MVP에서 제공하는 주요 배당 ETF입니다. 상세 페이지에서 ETF 정보를 확인할 수 있습니다."
          />
          <PopularETFSection />
        </section>

        <AdPlaceholder slotName="home-popular-etfs" />

        <section className="grid gap-4">
          <SectionHeader
            eyebrow="Watchlist"
            title="내 관심 ETF"
            description="관심 ETF를 저장하고 다시 확인할 수 있습니다. 초기 MVP에서는 브라우저에만 저장됩니다."
          />
          <WatchlistPanel />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              배당 재투자 시뮬레이션
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              초기 투자금, 월 추가 투자금, 배당률, 성장률을 기준으로 장기 배당
              재투자 결과를 계산해볼 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/simulation">
              시뮬레이션 보기
            </Link>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">ETF 비교</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              SCHD vs JEPI, JEPI vs JEPQ, QQQI vs QYLD처럼 미국 배당 ETF
              2개를 선택해 비교해볼 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/compare">
              ETF 비교 보기
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              ETF 랭킹/스크리너
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              고배당 ETF 순위, 월배당 ETF 순위, 운용보수 낮은 ETF를 정적
              데이터 기준으로 비교해볼 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/rankings">
              ETF 랭킹 보기
            </Link>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              배당락/실적 캘린더
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              주요 ETF의 배당락일, 배당 지급일, 리밸런싱 같은 정적 예시 일정을
              확인할 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/calendar">
              캘린더 보기
            </Link>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              가격/배당 알림 규칙
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              실제 알림 발송 없이 목표 가격, 배당률, 배당 일정 조건을
              브라우저에 저장해볼 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/alerts">
              알림 규칙 보기
            </Link>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              내 배당 포트폴리오
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              보유 ETF와 투자금을 브라우저에 저장하고 예상 세후 월 배당금을
              참고용으로 계산할 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/portfolio">
              포트폴리오 보기
            </Link>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              포트폴리오 배당 캘린더
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              저장한 ETF 기준으로 관련 배당락일과 배당 지급일 예시 일정을
              모아볼 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/portfolio/calendar">
              내 배당 캘린더 보기
            </Link>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              데이터 백업/복원
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              브라우저에 저장된 관심종목, 알림 규칙, 포트폴리오 데이터를 JSON
              파일로 관리할 수 있습니다.
            </p>
            <Link className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" href="/settings/backup">
              백업/복원 보기
            </Link>
          </div>
        </section>

        <InternalLinkSection />

        <section className="grid gap-4">
          <SectionHeader eyebrow="Notice" title="투자 유의사항" />
          <DisclaimerBox>
            본 사이트의 계산 결과와 ETF 정보는 단순 참고용이며 실제 배당금,
            환율, 세금, 분배금 정책에 따라 달라질 수 있습니다. 투자 판단의 최종
            책임은 투자자 본인에게 있습니다.
          </DisclaimerBox>
        </section>
        <AffiliateDisclosure />
      </div>
    </main>
  );
}
