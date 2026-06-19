"use client";

import { useEffect, useState } from "react";
import {
  getAlertRules,
  removeAlertRule,
  toggleAlertRule,
} from "@/domain/alerts/alertService";
import type { AlertRule } from "@/domain/alerts/alertTypes";
import { EmptyState } from "../common";
import { ALERT_RULES_UPDATED_EVENT } from "./AlertRuleForm";
import { AlertRuleCard } from "./AlertRuleCard";

export function AlertRuleList() {
  const [rules, setRules] = useState<AlertRule[]>([]);

  function refreshRules() {
    setRules(getAlertRules());
  }

  useEffect(() => {
    queueMicrotask(refreshRules);
    window.addEventListener(ALERT_RULES_UPDATED_EVENT, refreshRules);
    window.addEventListener("storage", refreshRules);

    return () => {
      window.removeEventListener(ALERT_RULES_UPDATED_EVENT, refreshRules);
      window.removeEventListener("storage", refreshRules);
    };
  }, []);

  function handleRemove(id: string) {
    removeAlertRule(id);
    refreshRules();
  }

  function handleToggle(id: string) {
    toggleAlertRule(id);
    refreshRules();
  }

  if (rules.length === 0) {
    return (
      <EmptyState
        title="저장된 알림 규칙이 없습니다."
        description="목표 가격, 배당률, 배당 일정 조건을 저장해둘 수 있습니다."
      />
    );
  }

  return (
    <section className="grid gap-4">
      {rules.map((rule) => (
        <AlertRuleCard
          key={rule.id}
          onRemove={handleRemove}
          onToggle={handleToggle}
          rule={rule}
        />
      ))}
    </section>
  );
}
