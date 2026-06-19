import {
  clearAlertRules,
  getAlertRules,
  saveAlertRules,
} from "./alertStorage";
import type {
  AlertRule,
  AlertRuleActionResult,
  AlertRuleInput,
} from "./alertTypes";

function normalizeTicker(ticker: string): string {
  return ticker.trim().toUpperCase();
}

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `alert-${Date.now()}`;
}

function requiresTargetValue(ruleType: AlertRuleInput["ruleType"]): boolean {
  return ["TargetPriceBelow", "TargetPriceAbove", "DividendYieldAbove"].includes(ruleType);
}

function requiresDaysBefore(ruleType: AlertRuleInput["ruleType"]): boolean {
  return ["ExDividendDateUpcoming", "PaymentDateUpcoming"].includes(ruleType);
}

export { clearAlertRules, getAlertRules, saveAlertRules };

export function validateAlertRuleInput(input: AlertRuleInput): string[] {
  const errors: string[] = [];

  if (!normalizeTicker(input.ticker)) {
    errors.push("티커를 선택해주세요.");
  }

  if (!input.ruleType) {
    errors.push("알림 유형을 선택해주세요.");
  }

  if (requiresTargetValue(input.ruleType)) {
    if (input.targetValue === undefined || input.targetValue <= 0) {
      errors.push("목표값은 0보다 커야 합니다.");
    }
  }

  if (requiresDaysBefore(input.ruleType)) {
    if (
      input.daysBefore === undefined ||
      input.daysBefore < 1 ||
      input.daysBefore > 365
    ) {
      errors.push("알림 기준일은 1일 이상 365일 이하로 입력해주세요.");
    }
  }

  return errors;
}

export function addAlertRule(input: AlertRuleInput): AlertRuleActionResult {
  const errors = validateAlertRuleInput(input);
  const rules = getAlertRules();

  if (errors.length > 0) {
    return {
      success: false,
      message: errors.join(" "),
      rules,
    };
  }

  const nextRules: AlertRule[] = [
    ...rules,
    {
      id: createId(),
      ticker: normalizeTicker(input.ticker),
      ruleType: input.ruleType,
      targetValue: input.targetValue,
      daysBefore: input.daysBefore,
      enabled: true,
      createdAt: new Date().toISOString(),
      ...(input.memo ? { memo: input.memo } : {}),
    },
  ];

  saveAlertRules(nextRules);

  return {
    success: true,
    message: "알림 규칙을 추가했습니다.",
    rules: nextRules,
  };
}

export function removeAlertRule(id: string): AlertRuleActionResult {
  const rules = getAlertRules();
  const nextRules = rules.filter((rule) => rule.id !== id);

  if (nextRules.length === rules.length) {
    return {
      success: false,
      message: "삭제할 알림 규칙을 찾을 수 없습니다.",
      rules,
    };
  }

  saveAlertRules(nextRules);

  return {
    success: true,
    message: "알림 규칙을 삭제했습니다.",
    rules: nextRules,
  };
}

export function toggleAlertRule(id: string): AlertRuleActionResult {
  const rules = getAlertRules();
  let found = false;
  const nextRules = rules.map((rule) => {
    if (rule.id !== id) {
      return rule;
    }

    found = true;
    return {
      ...rule,
      enabled: !rule.enabled,
    };
  });

  if (!found) {
    return {
      success: false,
      message: "변경할 알림 규칙을 찾을 수 없습니다.",
      rules,
    };
  }

  saveAlertRules(nextRules);

  return {
    success: true,
    message: "알림 규칙 상태를 변경했습니다.",
    rules: nextRules,
  };
}

export function getAlertRulesByTicker(ticker: string): AlertRule[] {
  const normalizedTicker = normalizeTicker(ticker);

  return getAlertRules().filter((rule) => rule.ticker === normalizedTicker);
}
