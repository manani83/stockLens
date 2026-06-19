import Link from "next/link";
import type { Metadata } from "next";
import { DisclaimerBox, NotFoundState, PageContainer, PageHero } from "@/components/common";
import {
  GuideArticleBody,
  RelatedGuideLinks,
} from "@/components/content";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import {
  getAllGuideArticles,
  getGuideArticleBySlug,
  getRelatedGuideArticles,
} from "@/domain/content/contentRepository";
import { buildPageTitle } from "@/lib/seo";

type GuideArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGuideArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuideArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    return {
      title: buildPageTitle("가이드를 찾을 수 없습니다"),
      description: "요청한 배당 ETF 가이드 문서를 찾을 수 없습니다.",
    };
  }

  return {
    title: buildPageTitle(article.title),
    description: article.description,
  };
}

export default async function GuideArticlePage({ params }: GuideArticlePageProps) {
  const { slug } = await params;
  const article = getGuideArticleBySlug(slug);

  if (!article) {
    return (
      <PageContainer>
        <PageHero
          eyebrow="Guides"
          title="가이드를 찾을 수 없습니다"
          description="요청한 가이드 문서가 없습니다. 가이드 목록에서 다시 선택해주세요."
        />
        <NotFoundState
          title="가이드를 찾을 수 없습니다"
          description="요청한 가이드 문서가 없습니다. 가이드 목록에서 다시 선택해주세요."
          actionLabel="가이드 목록 보기"
          actionHref="/guides"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.description}
      />
      <GuideArticleBody body={article.body} />
      <RelatedGuideLinks articles={getRelatedGuideArticles(article.slug)} />
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">관련 도구</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["배당금 계산기", "/"],
            ["ETF 비교", "/compare"],
            ["ETF 랭킹", "/rankings"],
            ["배당 재투자 시뮬레이션", "/simulation"],
          ].map(([label, href]) => (
            <Link
              className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
      <DisclaimerBox>
        본 가이드는 교육용 참고 자료이며 특정 ETF의 매수 또는 매도를 권유하지
        않습니다. 실제 투자 전 운용사 공식 자료와 최신 공시를 확인하세요.
      </DisclaimerBox>
      <InternalLinkSection />
    </PageContainer>
  );
}
