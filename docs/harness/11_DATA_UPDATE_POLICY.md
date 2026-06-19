# ETF 데이터 업데이트 정책

## 1. 현재 데이터 관리 방식

- ETF 데이터는 정적 데이터로 관리한다.
- 데이터 파일은 `src/data/etfData.ts`이다.
- 현재 값은 초기 MVP용 참고 데이터이며 실제 투자 판단 전에 검증이 필요하다.

## 2. 데이터 항목

- `ticker`
- `name`
- `issuer`
- `category`
- `dividendYieldPercent`
- `expenseRatioPercent`
- `payoutCycle`
- `riskLevel`
- `description`
- `strengths`
- `weaknesses`
- `suitableFor`
- `dataAsOf`
- `dataNote`

## 3. 업데이트 주기 후보

- 초기: 수동 업데이트
- 이후: 월 1회 수동 검증
- 장기: 외부 API 또는 크롤링 기반 자동 업데이트 검토

## 4. 검증 기준

- 운용사 공식 페이지
- ETF 공식 문서
- 배당/분배금 공시
- 수수료 정보
- 주요 금융 데이터 제공 사이트

## 5. 사용자 안내 원칙

- 데이터는 참고용임을 명시한다.
- 투자 전 공식 자료 확인을 안내한다.
- 수익률 보장 표현을 사용하지 않는다.
- 업데이트 기준일을 표시한다.

## 6. 향후 자동화 후보

- ETF 데이터 업데이트 배치
- 배당률 자동 갱신
- 분배금 캘린더 연동
- 데이터 변경 이력 관리
