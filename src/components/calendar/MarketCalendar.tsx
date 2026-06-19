"use client";

import { useMemo, useState } from "react";
import type {
  CalendarEvent,
  CalendarEventType,
} from "@/domain/calendar/calendarTypes";
import { filterCalendarEvents } from "@/domain/calendar/calendarRepository";
import { EmptyState } from "../common";
import { CalendarEventCard } from "./CalendarEventCard";
import { CalendarEventTable } from "./CalendarEventTable";
import { CalendarFilters } from "./CalendarFilters";

type MarketCalendarProps = {
  events: CalendarEvent[];
};

export function MarketCalendar({ events }: MarketCalendarProps) {
  const [ticker, setTicker] = useState("All");
  const [eventType, setEventType] = useState<CalendarEventType | "All">("All");

  const tickers = useMemo(() => {
    return Array.from(new Set(events.map((event) => event.ticker))).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return filterCalendarEvents({
      ticker: ticker === "All" ? undefined : ticker,
      eventType: eventType === "All" ? undefined : eventType,
    });
  }, [eventType, ticker]);

  return (
    <div className="grid gap-5">
      <CalendarFilters
        eventType={eventType}
        onEventTypeChange={setEventType}
        onTickerChange={setTicker}
        ticker={ticker}
        tickers={tickers}
      />
      <section className="grid gap-4 md:hidden">
        {filteredEvents.map((event) => (
          <CalendarEventCard event={event} key={event.id} />
        ))}
      </section>
      <CalendarEventTable events={filteredEvents} />
      {filteredEvents.length === 0 ? (
        <EmptyState
          title="선택한 조건에 맞는 일정이 없습니다."
          description="ticker 또는 이벤트 유형 필터를 바꿔 다시 확인해주세요."
        />
      ) : null}
    </div>
  );
}
