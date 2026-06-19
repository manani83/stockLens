import type { CalendarEvent } from "@/domain/calendar/calendarTypes";

const eventTypeLabels: Record<CalendarEvent["eventType"], string> = {
  ExDividendDate: "배당락일",
  DividendPaymentDate: "배당 지급일",
  Earnings: "실적",
  Rebalancing: "리밸런싱",
  Other: "기타",
};

type CalendarEventCardProps = {
  event: CalendarEvent;
};

export function CalendarEventCard({ event }: CalendarEventCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">{event.ticker}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">{event.title}</h3>
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          {eventTypeLabels[event.eventType]}
        </span>
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800">{event.eventDate}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
      {event.dataAsOf ? (
        <p className="mt-3 text-xs text-slate-500">데이터 기준일: {event.dataAsOf}</p>
      ) : null}
    </article>
  );
}

export { eventTypeLabels };
