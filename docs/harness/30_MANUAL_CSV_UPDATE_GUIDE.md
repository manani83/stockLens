# 수동 CSV 업데이트 가이드

## 1. 목적

관리자 페이지, 서버 업로드, DB 저장 없이 개발자가 ETF 데이터를 수동으로 검증하고 갱신하기 위한 절차를 정리한다. CSV는 `src/data/etfData.ts`를 자동 수정하지 않으며, 반영 전 검증용 입력 형식으로 사용한다.

## 2. CSV 템플릿 위치

- 템플릿: `data/manual/etf-data-template.csv`
- 스키마: `docs/harness/31_ETF_CSV_SCHEMA.md`
- parser: `src/domain/csv/etfCsvParser.ts`
- 테스트: `src/domain/csv/etfCsvParser.test.ts`

## 3. 업데이트 절차

1. 운용사 공식 자료와 최신 공시를 확인한다.
2. `data/manual/etf-data-template.csv`를 복사해 작업용 CSV를 만든다.
3. ETF별 배당률, 운용보수, 지급 주기, 설명, 위험도를 갱신한다.
4. `dataAsOf`를 실제 확인 기준일로 갱신한다.
5. CSV parser 테스트를 실행해 스키마 오류를 확인한다.
6. 검증된 값을 사람이 `src/data/etfData.ts`에 반영한다.
7. `docs/output/decision-log.md`에 변경 사유와 기준일을 기록한다.

## 4. 검증 방법

```bash
npm test -- src/domain/csv/etfCsvParser.test.ts
npm test
npm run build
```

## 5. `src/data/etfData.ts` 반영 방법

- CSV 검증 결과를 그대로 자동 적용하지 않는다.
- 변경 전후 수치를 사람이 비교한다.
- `dividendYieldPercent`, `expenseRatioPercent`, `payoutCycle`, `riskLevel`, `dataAsOf`, `dataNote`를 특히 확인한다.
- 화면 표시 문구가 투자 추천처럼 보이지 않는지 확인한다.

## 6. 주의사항

- CSV parser는 단순 CSV만 지원한다.
- 쉼표가 포함된 텍스트와 quoted CSV는 이번 MVP에서 지원하지 않는다.
- 배열형 필드는 세미콜론 `;`으로 구분한다.
- 공식 데이터 확인 후 반영한다.
- `dataAsOf`는 필수로 갱신한다.
- 실시간 API 연동, 업로드 UI, DB 저장은 이 절차에 포함하지 않는다.
