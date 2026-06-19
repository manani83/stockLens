import { describe, expect, it } from "vitest";
import {
  parseEtfCsv,
  parsePercentNumber,
  parseSemicolonList,
  validateEtfCsvHeaders,
} from "./etfCsvParser";

const validHeader =
  "ticker,name,issuer,category,dividendYieldPercent,expenseRatioPercent,payoutCycle,riskLevel,description,strengths,weaknesses,suitableFor,dataAsOf,dataNote";

const validSchdRow =
  "SCHD,Schwab U.S. Dividend Equity ETF,Charles Schwab,DividendGrowth,3.5,0.06,Quarterly,Medium,Dividend growth ETF,Low expense;Dividend growth,Lower income;Market risk,Long-term investor;Cost-aware investor,2026-06-01,Static MVP data";

describe("etfCsvParser", () => {
  it("정상 CSV를 ETF 데이터로 파싱한다", () => {
    const result = parseEtfCsv(`${validHeader}\n${validSchdRow}`);

    expect(result.success).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]).toMatchObject({
      ticker: "SCHD",
      name: "Schwab U.S. Dividend Equity ETF",
      issuer: "Charles Schwab",
      category: "DividendGrowth",
      dividendYieldPercent: 3.5,
      expenseRatioPercent: 0.06,
      payoutCycle: "Quarterly",
      riskLevel: "Medium",
      dataAsOf: "2026-06-01",
      dataNote: "Static MVP data",
    });
    expect(result.rows[0].strengths).toEqual(["Low expense", "Dividend growth"]);
  });

  it("누락된 헤더를 오류로 반환한다", () => {
    const errors = validateEtfCsvHeaders(["ticker", "name"]);

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rowNumber: 1,
          field: "issuer",
          message: "필수 컬럼이 누락되었습니다.",
        }),
      ]),
    );
  });

  it("숫자 필드가 숫자가 아니면 오류로 반환한다", () => {
    const invalidRow =
      "SCHD,Schwab U.S. Dividend Equity ETF,Charles Schwab,DividendGrowth,not-number,0.06,Quarterly,Medium,Dividend growth ETF,Low expense,Market risk,Long-term investor,2026-06-01,Static MVP data";

    const result = parseEtfCsv(`${validHeader}\n${invalidRow}`);

    expect(result.success).toBe(false);
    expect(result.rows).toEqual([]);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rowNumber: 2,
          field: "dividendYieldPercent",
          message: "숫자 형식이어야 합니다.",
        }),
      ]),
    );
  });

  it("필수값이 비어 있으면 오류로 반환한다", () => {
    const invalidRow =
      ",Schwab U.S. Dividend Equity ETF,Charles Schwab,DividendGrowth,3.5,0.06,Quarterly,Medium,Dividend growth ETF,Low expense,Market risk,Long-term investor,2026-06-01,Static MVP data";

    const result = parseEtfCsv(`${validHeader}\n${invalidRow}`);

    expect(result.success).toBe(false);
    expect(result.rows).toEqual([]);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rowNumber: 2,
          field: "ticker",
          message: "필수값입니다.",
        }),
      ]),
    );
  });

  it("세미콜론 리스트를 공백 제거 후 빈 값 없이 파싱한다", () => {
    expect(parseSemicolonList(" 낮은 운용보수 ; 배당성장 성격 ; ; 장기 투자 적합 ")).toEqual([
      "낮은 운용보수",
      "배당성장 성격",
      "장기 투자 적합",
    ]);
  });

  it("percent 문자열을 숫자로 변환하고 실패 시 undefined를 반환한다", () => {
    expect(parsePercentNumber("3.5")).toBe(3.5);
    expect(parsePercentNumber(" 0.06 ")).toBe(0.06);
    expect(parsePercentNumber("abc")).toBeUndefined();
    expect(parsePercentNumber("")).toBeUndefined();
  });

  it("빈 CSV를 오류로 반환한다", () => {
    const result = parseEtfCsv("");

    expect(result.success).toBe(false);
    expect(result.rows).toEqual([]);
    expect(result.errors).toEqual([
      {
        rowNumber: 1,
        message: "CSV 내용이 비어 있습니다.",
      },
    ]);
  });

  it("일부 행에 오류가 있어도 정상 행은 반환한다", () => {
    const invalidRow =
      "BAD,Bad ETF,Issuer,CoveredCall,nope,0.6,Monthly,High,Bad row,Strength,Weakness,Suitable,2026-06-01,Static MVP data";

    const result = parseEtfCsv(`${validHeader}\n${validSchdRow}\n${invalidRow}`);

    expect(result.success).toBe(false);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].ticker).toBe("SCHD");
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rowNumber: 3,
          field: "dividendYieldPercent",
        }),
      ]),
    );
  });
});
