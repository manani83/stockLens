import { describe, expect, it } from "vitest";
import {
  getAllEtfs,
  getEtfByTicker,
  getEtfsByCategory,
  searchEtfs,
} from "./etfRepository";

describe("etfRepository", () => {
  it("전체 ETF 목록 조회 시 5개 이상 반환한다", () => {
    expect(getAllEtfs()).toHaveLength(5);
  });

  it("SCHD 조회가 가능하다", () => {
    expect(getEtfByTicker("SCHD")?.ticker).toBe("SCHD");
  });

  it("schd 소문자 조회가 가능하다", () => {
    expect(getEtfByTicker("schd")?.ticker).toBe("SCHD");
  });

  it("존재하지 않는 티커 조회 시 undefined를 반환한다", () => {
    expect(getEtfByTicker("NOPE")).toBeUndefined();
  });

  it("category 기준 조회가 가능하다", () => {
    const dividendGrowthEtfs = getEtfsByCategory("DividendGrowth");

    expect(dividendGrowthEtfs.some((etf) => etf.ticker === "SCHD")).toBe(true);
    expect(dividendGrowthEtfs.every((etf) => etf.category === "DividendGrowth")).toBe(true);
  });

  it("keyword 검색이 가능하다", () => {
    const results = searchEtfs("커버드콜");

    expect(results.some((etf) => etf.ticker === "JEPI")).toBe(true);
  });

  it("빈 keyword 검색 시 전체 목록을 반환한다", () => {
    expect(searchEtfs("")).toEqual(getAllEtfs());
    expect(searchEtfs("   ")).toEqual(getAllEtfs());
  });
});
