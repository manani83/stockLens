import { beforeEach, describe, expect, it } from "vitest";
import {
  addAlertRule,
  clearAlertRules,
  getAlertRules,
  getAlertRulesByTicker,
  removeAlertRule,
  toggleAlertRule,
  validateAlertRuleInput,
} from "./alertService";
import { ALERT_RULES_STORAGE_KEY } from "./alertStorage";

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

describe("alertService", () => {
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

    localStorage.clear();
  });

  it("알림 규칙을 추가한다", () => {
    const result = addAlertRule({
      ticker: "SCHD",
      ruleType: "TargetPriceBelow",
      targetValue: 70,
    });

    expect(result.success).toBe(true);
    expect(getAlertRules()).toHaveLength(1);
  });

  it("ticker를 대문자로 저장한다", () => {
    addAlertRule({
      ticker: "jepi",
      ruleType: "DividendYieldAbove",
      targetValue: 8,
    });

    expect(getAlertRules()[0]?.ticker).toBe("JEPI");
  });

  it("알림 규칙을 삭제한다", () => {
    const id = addAlertRule({
      ticker: "SCHD",
      ruleType: "TargetPriceAbove",
      targetValue: 80,
    }).rules?.[0]?.id;

    const result = removeAlertRule(id ?? "");

    expect(result.success).toBe(true);
    expect(getAlertRules()).toEqual([]);
  });

  it("알림 규칙 활성 상태를 toggle한다", () => {
    const id = addAlertRule({
      ticker: "SCHD",
      ruleType: "PaymentDateUpcoming",
      daysBefore: 7,
    }).rules?.[0]?.id;

    const result = toggleAlertRule(id ?? "");

    expect(result.success).toBe(true);
    expect(getAlertRules()[0]?.enabled).toBe(false);
  });

  it("ticker 기준으로 조회한다", () => {
    addAlertRule({ ticker: "SCHD", ruleType: "TargetPriceBelow", targetValue: 70 });
    addAlertRule({ ticker: "JEPI", ruleType: "TargetPriceBelow", targetValue: 50 });

    expect(getAlertRulesByTicker("schd")).toHaveLength(1);
  });

  it("잘못된 입력값을 검증한다", () => {
    expect(validateAlertRuleInput({ ticker: "", ruleType: "TargetPriceBelow" })).not.toEqual([]);
    expect(
      validateAlertRuleInput({
        ticker: "SCHD",
        ruleType: "ExDividendDateUpcoming",
        daysBefore: 366,
      }),
    ).not.toEqual([]);
  });

  it("localStorage JSON 파싱 오류 시 빈 배열을 반환한다", () => {
    localStorage.setItem(ALERT_RULES_STORAGE_KEY, "{bad json");

    expect(getAlertRules()).toEqual([]);
  });

  it("clearAlertRules가 저장된 규칙을 삭제한다", () => {
    addAlertRule({ ticker: "SCHD", ruleType: "TargetPriceAbove", targetValue: 80 });
    clearAlertRules();

    expect(getAlertRules()).toEqual([]);
  });
});
