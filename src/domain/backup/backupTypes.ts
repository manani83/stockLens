export type BackupData = {
  version: string;
  exportedAt: string;
  watchlist: unknown[];
  alertRules: unknown[];
  portfolio: unknown[];
};

export type BackupImportMode = "Replace" | "Merge";

export type BackupValidationResult = {
  valid: boolean;
  message?: string;
  data?: BackupData;
};

export type BackupActionResult = {
  success: boolean;
  message?: string;
};
