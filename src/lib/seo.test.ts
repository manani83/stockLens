import { describe, expect, it } from "vitest";
import {
  buildCompareMetaDescription,
  buildCompareMetaTitle,
  buildEtfMetaDescription,
  buildEtfMetaTitle,
  buildPageTitle,
} from "./seo";

describe("seo helpers", () => {
  it("페이지 title에 사이트명을 포함한다", () => {
    expect(buildPageTitle("배당락/실적 캘린더")).toBe(
      "배당락/실적 캘린더 | Dividend Lab Korea",
    );
  });

  it("ETF metadata title은 ticker를 대문자로 표시한다", () => {
    expect(buildEtfMetaTitle("schd")).toBe(
      "SCHD 배당금 계산기 | Dividend Lab Korea",
    );
  });

  it("ETF metadata description은 ticker와 ETF 이름을 포함한다", () => {
    const description = buildEtfMetaDescription(
      "schd",
      "Schwab U.S. Dividend Equity ETF",
    );

    expect(description).toContain("SCHD");
    expect(description).toContain("Schwab U.S. Dividend Equity ETF");
    expect(description).toContain("계산해보세요");
  });

  it("비교 metadata title은 두 ticker를 포함한다", () => {
    expect(buildCompareMetaTitle("schd", "jepi")).toBe(
      "SCHD vs JEPI 비교 | Dividend Lab Korea",
    );
  });

  it("비교 metadata description은 비교 행동을 설명한다", () => {
    const description = buildCompareMetaDescription("schd", "jepi");

    expect(description).toContain("SCHD");
    expect(description).toContain("JEPI");
    expect(description).toContain("비교해보세요");
  });
});
