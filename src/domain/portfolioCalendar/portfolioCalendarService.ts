import {
  filterCalendarEvents,
  getAllCalendarEvents,
} from "../calendar/calendarRepository";
import type { CalendarEvent } from "../calendar/calendarTypes";
import { getPortfolioHoldings } from "../portfolio/portfolioService";
import type { PortfolioHolding } from "../portfolio/portfolioTypes";
import type {
  PortfolioCalendarEvent,
  PortfolioCalendarSummary,
} from "./portfolioCalendarTypes";

function normalizeTicker(ticker: string): string {
  return ticker.trim().toUpperCase();
}

function getHoldingInvestmentKrw(holding: PortfolioHolding): number | undefined {
  if (holding.investmentKrw && holding.investmentKrw > 0) {
    return holding.investmentKrw;
  }

  return undefined;
}

function mapPortfolioCalendarEvent(
  event: CalendarEvent,
  holding?: PortfolioHolding,
): PortfolioCalendarEvent {
  return {
    eventId: event.id,
    ticker: event.ticker,
    title: event.title,
    eventType: event.eventType,
    eventDate: event.eventDate,
    description: event.description,
    holdingInvestmentKrw: holding ? getHoldingInvestmentKrw(holding) : undefined,
    memo: holding?.memo,
    dataAsOf: event.dataAsOf,
    sourceNote: event.sourceNote,
  };
}

function sortByDate(events: PortfolioCalendarEvent[]): PortfolioCalendarEvent[] {
  return [...events].sort((first, second) =>
    first.eventDate.localeCompare(second.eventDate),
  );
}

export function filterEventsByPortfolioTickers(
  tickers: string[],
  today?: string,
): PortfolioCalendarEvent[] {
  const normalizedTickers = Array.from(new Set(tickers.map(normalizeTicker))).filter(
    Boolean,
  );

  if (normalizedTickers.length === 0) {
    return [];
  }

  const events = normalizedTickers.flatMap((ticker) =>
    filterCalendarEvents({
      ticker,
      fromDate: today,
    }),
  );

  return sortByDate(events.map((event) => mapPortfolioCalendarEvent(event)));
}

export function getPortfolioCalendarEvents(
  today?: string,
): PortfolioCalendarEvent[] {
  const holdings = getPortfolioHoldings();
  const holdingsByTicker = new Map(
    holdings.map((holding) => [normalizeTicker(holding.ticker), holding]),
  );

  const tickers = Array.from(holdingsByTicker.keys());

  if (tickers.length === 0) {
    return [];
  }

  const events = tickers.flatMap((ticker) =>
    filterCalendarEvents({
      ticker,
      fromDate: today,
    }),
  );

  return sortByDate(
    events.map((event) =>
      mapPortfolioCalendarEvent(event, holdingsByTicker.get(normalizeTicker(event.ticker))),
    ),
  );
}

export function getPortfolioCalendarSummary(
  today?: string,
): PortfolioCalendarSummary {
  const holdings = getPortfolioHoldings();
  const tickers = Array.from(new Set(holdings.map((holding) => normalizeTicker(holding.ticker))));
  const relatedEvents = getAllCalendarEvents().filter((event) =>
    tickers.includes(normalizeTicker(event.ticker)),
  );
  const upcomingEvents = getPortfolioCalendarEvents(today);
  const nextEvent = upcomingEvents[0];

  return {
    holdingTickerCount: tickers.length,
    eventCount: relatedEvents.length,
    upcomingEventCount: upcomingEvents.length,
    nextEventDate: nextEvent?.eventDate,
    nextEventTitle: nextEvent?.title,
  };
}
