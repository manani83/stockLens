import { beforeEach, describe, expect, it } from "vitest";
import { addPortfolioHolding, clearPortfolio } from "../portfolio/portfolioService";
import {
  filterEventsByPortfolioTickers,
  getPortfolioCalendarEvents,
  getPortfolioCalendarSummary,
} from "./portfolioCalendarService";

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

describe("portfolioCalendarService", () => {
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

    clearPortfolio();
  });

  it("포트폴리오가 비어 있으면 빈 이벤트를 반환한다", () => {
    expect(getPortfolioCalendarEvents("2026-07-01")).toEqual([]);
  });

  it("포트폴리오 ticker 기준으로 이벤트를 필터링한다", () => {
    addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000, memo: "핵심" });
    addPortfolioHolding({ ticker: "JEPI", investmentKrw: 500000 });

    const events = getPortfolioCalendarEvents("2026-06-01");

    expect(events.length).toBeGreaterThan(0);
    expect(new Set(events.map((event) => event.ticker))).toEqual(
      new Set(["SCHD", "JEPI"]),
    );
    expect(events.some((event) => event.memo === "핵심")).toBe(true);
  });

  it("ticker 대소문자를 무시한다", () => {
    const events = filterEventsByPortfolioTickers(["schd"], "2026-06-01");

    expect(events.length).toBeGreaterThan(0);
    expect(events.every((event) => event.ticker === "SCHD")).toBe(true);
  });

  it("today 이후 이벤트만 반환한다", () => {
    const events = filterEventsByPortfolioTickers(["SCHD"], "2026-07-01");

    expect(events.every((event) => event.eventDate >= "2026-07-01")).toBe(true);
  });

  it("이벤트를 날짜순으로 정렬한다", () => {
    const events = filterEventsByPortfolioTickers(["SCHD", "JEPI"], "2026-06-01");
    const dates = events.map((event) => event.eventDate);

    expect(dates).toEqual([...dates].sort());
  });

  it("요약 정보를 계산한다", () => {
    addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 });
    addPortfolioHolding({ ticker: "JEPI", investmentKrw: 500000 });

    const summary = getPortfolioCalendarSummary("2026-07-01");

    expect(summary.holdingTickerCount).toBe(2);
    expect(summary.eventCount).toBeGreaterThan(0);
    expect(summary.upcomingEventCount).toBeGreaterThan(0);
  });

  it("다음 이벤트 정보를 반환한다", () => {
    addPortfolioHolding({ ticker: "SCHD", investmentKrw: 1000000 });

    const summary = getPortfolioCalendarSummary("2026-07-01");

    expect(summary.nextEventDate).toBe("2026-07-01");
    expect(summary.nextEventTitle).toContain("SCHD");
  });
});
