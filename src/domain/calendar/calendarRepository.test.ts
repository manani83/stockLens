import { describe, expect, it } from "vitest";
import {
  filterCalendarEvents,
  getAllCalendarEvents,
  getCalendarEventsByTicker,
  getCalendarEventsByType,
  getUpcomingCalendarEvents,
} from "./calendarRepository";

describe("calendarRepository", () => {
  it("전체 이벤트를 조회한다", () => {
    expect(getAllCalendarEvents().length).toBeGreaterThanOrEqual(8);
  });

  it("이벤트를 날짜 오름차순으로 반환한다", () => {
    const events = getAllCalendarEvents();
    const dates = events.map((event) => event.eventDate);

    expect(dates).toEqual([...dates].sort());
  });

  it("ticker 기준으로 대소문자 구분 없이 조회한다", () => {
    const events = getCalendarEventsByTicker("schd");

    expect(events.length).toBeGreaterThan(0);
    expect(events.every((event) => event.ticker === "SCHD")).toBe(true);
  });

  it("이벤트 타입 기준으로 조회한다", () => {
    const events = getCalendarEventsByType("ExDividendDate");

    expect(events.length).toBeGreaterThan(0);
    expect(events.every((event) => event.eventType === "ExDividendDate")).toBe(true);
  });

  it("fromDate와 toDate 기준으로 필터링한다", () => {
    const events = filterCalendarEvents({
      fromDate: "2026-07-01",
      toDate: "2026-07-31",
    });

    expect(events.length).toBeGreaterThan(0);
    expect(
      events.every(
        (event) => event.eventDate >= "2026-07-01" && event.eventDate <= "2026-07-31",
      ),
    ).toBe(true);
  });

  it("오늘 이후 upcoming 이벤트를 조회한다", () => {
    const events = getUpcomingCalendarEvents("2026-07-01");

    expect(events.length).toBeGreaterThan(0);
    expect(events.every((event) => event.eventDate >= "2026-07-01")).toBe(true);
  });

  it("존재하지 않는 ticker 조회 시 빈 배열을 반환한다", () => {
    expect(getCalendarEventsByTicker("NOPE")).toEqual([]);
  });
});
