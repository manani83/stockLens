"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllEtfs } from "@/domain/etf/etfRepository";

export function ETFCompareSelector() {
  const router = useRouter();
  const etfs = getAllEtfs();
  const [firstTicker, setFirstTicker] = useState("SCHD");
  const [secondTicker, setSecondTicker] = useState("JEPI");

  const isSameTicker = firstTicker === secondTicker;
  const pairPath = useMemo(
    () => `/compare/${firstTicker.toLowerCase()}-vs-${secondTicker.toLowerCase()}`,
    [firstTicker, secondTicker],
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">ETF 2개 선택</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">ETF A</span>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-950"
            onChange={(event) => setFirstTicker(event.target.value)}
            value={firstTicker}
          >
            {etfs.map((etf) => (
              <option key={etf.ticker} value={etf.ticker}>
                {etf.ticker} · {etf.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">ETF B</span>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-950"
            onChange={(event) => setSecondTicker(event.target.value)}
            value={secondTicker}
          >
            {etfs.map((etf) => (
              <option key={etf.ticker} value={etf.ticker}>
                {etf.ticker} · {etf.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="rounded-md bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={isSameTicker}
          onClick={() => router.push(pairPath)}
          type="button"
        >
          비교하기
        </button>
      </div>
      {isSameTicker ? (
        <p className="mt-3 text-sm font-medium text-rose-700">
          같은 ETF를 양쪽에 선택할 수 없습니다.
        </p>
      ) : null}
    </section>
  );
}
