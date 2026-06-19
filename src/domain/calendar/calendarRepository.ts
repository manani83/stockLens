import { calendarData } from "../../data/calendarData";
import type {
  CalendarEvent,
  CalendarEventFilter,
  CalendarEventType,
} from "./calendarTypes";

function normalizeTicker(ticker: string): string {
  return ticker.trim().toUpperCase();
}

function sortByDate(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((first, second) =>
    first.eventDate.localeCompare(second.eventDate),
  );
}

export function getAllCalendarEvents(): CalendarEvent[] {
  return sortByDate(calendarData);
}

export function getCalendarEventsByTicker(ticker: string): CalendarEvent[] {
  const normalizedTicker = normalizeTicker(ticker);

  return getAllCalendarEvents().filter(
    (event) => normalizeTicker(event.ticker) === normalizedTicker,
  );
}

export function getCalendarEventsByType(
  eventType: CalendarEventType,
): CalendarEvent[] {
  return getAllCalendarEvents().filter((event) => event.eventType === eventType);
}

export function filterCalendarEvents(
  filter: CalendarEventFilter,
): CalendarEvent[] {
  const normalizedTicker = filter.ticker ? normalizeTicker(filter.ticker) : "";

  return getAllCalendarEvents().filter((event) => {
    if (normalizedTicker && normalizeTicker(event.ticker) !== normalizedTicker) {
      return false;
    }

    if (filter.eventType && event.eventType !== filter.eventType) {
      return false;
    }

    if (filter.fromDate && event.eventDate < filter.fromDate) {
      return false;
    }

    if (filter.toDate && event.eventDate > filter.toDate) {
      return false;
    }

    return true;
  });
}

export function getUpcomingCalendarEvents(today?: string): CalendarEvent[] {
  const baseDate = today ?? new Date().toISOString().slice(0, 10);

  return getAllCalendarEvents().filter((event) => event.eventDate >= baseDate);
}
