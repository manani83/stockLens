export type AlertRuleType =
  | "TargetPriceBelow"
  | "TargetPriceAbove"
  | "DividendYieldAbove"
  | "ExDividendDateUpcoming"
  | "PaymentDateUpcoming";

export type AlertRule = {
  id: string;
  ticker: string;
  ruleType: AlertRuleType;
  targetValue?: number;
  daysBefore?: number;
  enabled: boolean;
  createdAt: string;
  memo?: string;
};

export type AlertRuleInput = {
  ticker: string;
  ruleType: AlertRuleType;
  targetValue?: number;
  daysBefore?: number;
  memo?: string;
};

export type AlertRuleActionResult = {
  success: boolean;
  message?: string;
  rules?: AlertRule[];
};
