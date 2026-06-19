import { afterEach, describe, expect, it } from "vitest";
import {
  getAnalyticsProvider,
  isAnalyticsEnabled,
  sanitizeAnalyticsPayload,
  trackEvent,
} from "./analytics";

const originalProvider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

describe("analytics helpers", () => {
  afterEach(() => {
    if (originalProvider === undefined) {
      delete process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
    } else {
      process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER = originalProvider;
    }
  });

  it("provider 환경변수가 없으면 None을 반환한다", () => {
    delete process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

    expect(getAnalyticsProvider()).toBe("None");
  });

  it("허용 provider 값을 처리한다", () => {
    process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER = "GA4";

    expect(getAnalyticsProvider()).toBe("GA4");
  });

  it("알 수 없는 provider는 None을 반환한다", () => {
    process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER = "Unknown";

    expect(getAnalyticsProvider()).toBe("None");
  });

  it("isAnalyticsEnabled는 None이 아니면 true를 반환한다", () => {
    process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER = "GTM";

    expect(isAnalyticsEnabled()).toBe(true);
  });

  it("trackEvent 호출 시 오류가 없다", () => {
    expect(() => trackEvent("DividendCalculated", { ticker: "SCHD" })).not.toThrow();
  });

  it("sanitizeAnalyticsPayload는 undefined를 안전하게 처리한다", () => {
    expect(sanitizeAnalyticsPayload()).toEqual({});
  });

  it("sanitizeAnalyticsPayload는 허용된 metadata 값만 유지한다", () => {
    const payload = sanitizeAnalyticsPayload({
      ticker: "SCHD",
      metadata: {
        ok: true,
        count: 1,
        label: "test",
        empty: null,
      },
    });

    expect(payload).toEqual({
      ticker: "SCHD",
      metadata: {
        ok: true,
        count: 1,
        label: "test",
        empty: null,
      },
    });
  });
});
