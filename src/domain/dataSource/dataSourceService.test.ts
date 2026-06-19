import { describe, expect, it } from "vitest";
import {
  getActiveDataSources,
  getAllDataSourceConfigs,
  getDataFreshnessStatus,
  getDataSourceHealth,
  getPlannedDataSources,
} from "./dataSourceService";

describe("dataSourceService", () => {
  it("전체 데이터 소스를 조회한다", () => {
    expect(getAllDataSourceConfigs()).toHaveLength(6);
  });

  it("Active 데이터 소스를 조회한다", () => {
    const activeSources = getActiveDataSources();

    expect(activeSources.map((source) => source.name).sort()).toEqual([
      "Static Calendar Data",
      "Static ETF Data",
    ]);
  });

  it("Planned 데이터 소스를 조회한다", () => {
    expect(getPlannedDataSources().length).toBeGreaterThanOrEqual(4);
  });

  it("dataAsOf가 없으면 Unknown을 반환한다", () => {
    expect(getDataFreshnessStatus()).toBe("Unknown");
  });

  it("today 기준 30일 이내면 Fresh를 반환한다", () => {
    expect(getDataFreshnessStatus("2026-06-01", "2026-06-30")).toBe("Fresh");
  });

  it("today 기준 30일 초과면 Stale을 반환한다", () => {
    expect(getDataFreshnessStatus("2026-06-01", "2026-07-02")).toBe("Stale");
  });

  it("데이터 소스 health를 조회한다", () => {
    const health = getDataSourceHealth();

    expect(health).toHaveLength(6);
    expect(health.every((item) => item.sourceName)).toBe(true);
  });
});
