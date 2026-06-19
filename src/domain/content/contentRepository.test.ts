import { describe, expect, it } from "vitest";
import {
  getAllGuideArticles,
  getGuideArticleBySlug,
  getGuideArticlesByCategory,
  getRelatedGuideArticles,
  searchGuideArticles,
} from "./contentRepository";

describe("contentRepository", () => {
  it("전체 가이드를 조회한다", () => {
    expect(getAllGuideArticles()).toHaveLength(5);
  });

  it("updatedAt 내림차순으로 반환한다", () => {
    const dates = getAllGuideArticles().map((article) => article.updatedAt);

    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("slug 기준으로 조회한다", () => {
    expect(getGuideArticleBySlug("schd-vs-jepi-guide")?.title).toBe(
      "SCHD와 JEPI 차이 쉽게 보기",
    );
  });

  it("존재하지 않는 slug는 undefined를 반환한다", () => {
    expect(getGuideArticleBySlug("nope")).toBeUndefined();
  });

  it("카테고리 기준으로 조회한다", () => {
    const articles = getGuideArticlesByCategory("Tax");

    expect(articles.every((article) => article.category === "Tax")).toBe(true);
  });

  it("keyword 검색을 수행한다", () => {
    const articles = searchGuideArticles("세금");

    expect(articles.some((article) => article.slug === "us-dividend-etf-tax-basics")).toBe(true);
  });

  it("빈 keyword 검색은 전체를 반환한다", () => {
    expect(searchGuideArticles("   ")).toEqual(getAllGuideArticles());
  });

  it("관련 글을 조회한다", () => {
    const relatedArticles = getRelatedGuideArticles("schd-vs-jepi-guide");

    expect(relatedArticles.length).toBeGreaterThan(0);
  });
});
