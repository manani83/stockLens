export type CsvParseError = {
  rowNumber: number;
  field?: string;
  message: string;
};

export type CsvParseResult<T> = {
  success: boolean;
  rows: T[];
  errors: CsvParseError[];
};

export type EtfCsvRow = {
  ticker: string;
  name: string;
  issuer: string;
  category: string;
  dividendYieldPercent: string;
  expenseRatioPercent: string;
  payoutCycle: string;
  riskLevel: string;
  description: string;
  strengths: string;
  weaknesses: string;
  suitableFor: string;
  dataAsOf: string;
  dataNote: string;
};
