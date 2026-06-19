import type { Metadata } from "next";
import { PageContainer, PageHero } from "@/components/common";
import { GuideArticleList } from "@/components/content";
import { InternalLinkSection } from "@/components/seo/InternalLinkSection";
import { getAllGuideArticles } from "@/domain/content/contentRepository";
import { buildPageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPageTitle("배당 ETF 가이드"),
  description:
    "미국 배당 ETF, 월 배당금 계산, 세금, 재투자, 고배당 ETF 리스크를 쉽게 알아보세요.",
};

export default function GuidesPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Guides"
        title="배당 ETF 가이드"
        description="미국 배당 ETF, 월 배당금 계산, 세금, 재투자, 리스크를 쉽게 정리했습니다."
      />
      <GuideArticleList articles={getAllGuideArticles()} />
      <InternalLinkSection />
    </PageContainer>
  );
}
