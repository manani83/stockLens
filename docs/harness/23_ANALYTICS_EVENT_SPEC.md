# 분석 이벤트 명세

## 1. 이벤트 트래킹 목적

- 어떤 기능이 자주 사용되는지 확인한다.
- 배당 계산, ETF 비교, 포트폴리오, 백업/복원 같은 핵심 흐름의 사용성을 개선한다.
- 광고/제휴 영역을 실제 적용하기 전 사용자 흐름을 파악한다.

## 2. 개인정보 수집 금지 원칙

- 이름, 이메일, 계좌 정보 등 개인정보를 수집하지 않는다.
- 사용자가 입력한 메모를 전송하지 않는다.
- localStorage 원문 데이터나 백업 파일 내용을 전송하지 않는다.
- 투자금 원문 같은 민감할 수 있는 값은 무분별하게 전송하지 않는다.

## 3. 추적할 이벤트 목록

- `DividendCalculated`
- `ETFViewed`
- `WatchlistAdded`
- `WatchlistRemoved`
- `ETFCompared`
- `RankingViewed`
- `SimulationCalculated`
- `CalendarViewed`
- `AlertRuleCreated`
- `PortfolioHoldingAdded`
- `BackupExported`
- `BackupImported`
- `AffiliateBoxViewed`
- `AdPlaceholderViewed`

## 4. 이벤트별 payload 예시

- `DividendCalculated`: `ticker`, `value`, `page`
- `ETFViewed`: `ticker`, `page`
- `WatchlistAdded`: `ticker`
- `ETFCompared`: `tickerA`, `tickerB`
- `SimulationCalculated`: `ticker`, `value`
- `PortfolioHoldingAdded`: `ticker`
- `BackupExported`: `page`
- `BackupImported`: `page`

## 5. 전환 지표 후보

- 배당 계산 완료 수
- ETF 상세 페이지 조회 수
- ETF 비교 완료 수
- 관심종목 추가 수
- 포트폴리오 보유 항목 추가 수
- 백업 내보내기/가져오기 사용 수
