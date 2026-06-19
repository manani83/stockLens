"use client";

import { useMemo, useState } from "react";
import type {
  ETFCategory,
  ETFDividendInfo,
  ETFRiskLevel,
  PayoutCycle,
} from "@/domain/etf/etfTypes";
import { applyRankingFilters, sortEtfsByDividendYield } from "@/domain/rankings/rankingService";
import { ETFRankingTable } from "./ETFRankingTable";

type ETFRankingFiltersProps = {
  etfs: ETFDividendInfo[];
};

export function ETFRankingFilters({ etfs }: ETFRankingFiltersProps) {
  const [category, setCategory] = useState<ETFCategory | "All">("All");
  const [payoutCycle, setPayoutCycle] = useState<PayoutCycle | "All">("All");
  const [riskLevel, setRiskLevel] = useState<ETFRiskLevel | "All">("All");
  const [minYield, setMinYield] = useState("");
  const [maxExpense, setMaxExpense] = useState("");

  const filteredEtfs = useMemo(() => {
    return sortEtfsByDividendYield(
      applyRankingFilters(etfs, {
        category,
        payoutCycle,
        riskLevel,
        minDividendYieldPercent: minYield ? Number(minYield) : undefined,
        maxExpenseRatioPercent: maxExpense ? Number(maxExpense) : undefined,
      }),
    );
  }, [category, etfs, maxExpense, minYield, payoutCycle, riskLevel]);

  return (
    <section className="grid gap-4">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">필터</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">카테고리</span>
            <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" onChange={(event) => setCategory(event.target.value as ETFCategory | "All")} value={category}>
              {["All", "DividendGrowth", "CoveredCall", "BroadMarket", "Technology", "Bond", "REIT", "Unknown"].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">배당주기</span>
            <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" onChange={(event) => setPayoutCycle(event.target.value as PayoutCycle | "All")} value={payoutCycle}>
              {["All", "Monthly", "Quarterly", "SemiAnnual", "Annual", "Unknown"].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">위험도</span>
            <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" onChange={(event) => setRiskLevel(event.target.value as ETFRiskLevel | "All")} value={riskLevel}>
              {["All", "Low", "Medium", "High", "Unknown"].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">최소 배당률</span>
            <input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" min="0" onChange={(event) => setMinYield(event.target.value)} type="number" value={minYield} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">최대 운용보수</span>
            <input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" min="0" onChange={(event) => setMaxExpense(event.target.value)} type="number" value={maxExpense} />
          </label>
        </div>
      </div>
      <ETFRankingTable etfs={filteredEtfs} />
    </section>
  );
}
