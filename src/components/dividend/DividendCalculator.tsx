"use client";

import { useMemo, useState } from "react";
import {
  calculateDividend,
  validateDividendInput,
} from "@/domain/dividend/dividendCalculator";
import type { DividendInput } from "@/domain/dividend/dividendTypes";
import { getEtfByTicker } from "@/domain/etf/etfRepository";
import { formatPercent } from "@/lib/format";
import { FormErrorMessage } from "../common";
import { ETFSelect } from "../etf";
import { DividendDisclaimer } from "./DividendDisclaimer";
import {
  DividendInputForm,
  type DividendInputFormValues,
} from "./DividendInputForm";
import { DividendResultCard } from "./DividendResultCard";

const DEFAULT_TICKER = "SCHD";
const DEFAULT_ETF = getEtfByTicker(DEFAULT_TICKER);

const initialValues: DividendInputFormValues = {
  investmentKrw: 10_000_000,
  exchangeRate: 1350,
  dividendYieldPercent: DEFAULT_ETF?.dividendYieldPercent ?? 0,
  taxRatePercent: 15,
};

type DividendCalculatorProps = {
  initialTicker?: string;
};

export function DividendCalculator({ initialTicker = DEFAULT_TICKER }: DividendCalculatorProps) {
  const normalizedInitialTicker = initialTicker.trim().toUpperCase();
  const initialEtf = getEtfByTicker(normalizedInitialTicker) ?? DEFAULT_ETF;
  const [selectedTicker, setSelectedTicker] = useState(
    initialEtf?.ticker ?? DEFAULT_TICKER,
  );
  const [values, setValues] = useState<DividendInputFormValues>({
    ...initialValues,
    dividendYieldPercent: initialEtf?.dividendYieldPercent ?? initialValues.dividendYieldPercent,
  });

  const selectedEtf = getEtfByTicker(selectedTicker);

  const input: DividendInput = values;
  const validationErrors = validateDividendInput(input);

  const result = useMemo(() => {
    if (validationErrors.length > 0) {
      return undefined;
    }

    return calculateDividend(input);
  }, [input, validationErrors.length]);

  function handleTickerChange(ticker: string) {
    const nextEtf = getEtfByTicker(ticker);

    setSelectedTicker(ticker);
    setValues((currentValues) => ({
      ...currentValues,
      dividendYieldPercent: nextEtf?.dividendYieldPercent ?? currentValues.dividendYieldPercent,
    }));
  }

  function handleValueChange(field: keyof DividendInputFormValues, value: number) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">Dividend Calculator</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">배당금 계산기</h2>
        </div>
        {selectedEtf ? (
          <p className="text-sm text-slate-600">
            기본 배당률 {formatPercent(selectedEtf.dividendYieldPercent)}
          </p>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5">
        <ETFSelect selectedTicker={selectedTicker} onChange={handleTickerChange} />
        <DividendInputForm values={values} onChange={handleValueChange} />

        <FormErrorMessage message={validationErrors.map((error) => error.message).join(" ")} />

        {result ? <DividendResultCard result={result} /> : null}
        <DividendDisclaimer />
      </div>
    </section>
  );
}
