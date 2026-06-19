export type DataSourceType =
  | "Static"
  | "Manual"
  | "Csv"
  | "ExternalApi"
  | "AdminManaged";

export type DataSourceStatus = "Active" | "Planned" | "Deprecated" | "Disabled";

export type DataSourceConfig = {
  type: DataSourceType;
  status: DataSourceStatus;
  name: string;
  description: string;
  updateCycle: string;
  requiresApiKey: boolean;
  notes?: string;
};

export type DataFreshnessStatus = "Fresh" | "Stale" | "Unknown";

export type DataSourceHealth = {
  sourceName: string;
  status: DataSourceStatus;
  freshnessStatus: DataFreshnessStatus;
  lastCheckedAt?: string;
  message?: string;
};
