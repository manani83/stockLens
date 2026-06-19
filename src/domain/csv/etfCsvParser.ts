import type { ETFCategory, ETFDividendInfo, ETFRiskLevel, PayoutCycle } from "../etf/etfTypes";
import type { CsvParseError, CsvParseResult, EtfCsvRow } from "./csvTypes";

const REQUIRED_HEADERS = [
  "ticker",
  "name",
  "issuer",
  "category",
  "dividendYieldPercent",
  "expenseRatioPercent",
  "payoutCycle",
  "riskLevel",
  "description",
  "strengths",
  "weaknesses",
  "suitableFor",
  "dataAsOf",
  "dataNote",
] as const;

const ALLOWED_CATEGORIES: ETFCategory[] = [
  "DividendGrowth",
  "CoveredCall",
  "BroadMarket",
  "Technology",
  "Bond",
  "REIT",
  "Unknown",
];

const ALLOWED_PAYOUT_CYCLES: PayoutCycle[] = [
  "Monthly",
  "Quarterly",
  "SemiAnnual",
  "Annual",
  "Unknown",
];

const ALLOWED_RISK_LEVELS: ETFRiskLevel[] = ["Low", "Medium", "High", "Unknown"];

export function parseEtfCsv(csvText: string): CsvParseResult<ETFDividendInfo> {
  const trimmedText = csvText.trim();

  if (!trimmedText) {
    return {
      success: false,
      rows: [],
      errors: [{ rowNumber: 1, message: "CSV 내용이 비어 있습니다." }],
    };
  }

  const lines = trimmedText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const headers = splitSimpleCsvLine(lines[0]);
  const errors = validateEtfCsvHeaders(headers);

  if (errors.length > 0) {
    return { success: false, rows: [], errors };
  }

  const rows: ETFDividendInfo[] = [];

  lines.slice(1).forEach((line, index) => {
    const rowNumber = index + 2;
    const values = splitSimpleCsvLine(line);
    const csvRow = mapValuesToEtfCsvRow(headers, values);
    const rowErrors = validateEtfCsvRow(csvRow, rowNumber);

    errors.push(...rowErrors);

    if (rowErrors.length === 0) {
      rows.push(toEtfDividendInfo(csvRow));
    }
  });

  return {
    success: errors.length === 0,
    rows,
    errors,
  };
}

export function validateEtfCsvHeaders(headers: string[]): CsvParseError[] {
  const normalizedHeaders = new Set(headers.map((header) => header.trim()));

  return REQUIRED_HEADERS.filter((header) => !normalizedHeaders.has(header)).map((header) => ({
    rowNumber: 1,
    field: header,
    message: "필수 컬럼이 누락되었습니다.",
  }));
}

export function parseSemicolonList(value: string): string[] {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parsePercentNumber(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function validateEtfCsvRow(row: EtfCsvRow, rowNumber: number): CsvParseError[] {
  const errors: CsvParseError[] = [];

  addRequiredError(errors, rowNumber, "ticker", row.ticker);
  addRequiredError(errors, rowNumber, "name", row.name);
  addRequiredError(errors, rowNumber, "issuer", row.issuer);
  addRequiredError(errors, rowNumber, "category", row.category);
  addRequiredError(errors, rowNumber, "payoutCycle", row.payoutCycle);
  addRequiredError(errors, rowNumber, "riskLevel", row.riskLevel);
  addRequiredError(errors, rowNumber, "dataAsOf", row.dataAsOf);

  if (row.dividendYieldPercent.trim() && parsePercentNumber(row.dividendYieldPercent) === undefined) {
    errors.push({ rowNumber, field: "dividendYieldPercent", message: "숫자 형식이어야 합니다." });
  }

  if (row.expenseRatioPercent.trim() && parsePercentNumber(row.expenseRatioPercent) === undefined) {
    errors.push({ rowNumber, field: "expenseRatioPercent", message: "숫자 형식이어야 합니다." });
  }

  if (row.dividendYieldPercent.trim() === "") {
    errors.push({ rowNumber, field: "dividendYieldPercent", message: "필수값입니다." });
  }

  if (row.expenseRatioPercent.trim() === "") {
    errors.push({ rowNumber, field: "expenseRatioPercent", message: "필수값입니다." });
  }

  if (row.category.trim() && !ALLOWED_CATEGORIES.includes(row.category.trim() as ETFCategory)) {
    errors.push({ rowNumber, field: "category", message: "허용되지 않은 category 값입니다." });
  }

  if (row.payoutCycle.trim() && !ALLOWED_PAYOUT_CYCLES.includes(row.payoutCycle.trim() as PayoutCycle)) {
    errors.push({ rowNumber, field: "payoutCycle", message: "허용되지 않은 payoutCycle 값입니다." });
  }

  if (row.riskLevel.trim() && !ALLOWED_RISK_LEVELS.includes(row.riskLevel.trim() as ETFRiskLevel)) {
    errors.push({ rowNumber, field: "riskLevel", message: "허용되지 않은 riskLevel 값입니다." });
  }

  return errors;
}

function addRequiredError(
  errors: CsvParseError[],
  rowNumber: number,
  field: keyof EtfCsvRow,
  value: string,
) {
  if (!value.trim()) {
    errors.push({ rowNumber, field, message: "필수값입니다." });
  }
}

function splitSimpleCsvLine(line: string): string[] {
  return line.split(",").map((value) => value.trim());
}

function mapValuesToEtfCsvRow(headers: string[], values: string[]): EtfCsvRow {
  const valuesByHeader = new Map(headers.map((header, index) => [header, values[index] ?? ""]));

  return {
    ticker: valuesByHeader.get("ticker") ?? "",
    name: valuesByHeader.get("name") ?? "",
    issuer: valuesByHeader.get("issuer") ?? "",
    category: valuesByHeader.get("category") ?? "",
    dividendYieldPercent: valuesByHeader.get("dividendYieldPercent") ?? "",
    expenseRatioPercent: valuesByHeader.get("expenseRatioPercent") ?? "",
    payoutCycle: valuesByHeader.get("payoutCycle") ?? "",
    riskLevel: valuesByHeader.get("riskLevel") ?? "",
    description: valuesByHeader.get("description") ?? "",
    strengths: valuesByHeader.get("strengths") ?? "",
    weaknesses: valuesByHeader.get("weaknesses") ?? "",
    suitableFor: valuesByHeader.get("suitableFor") ?? "",
    dataAsOf: valuesByHeader.get("dataAsOf") ?? "",
    dataNote: valuesByHeader.get("dataNote") ?? "",
  };
}

function toEtfDividendInfo(row: EtfCsvRow): ETFDividendInfo {
  return {
    ticker: row.ticker.trim().toUpperCase(),
    name: row.name.trim(),
    issuer: row.issuer.trim(),
    category: row.category.trim() as ETFCategory,
    dividendYieldPercent: parsePercentNumber(row.dividendYieldPercent) ?? 0,
    expenseRatioPercent: parsePercentNumber(row.expenseRatioPercent) ?? 0,
    payoutCycle: row.payoutCycle.trim() as PayoutCycle,
    riskLevel: row.riskLevel.trim() as ETFRiskLevel,
    description: row.description.trim(),
    strengths: parseSemicolonList(row.strengths),
    weaknesses: parseSemicolonList(row.weaknesses),
    suitableFor: parseSemicolonList(row.suitableFor),
    dataAsOf: row.dataAsOf.trim(),
    dataNote: row.dataNote.trim(),
  };
}
