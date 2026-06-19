import { beforeEach, describe, expect, it } from "vitest";
import { addAlertRule, clearAlertRules, getAlertRules } from "../alerts/alertService";
import {
  addPortfolioHolding,
  clearPortfolio,
  getPortfolioHoldings,
} from "../portfolio/portfolioService";
import {
  addWatchlistItem,
  clearWatchlist,
  getWatchlistItems,
} from "../watchlist/watchlistService";
import {
  createBackupData,
  importBackupData,
  serializeBackupData,
  validateBackupData,
} from "./backupService";
import type { BackupData } from "./backupTypes";

function createLocalStorageMock(): Storage {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear: () => {
      store = {};
    },
    getItem: (key: string) => store[key] ?? null,
    key: (index: number) => Object.keys(store)[index] ?? null,
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
}

function createSampleBackup(): BackupData {
  return {
    version: "1.0.0",
    exportedAt: "2026-06-19T00:00:00.000Z",
    watchlist: [{ ticker: "SCHD", addedAt: "2026-06-19T00:00:00.000Z" }],
    alertRules: [
      {
        id: "alert-1",
        ticker: "SCHD",
        ruleType: "TargetPriceAbove",
        targetValue: 80,
        enabled: true,
        createdAt: "2026-06-19T00:00:00.000Z",
      },
    ],
    portfolio: [
      {
        id: "holding-1",
        ticker: "SCHD",
        investmentKrw: 1000000,
        createdAt: "2026-06-19T00:00:00.000Z",
        updatedAt: "2026-06-19T00:00:00.000Z",
      },
    ],
  };
}

describe("backupService", () => {
  beforeEach(() => {
    const localStorageMock = createLocalStorageMock();

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: localStorageMock,
    });
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: localStorageMock,
      },
    });

    clearWatchlist();
    clearAlertRules();
    clearPortfolio();
  });

  it("백업 데이터를 생성한다", () => {
    addWatchlistItem("SCHD");
    addAlertRule({ ticker: "SCHD", ruleType: "TargetPriceAbove", targetValue: 80 });
    addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 });

    const backup = createBackupData();

    expect(backup.version).toBe("1.0.0");
    expect(backup.watchlist).toHaveLength(1);
    expect(backup.alertRules).toHaveLength(1);
    expect(backup.portfolio).toHaveLength(1);
  });

  it("JSON을 보기 좋게 직렬화한다", () => {
    const serialized = serializeBackupData(createSampleBackup());

    expect(serialized).toContain('\n  "version": "1.0.0"');
  });

  it("유효한 백업 데이터를 검증한다", () => {
    const result = validateBackupData(JSON.stringify(createSampleBackup()));

    expect(result.valid).toBe(true);
    expect(result.data?.version).toBe("1.0.0");
  });

  it("잘못된 JSON은 검증 실패한다", () => {
    expect(validateBackupData("{bad json").valid).toBe(false);
  });

  it("필수 필드 누락 시 검증 실패한다", () => {
    expect(validateBackupData(JSON.stringify({ version: "1.0.0" })).valid).toBe(false);
  });

  it("Replace 모드로 가져온다", () => {
    addWatchlistItem("JEPI");
    const result = importBackupData(createSampleBackup(), "Replace");

    expect(result.success).toBe(true);
    expect(getWatchlistItems().map((item) => item.ticker)).toEqual(["SCHD"]);
  });

  it("Merge 모드로 가져온다", () => {
    addWatchlistItem("JEPI");
    const result = importBackupData(createSampleBackup(), "Merge");

    expect(result.success).toBe(true);
    expect(getWatchlistItems().map((item) => item.ticker).sort()).toEqual([
      "JEPI",
      "SCHD",
    ]);
  });

  it("watchlist ticker 중복을 제거한다", () => {
    addWatchlistItem("schd");
    importBackupData(createSampleBackup(), "Merge");

    expect(getWatchlistItems()).toHaveLength(1);
  });

  it("alertRules id 중복을 제거한다", () => {
    const backup = createSampleBackup();
    importBackupData(backup, "Replace");
    importBackupData(backup, "Merge");

    expect(getAlertRules()).toHaveLength(1);
  });

  it("portfolio id 중복을 제거한다", () => {
    const backup = createSampleBackup();
    importBackupData(backup, "Replace");
    importBackupData(backup, "Merge");

    expect(getPortfolioHoldings()).toHaveLength(1);
  });
});
