export type CalendarEventType =
  | "ExDividendDate"
  | "DividendPaymentDate"
  | "Earnings"
  | "Rebalancing"
  | "Other";

export type CalendarEvent = {
  id: string;
  ticker: string;
  title: string;
  eventType: CalendarEventType;
  eventDate: string;
  description: string;
  sourceNote?: string;
  dataAsOf?: string;
};

export type CalendarEventFilter = {
  ticker?: string;
  eventType?: CalendarEventType;
  fromDate?: string;
  toDate?: string;
};
