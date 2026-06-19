"use client";

export type DividendInputFormValues = {
  investmentKrw: number;
  exchangeRate: number;
  dividendYieldPercent: number;
  taxRatePercent: number;
};

type DividendInputFormProps = {
  values: DividendInputFormValues;
  onChange: (field: keyof DividendInputFormValues, value: number) => void;
};

const fields: Array<{
  key: keyof DividendInputFormValues;
  label: string;
  suffix: string;
  min: number;
  step: number;
}> = [
  { key: "investmentKrw", label: "투자금", suffix: "KRW", min: 0, step: 10000 },
  { key: "exchangeRate", label: "환율", suffix: "KRW/USD", min: 0, step: 1 },
  { key: "dividendYieldPercent", label: "배당률", suffix: "%", min: 0, step: 0.01 },
  { key: "taxRatePercent", label: "세율", suffix: "%", min: 0, step: 0.01 },
];

export function DividendInputForm({ values, onChange }: DividendInputFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <label className="block" key={field.key}>
          <span className="text-sm font-semibold text-slate-800">{field.label}</span>
          <div className="mt-2 flex overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20">
            <input
              className="min-w-0 flex-1 px-3 py-3 text-base text-slate-950 outline-none"
              min={field.min}
              onChange={(event) => onChange(field.key, Number(event.target.value))}
              step={field.step}
              type="number"
              value={values[field.key]}
            />
            <span className="flex items-center border-l border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
              {field.suffix}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
