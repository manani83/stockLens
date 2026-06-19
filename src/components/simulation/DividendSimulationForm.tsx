"use client";

import { useMemo, useState } from "react";
import { getAllEtfs, getEtfByTicker } from "@/domain/etf/etfRepository";
import { simulateDividendReinvestment } from "@/domain/simulation/dividendReinvestmentSimulator";
import type { DividendSimulationInput } from "@/domain/simulation/simulationTypes";
import { FormErrorMessage } from "../common";
import { DividendSimulationResult } from "./DividendSimulationResult";

const DEFAULT_TICKER = "SCHD";
const DEFAULT_ETF = getEtfByTicker(DEFAULT_TICKER);

type SimulationFormState = DividendSimulationInput & {
  selectedTicker: string;
};

const initialState: SimulationFormState = {
  selectedTicker: DEFAULT_TICKER,
  initialInvestmentKrw: 10_000_000,
  monthlyContributionKrw: 500_000,
  exchangeRate: 1350,
  dividendYieldPercent: DEFAULT_ETF?.dividendYieldPercent ?? 0,
  annualGrowthRatePercent: 3,
  taxRatePercent: 15,
  years: 10,
  reinvestDividends: true,
};

const numericFields: Array<{
  key: keyof DividendSimulationInput;
  label: string;
  min?: number;
  max?: number;
  step: number;
}> = [
  { key: "initialInvestmentKrw", label: "초기 투자금", min: 0, step: 10000 },
  { key: "monthlyContributionKrw", label: "월 추가 투자금", min: 0, step: 10000 },
  { key: "exchangeRate", label: "환율", min: 1, step: 1 },
  { key: "dividendYieldPercent", label: "예상 배당률", min: 0, step: 0.01 },
  { key: "annualGrowthRatePercent", label: "예상 성장률", min: -99, step: 0.01 },
  { key: "taxRatePercent", label: "배당세", min: 0, max: 100, step: 0.01 },
  { key: "years", label: "투자 기간", min: 1, max: 40, step: 1 },
];

export function DividendSimulationForm() {
  const [values, setValues] = useState<SimulationFormState>(initialState);
  const etfs = getAllEtfs();

  const result = useMemo(() => {
    const input: DividendSimulationInput = {
      initialInvestmentKrw: values.initialInvestmentKrw,
      monthlyContributionKrw: values.monthlyContributionKrw,
      exchangeRate: values.exchangeRate,
      dividendYieldPercent: values.dividendYieldPercent,
      annualGrowthRatePercent: values.annualGrowthRatePercent,
      taxRatePercent: values.taxRatePercent,
      years: values.years,
      reinvestDividends: values.reinvestDividends,
    };

    try {
      return {
        error: "",
        value: simulateDividendReinvestment(input),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "입력값을 확인해주세요.",
        value: undefined,
      };
    }
  }, [
    values.annualGrowthRatePercent,
    values.dividendYieldPercent,
    values.exchangeRate,
    values.initialInvestmentKrw,
    values.monthlyContributionKrw,
    values.reinvestDividends,
    values.taxRatePercent,
    values.years,
  ]);

  function updateNumber(field: keyof DividendSimulationInput, value: number) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function updateTicker(ticker: string) {
    const nextEtf = getEtfByTicker(ticker);
    setValues((current) => ({
      ...current,
      selectedTicker: ticker,
      dividendYieldPercent: nextEtf?.dividendYieldPercent ?? current.dividendYieldPercent,
    }));
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">시뮬레이션 입력</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">ETF 선택</span>
            <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3" onChange={(event) => updateTicker(event.target.value)} value={values.selectedTicker}>
              {etfs.map((etf) => (
                <option key={etf.ticker} value={etf.ticker}>
                  {etf.ticker} · {etf.name}
                </option>
              ))}
            </select>
          </label>
          {numericFields.map((field) => (
            <label className="block" key={field.key}>
              <span className="text-sm font-semibold text-slate-800">{field.label}</span>
              <input
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
                max={field.max}
                min={field.min}
                onChange={(event) => updateNumber(field.key, Number(event.target.value))}
                step={field.step}
                type="number"
                value={values[field.key] as number}
              />
            </label>
          ))}
          <label className="flex items-center gap-3 rounded-md border border-slate-300 px-3 py-3">
            <input
              checked={values.reinvestDividends}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  reinvestDividends: event.target.checked,
                }))
              }
              type="checkbox"
            />
            <span className="text-sm font-semibold text-slate-800">배당 재투자</span>
          </label>
        </div>
      </section>
      <FormErrorMessage message={result.error} />
      {result.value ? <DividendSimulationResult result={result.value} /> : null}
    </div>
  );
}
