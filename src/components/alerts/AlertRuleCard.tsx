"use client";

import type { AlertRule, AlertRuleType } from "@/domain/alerts/alertTypes";

export const alertRuleTypeLabels: Record<AlertRuleType, string> = {
  TargetPriceBelow: "목표 가격 이하",
  TargetPriceAbove: "목표 가격 이상",
  DividendYieldAbove: "배당률 이상",
  ExDividendDateUpcoming: "배당락일 N일 전",
  PaymentDateUpcoming: "배당 지급일 N일 전",
};

type AlertRuleCardProps = {
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  rule: AlertRule;
};

export function AlertRuleCard({ onRemove, onToggle, rule }: AlertRuleCardProps) {
  const conditionText =
    rule.targetValue !== undefined
      ? `${rule.targetValue}`
      : rule.daysBefore !== undefined
        ? `${rule.daysBefore}일 전`
        : "조건 미지정";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">{rule.ticker}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">
            {alertRuleTypeLabels[rule.ruleType]}
          </h3>
          <p className="mt-2 text-sm text-slate-600">조건: {conditionText}</p>
          <p className="mt-1 text-sm text-slate-600">
            상태: {rule.enabled ? "활성" : "비활성"}
          </p>
          {rule.memo ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{rule.memo}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            onClick={() => onToggle(rule.id)}
            type="button"
          >
            {rule.enabled ? "비활성" : "활성"}
          </button>
          <button
            className="rounded-md border border-rose-300 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-50"
            onClick={() => onRemove(rule.id)}
            type="button"
          >
            삭제
          </button>
        </div>
      </div>
    </article>
  );
}
