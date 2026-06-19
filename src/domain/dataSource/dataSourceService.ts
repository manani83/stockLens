import { dataSourceConfigs } from "./dataSourceConfig";
import type {
  DataFreshnessStatus,
  DataSourceConfig,
  DataSourceHealth,
} from "./dataSourceTypes";

export function getAllDataSourceConfigs(): DataSourceConfig[] {
  return dataSourceConfigs;
}

export function getActiveDataSources(): DataSourceConfig[] {
  return dataSourceConfigs.filter((source) => source.status === "Active");
}

export function getPlannedDataSources(): DataSourceConfig[] {
  return dataSourceConfigs.filter((source) => source.status === "Planned");
}

export function getDataFreshnessStatus(
  dataAsOf?: string,
  today?: string,
): DataFreshnessStatus {
  if (!dataAsOf) {
    return "Unknown";
  }

  const baseDate = new Date(`${today ?? new Date().toISOString().slice(0, 10)}T00:00:00.000Z`);
  const sourceDate = new Date(`${dataAsOf}T00:00:00.000Z`);
  const diffDays =
    (baseDate.getTime() - sourceDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffDays <= 30 ? "Fresh" : "Stale";
}

export function getDataSourceHealth(): DataSourceHealth[] {
  const checkedAt = new Date().toISOString();

  return dataSourceConfigs.map((source) => ({
    sourceName: source.name,
    status: source.status,
    freshnessStatus: source.status === "Active" ? "Unknown" : "Unknown",
    lastCheckedAt: checkedAt,
    message:
      source.status === "Active"
        ? "현재 MVP에서 사용 중인 데이터 소스입니다."
        : "향후 전환 후보 데이터 소스입니다.",
  }));
}
