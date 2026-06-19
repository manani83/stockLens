import type { CalendarEvent } from "@/domain/calendar/calendarTypes";
import { eventTypeLabels } from "./CalendarEventCard";

type CalendarEventTableProps = {
  events: CalendarEvent[];
};

export function CalendarEventTable({ events }: CalendarEventTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block">
      <table className="w-full min-w-[800px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {["날짜", "티커", "이벤트 유형", "제목", "설명"].map((label) => (
              <th className="px-3 py-3 font-bold text-slate-700" key={label}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr className="border-b border-slate-100" key={event.id}>
              <td className="px-3 py-3 font-bold text-slate-950">{event.eventDate}</td>
              <td className="px-3 py-3 font-bold text-slate-950">{event.ticker}</td>
              <td className="px-3 py-3 text-slate-700">
                {eventTypeLabels[event.eventType]}
              </td>
              <td className="px-3 py-3 text-slate-700">{event.title}</td>
              <td className="px-3 py-3 text-slate-700">{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
