"use client";

import { useEffect, useState } from "react";
import { getPortfolioCalendarEvents } from "@/domain/portfolioCalendar/portfolioCalendarService";
import type { PortfolioCalendarEvent } from "@/domain/portfolioCalendar/portfolioCalendarTypes";
import { PortfolioCalendarEventCard } from "./PortfolioCalendarEventCard";

export function PortfolioCalendarPanel() {
  const [events, setEvents] = useState<PortfolioCalendarEvent[]>([]);

  useEffect(() => {
    queueMicrotask(() => setEvents(getPortfolioCalendarEvents()));
  }, []);

  if (events.length === 0) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
        포트폴리오에 저장된 ETF가 없거나 관련 캘린더 이벤트가 없습니다. 먼저
        포트폴리오에 ETF를 추가해보세요.
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      {events.map((event) => (
        <PortfolioCalendarEventCard event={event} key={event.eventId} />
      ))}
    </section>
  );
}
