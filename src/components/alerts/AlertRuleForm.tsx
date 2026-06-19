"use client";

import { useState } from "react";
import { addAlertRule } from "@/domain/alerts/alertService";
import type { AlertRuleInput, AlertRuleType } from "@/domain/alerts/alertTypes";
import { getAllEtfs } from "@/domain/etf/etfRepository";
import { FormErrorMessage } from "../common";
import { alertRuleTypeLabels } from "./AlertRuleCard";

export const ALERT_RULES_UPDATED_EVENT = "dividend-lab-alert-rules-updated";

const ruleTypes: AlertRuleType[] = [
  "TargetPriceBelow",
  "TargetPriceAbove",
  "DividendYieldAbove",
  "ExDividendDateUpcoming",
  "PaymentDateUpcoming",
];

const defaultRuleType: AlertRuleType = "TargetPriceBelow";

export function AlertRuleForm() {
  const etfs = getAllEtfs();
  const [values, setValues] = useState<AlertRuleInput>({
    ticker: etfs[0]?.ticker ?? "SCHD",
    ruleType: defaultRuleType,
    targetValue: 70,
    daysBefore: 7,
    memo: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const usesDaysBefore = ["ExDividendDateUpcoming", "PaymentDateUpcoming"].includes(
    values.ruleType,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = addAlertRule({
      ticker: values.ticker,
      ruleType: values.ruleType,
      targetValue: usesDaysBefore ? undefined : values.targetValue,
      daysBefore: usesDaysBefore ? values.daysBefore : undefined,
      memo: values.memo,
    });

    setMessage(result.message ?? "");
    setIsError(!result.success);

    if (result.success) {
      window.dispatchEvent(new Event(ALERT_RULES_UPDATED_EVENT));
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-950">알림 규칙 추가</h2>
      <form className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">ticker 선택</span>
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
          <span className="text-sm font-semibold text-slate-800">알림 유형</span>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                ruleType: event.target.value as AlertRuleType,
              }))
            }
            value={values.ruleType}
          >
            {ruleTypes.map((ruleType) => (
              <option key={ruleType} value={ruleType}>
                {alertRuleTypeLabels[ruleType]}
              </option>
            ))}
          </select>
        </label>
        {usesDaysBefore ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">daysBefore</span>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
              max={365}
              min={1}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  daysBefore: Number(event.target.value),
                }))
              }
              type="number"
              value={values.daysBefore ?? 7}
            />
          </label>
        ) : (
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">targetValue</span>
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3"
              min={0}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  targetValue: Number(event.target.value),
                }))
              }
              step="0.01"
              type="number"
              value={values.targetValue ?? 0}
            />
          </label>
        )}
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-slate-800">memo</span>
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
