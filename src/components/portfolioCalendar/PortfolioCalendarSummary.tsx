"use client";

import { useEffect, useState } from "react";
import { getPortfolioCalendarSummary } from "@/domain/portfolioCalendar/portfolioCalendarService";
import type { PortfolioCalendarSummary as PortfolioCalendarSummaryResult } from "@/domain/portfolioCalendar/portfolioCalendarTypes";

const emptySummary: PortfolioCalendarSummaryResult = {
  holdingTickerCount: 0,
  eventCount: 0,
  upcomingEventCount: 0,
};

export function PortfolioCalendarSummary() {
  const [summary, setSummary] =
    useState<PortfolioCalendarSummaryResult>(emptySummary);

  useEffect(() => {
    queueMicrotask(() => setSummary(getPortfolioCalendarSummary()));
  }, []);

  const items = [
    ["보유 ETF 수", `${summary.holdingTickerCount}개`],
    ["관련 이벤트 수", `${summary.eventCount}개`],
    ["예정 이벤트 수", `${summary.upcomingEventCount}개`],
    [
      "다음 이벤트",
      summary.nextEventDate && summary.nextEventTitle
        ? `${summary.nextEventDate} · ${summary.nextEventTitle}`
        : "예정 이벤트 없음",
    ],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">포트폴리오 캘린더 요약</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([label, value]) => (
          <div className="rounded-md bg-slate-50 p-4" key={label}>
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="mt-1 text-base font-bold text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
