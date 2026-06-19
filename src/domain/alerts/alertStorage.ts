import type { AlertRule } from "./alertTypes";

export const ALERT_RULES_STORAGE_KEY = "dividend-lab-alert-rules";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAlertRules(): AlertRule[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  const rawRules = window.localStorage.getItem(ALERT_RULES_STORAGE_KEY);

  if (!rawRules) {
    return [];
  }

  try {
    const parsedRules = JSON.parse(rawRules);
    return Array.isArray(parsedRules) ? parsedRules : [];
  } catch {
    return [];
  }
}

export function saveAlertRules(rules: AlertRule[]): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(ALERT_RULES_STORAGE_KEY, JSON.stringify(rules));
}

export function clearAlertRules(): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(ALERT_RULES_STORAGE_KEY);
}
