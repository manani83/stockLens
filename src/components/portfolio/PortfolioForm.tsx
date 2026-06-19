"use client";

import { useState } from "react";
import { getAllEtfs } from "@/domain/etf/etfRepository";
import { addPortfolioHolding } from "@/domain/portfolio/portfolioService";
import type { PortfolioInput } from "@/domain/portfolio/portfolioTypes";
import { FormErrorMessage } from "../common";

export const PORTFOLIO_UPDATED_EVENT = "dividend-lab-portfolio-updated";

export function PortfolioForm() {
  const etfs = getAllEtfs();
  const [values, setValues] = useState<PortfolioInput>({
    ticker: etfs[0]?.ticker ?? "SCHD",
    investmentKrw: 1000000,
    quantity: undefined,
    averagePriceUsd: undefined,
    memo: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function updateNumber(field: keyof PortfolioInput, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value ? Number(value) : undefined,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = addPortfolioHolding(values);

    setMessage(result.message ?? "");
    setIsError(!result.success);

    if (result.success) {
      window.dispatchEvent(new Event(PORTFOLIO_UPDATED_EVENT));
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">보유 ETF 추가</h2>
      <form className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">ETF 선택</span>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            onChange={(event) =>
              setValues((current) => ({ ...current, ticker: event.target.value }))
            }
            value={values.ticker}
          >
            {etfs.map((etf) => (
              <option key={etf.ticker} value={etf.ticker}>
                {etf.ticker} · {etf.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">투자금 원화</span>
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            min={0}
            onChange={(event) => updateNumber("investmentKrw", event.target.value)}
            step={10000}
            type="number"
            value={values.investmentKrw ?? ""}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">수량</span>
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            min={0}
            onChange={(event) => updateNumber("quantity", event.target.value)}
            step="0.0001"
            type="number"
            value={values.quantity ?? ""}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">평균단가 달러</span>
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            min={0}
            onChange={(event) => updateNumber("averagePriceUsd", event.target.value)}
            step="0.01"
            type="number"
            value={values.averagePriceUsd ?? ""}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-slate-800">메모</span>
          <input
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            onChange={(event) =>
              setValues((current) => ({ ...current, memo: event.target.value }))
            }
            type="text"
            value={values.memo ?? ""}
          />
        </label>
        <div className="flex items-end">
          <button
            className="w-full rounded-md bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            type="submit"
          >
            추가
          </button>
        </div>
      </form>
      {isError ? <FormErrorMessage message={message} /> : null}
      {!isError && message ? (
        <p className="mt-4 text-sm font-bold text-slate-700">{message}</p>
      ) : null}
    </section>
  );
}
