import { describe, expect, it } from "vitest";
import {
  formatKrw,
  formatNumber,
  formatPercent,
  formatTicker,
  formatUsd,
  safeNumber,
} from "./format";

describe("format utilities", () => {
  it("원화 포맷", () => {
    expect(formatKrw(1_000_000)).toBe("₩1,000,000");
    expect(formatKrw(35_416.666)).toBe("₩35,417");
  });

  it("달러 포맷", () => {
    expect(formatUsd(7407.407)).toBe("$7,407.41");
    expect(formatUsd(26.234)).toBe("$26.23");
  });

  it("퍼센트 포맷", () => {
    expect(formatPercent(5)).toBe("5.00%");
    expect(formatPercent(3.789)).toBe("3.79%");
  });

  it("ticker 대문자 변환", () => {
    expect(formatTicker("schd")).toBe("SCHD");
  });

  it("ticker 공백 제거", () => {
    expect(formatTicker(" schd ")).toBe("SCHD");
  });

  it("일반 숫자 콤마 처리", () => {
    expect(formatNumber(1_000_000)).toBe("1,000,000");
  });

  it("safeNumber 정상 변환", () => {
    expect(safeNumber("1000")).toBe(1000);
    expect(safeNumber(42)).toBe(42);
  });

  it("safeNumber fallback 반환", () => {
    expect(safeNumber("abc")).toBe(0);
    expect(safeNumber(undefined)).toBe(0);
    expect(safeNumber("abc", 10)).toBe(10);
  });
});
