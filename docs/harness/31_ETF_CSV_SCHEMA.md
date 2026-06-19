# ETF CSV 스키마

## 1. 전체 컬럼

| 컬럼 | 필수 | 타입 | 예시 |
|---|---|---|---|
| ticker | 예 | string | SCHD |
| name | 예 | string | Schwab U.S. Dividend Equity ETF |
| issuer | 예 | string | Charles Schwab |
| category | 예 | enum | DividendGrowth |
| dividendYieldPercent | 예 | number | 3.5 |
| expenseRatioPercent | 예 | number | 0.06 |
| payoutCycle | 예 | enum | Quarterly |
| riskLevel | 예 | enum | Medium |
| description | 아니오 | string | 미국 배당 성장주에 투자하는 ETF입니다. |
| strengths | 아니오 | string[] | 낮은 운용보수;배당성장 성격 |
| weaknesses | 아니오 | string[] | 시장 하락 위험 존재 |
| suitableFor | 아니오 | string[] | 장기 배당 성장 투자자 |
| dataAsOf | 예 | date string | 2026-06-01 |
| dataNote | 아니오 | string | 초기 MVP용 정적 데이터이며 추후 검증 필요 |

## 2. 배열형 필드 작성 방식

- `strengths`, `weaknesses`, `suitableFor`는 세미콜론 `;`으로 구분한다.
- 앞뒤 공백은 parser에서 제거한다.
- 빈 항목은 제외한다.
- 예: `낮은 운용보수;배당성장 성격;장기 투자 적합`

## 3. 허용 category 값

- `DividendGrowth`
- `CoveredCall`
- `BroadMarket`
- `Technology`
- `Bond`
- `REIT`
- `Unknown`

## 4. 허용 payoutCycle 값

- `Monthly`
- `Quarterly`
- `SemiAnnual`
- `Annual`
- `Unknown`

## 5. 허용 riskLevel 값

- `Low`
- `Medium`
- `High`
- `Unknown`

## 6. 검증 오류 예시

| 상황 | 오류 |
|---|---|
| `ticker` 빈 값 | `ticker` 필수값 오류 |
| `dividendYieldPercent`가 `abc` | 숫자 형식 오류 |
| `expenseRatioPercent` 빈 값 | 필수값 오류 |
| `category`가 허용 목록 밖 | 허용되지 않은 category 값 |
| `dataAsOf` 빈 값 | 필수값 오류 |
| 필수 헤더 누락 | 필수 컬럼 누락 오류 |

## 7. 제한사항

- 단순 CSV만 지원한다.
- 쉼표가 포함된 복잡한 quoted CSV는 지원하지 않는다.
- 파일 업로드 UI, 관리자 화면, DB 저장은 지원하지 않는다.
