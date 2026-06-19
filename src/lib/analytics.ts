import type {
  AnalyticsEventName,
  AnalyticsEventPayload,
  AnalyticsProvider,
} from "@/domain/analytics/analyticsTypes";

const allowedProviders: AnalyticsProvider[] = ["None", "GA4", "GTM", "Custom"];

export function getAnalyticsProvider(): AnalyticsProvider {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

  if (allowedProviders.includes(provider as AnalyticsProvider)) {
    return provider as AnalyticsProvider;
  }

  return "None";
}

export function isAnalyticsEnabled(): boolean {
  return getAnalyticsProvider() !== "None";
}

export function sanitizeAnalyticsPayload(
  payload?: AnalyticsEventPayload | null,
): AnalyticsEventPayload {
  // Do not pass personally identifiable information, raw memo text, backup
  // contents, or localStorage payloads into analytics events.
  if (!payload) {
    return {};
  }

  return {
    ticker: payload.ticker,
    tickerA: payload.tickerA,
    tickerB: payload.tickerB,
    page: payload.page,
    value: payload.value,
    category: payload.category,
    label: payload.label,
    metadata: payload.metadata,
  };
}

export function trackEvent(
  name: AnalyticsEventName,
  payload?: AnalyticsEventPayload,
): void {
  try {
    const provider = getAnalyticsProvider();
    const safePayload = sanitizeAnalyticsPayload(payload);

    if (provider === "None") {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics:event]", name, safePayload);
    }
  } catch {
    return;
  }
}
