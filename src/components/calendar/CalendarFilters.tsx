"use client";

import type { CalendarEventType } from "@/domain/calendar/calendarTypes";
import { eventTypeLabels } from "./CalendarEventCard";

type CalendarFiltersProps = {
  eventType: CalendarEventType | "All";
  onEventTypeChange: (eventType: CalendarEventType | "All") => void;
  onTickerChange: (ticker: string) => void;
  ticker: string;
  tickers: string[];
};

const eventTypeOptions: Array<CalendarEventType | "All"> = [
  "All",
  "ExDividendDate",
  "DividendPaymentDate",
  "Earnings",
  "Rebalancing",
  "Other",
];

export function CalendarFilters({
  eventType,
  onEventTypeChange,
  onTickerChange,
  ticker,
  tickers,
}: CalendarFiltersProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">캘린더 필터</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">티커</span>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            onChange={(event) => onTickerChange(event.target.value)}
            value={ticker}
          >
            <option value="All">전체</option>
            {tickers.map((tickerOption) => (
              <option key={tickerOption} value={tickerOption}>
                {tickerOption}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">이벤트 유형</span>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            onChange={(event) =>
              onEventTypeChange(event.target.value as CalendarEventType | "All")
            }
            value={eventType}
          >
            {eventTypeOptions.map((eventTypeOption) => (
              <option key={eventTypeOption} value={eventTypeOption}>
                {eventTypeOption === "All"
                  ? "전체"
                  : eventTypeLabels[eventTypeOption]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
