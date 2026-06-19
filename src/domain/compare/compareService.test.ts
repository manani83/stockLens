import { describe, expect, it } from "vitest";
import { getEtfByTicker } from "../etf/etfRepository";
import {
  buildCompareSummary,
  compareEtfs,
  parseComparePair,
} from "./compareService";

describe("compareService", () => {
  it("schd-vs-jepi 형식의 pair를 대문자 ticker로 파싱한다", () => {
    expect(parseComparePair("schd-vs-jepi")).toEqual({
      firstTicker: "SCHD",
      secondTicker: "JEPI",
    });
  });

  it("잘못된 pair 형식이면 undefined를 반환한다", () => {
    expect(parseComparePair("schd-jepi")).toBeUndefined();
  });

  it("ETF 2개 비교 결과에서 배당률이 높은 ETF와 운용보수가 낮은 ETF를 계산한다", () => {
    const schd = getEtfByTicker("SCHD");
    const jepi = getEtfByTicker("JEPI");

    expect(schd).toBeDefined();
    expect(jepi).toBeDefined();

    const comparison = compareEtfs(schd!, jepi!);

    expect(comparison.higherDividendYieldTicker).toBe("JEPI");
    expect(comparison.lowerExpenseRatioTicker).toBe("SCHD");
    expect(comparison.monthlyDividendTickers).toEqual(["JEPI"]);
  });

  it("비교 요약 문장에 두 ETF ticker와 참고용 문구를 포함한다", () => {
    const schd = getEtfByTicker("SCHD");
    const jepi = getEtfByTicker("JEPI");
    const summary = buildCompareSummary(compareEtfs(schd!, jepi!));

    expect(summary).toContain("SCHD");
    expect(summary).toContain("JEPI");
    expect(summary).toContain("단순 참고용");
  });
});
