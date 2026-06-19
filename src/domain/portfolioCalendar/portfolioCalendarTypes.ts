export type PortfolioCalendarEvent = {
  eventId: string;
  ticker: string;
  title: string;
  eventType: string;
  eventDate: string;
  description: string;
  holdingInvestmentKrw?: number;
  memo?: string;
  dataAsOf?: string;
  sourceNote?: string;
};

export type PortfolioCalendarSummary = {
  holdingTickerCount: number;
  eventCount: number;
  upcomingEventCount: number;
  nextEventDate?: string;
  nextEventTitle?: string;
};
