import {
  getAlertRules,
  saveAlertRules,
} from "../alerts/alertStorage";
import type { AlertRule } from "../alerts/alertTypes";
import {
  getPortfolioHoldings,
  savePortfolioHoldings,
} from "../portfolio/portfolioStorage";
import type { PortfolioHolding } from "../portfolio/portfolioTypes";
import {
  getWatchlistItems,
  saveWatchlistItems,
} from "../watchlist/watchlistStorage";
import type { WatchlistItem } from "../watchlist/watchlistTypes";
import type {
  BackupActionResult,
  BackupData,
  BackupImportMode,
  BackupValidationResult,
} from "./backupTypes";

const BACKUP_VERSION = "1.0.0";

function canUseBrowserDownload(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function hasBackupShape(value: unknown): value is BackupData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<BackupData>;

  return (
    typeof candidate.version === "string" &&
    typeof candidate.exportedAt === "string" &&
    Array.isArray(candidate.watchlist) &&
    Array.isArray(candidate.alertRules) &&
    Array.isArray(candidate.portfolio)
  );
}

function mergeByKey<T>(current: T[], incoming: T[], getKey: (item: T) => string): T[] {
  const merged = new Map<string, T>();

  current.forEach((item) => {
    const key = getKey(item);
    if (key) {
      merged.set(key, item);
    }
  });

  incoming.forEach((item) => {
    const key = getKey(item);
    if (key) {
      merged.set(key, item);
    }
  });

  return Array.from(merged.values());
}

export function createBackupData(): BackupData {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    watchlist: getWatchlistItems(),
    alertRules: getAlertRules(),
    portfolio: getPortfolioHoldings(),
  };
}

export function serializeBackupData(data: BackupData): string {
  return JSON.stringify(data, null, 2);
}

export function validateBackupData(raw: string): BackupValidationResult {
  try {
    const parsed = JSON.parse(raw);

    if (!hasBackupShape(parsed)) {
      return {
        valid: false,
        message:
          "백업 파일 형식이 올바르지 않습니다. version, exportedAt, watchlist, alertRules, portfolio 필드를 확인해주세요.",
      };
    }

    return {
      valid: true,
      data: parsed,
    };
  } catch {
    return {
      valid: false,
      message: "JSON 파일을 읽을 수 없습니다.",
    };
  }
}

export function importBackupData(
  data: BackupData,
  mode: BackupImportMode,
): BackupActionResult {
  if (mode === "Replace") {
    saveWatchlistItems(data.watchlist as WatchlistItem[]);
    saveAlertRules(data.alertRules as AlertRule[]);
    savePortfolioHoldings(data.portfolio as PortfolioHolding[]);

    return {
      success: true,
      message: "백업 데이터를 덮어썼습니다.",
    };
  }

  saveWatchlistItems(
    mergeByKey(
      getWatchlistItems(),
      data.watchlist as WatchlistItem[],
      (item) => item.ticker.trim().toUpperCase(),
    ),
  );
  saveAlertRules(
    mergeByKey(
      getAlertRules(),
      data.alertRules as AlertRule[],
      (item) => item.id,
    ),
  );
  savePortfolioHoldings(
    mergeByKey(
      getPortfolioHoldings(),
      data.portfolio as PortfolioHolding[],
      (item) => item.id,
    ),
  );

  return {
    success: true,
    message: "백업 데이터를 병합했습니다.",
  };
}

export function downloadBackupFile(): void {
  if (!canUseBrowserDownload()) {
    return;
  }

  const data = createBackupData();
  const serialized = serializeBackupData(data);
  const date = data.exportedAt.slice(0, 10);
  const blob = new Blob([serialized], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `dividend-lab-backup-${date}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
