"use client";

import { getAllEtfs } from "@/domain/etf/etfRepository";
import { formatPercent } from "@/lib/format";

type ETFSelectProps = {
  selectedTicker: string;
  onChange: (ticker: string) => void;
};

export function ETFSelect({ selectedTicker, onChange }: ETFSelectProps) {
  const etfs = getAllEtfs();

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">ETF 선택</span>
      <select
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-950 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        onChange={(event) => onChange(event.target.value)}
        value={selectedTicker}
      >
        {etfs.map((etf) => (
          <option key={etf.ticker} value={etf.ticker}>
            {etf.ticker} · {etf.name} · {formatPercent(etf.dividendYieldPercent)}
          </option>
        ))}
      </select>
    </label>
  );
}
