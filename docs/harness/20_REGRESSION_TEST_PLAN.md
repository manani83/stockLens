# 회귀 테스트 계획

## 1. 회귀 테스트 목적

Dividend Lab Korea MVP의 핵심 계산, 정적 데이터 조회, localStorage 저장 흐름, SEO helper가 변경 후에도 안정적으로 동작하는지 확인한다.

## 2. 테스트 대상 도메인

- dividend
- etf
- watchlist
- compare
- rankings
- simulation
- calendar
- alerts
- portfolio
- portfolioCalendar
- backup
- format
- seo
- siteUrl

## 3. 도메인별 핵심 테스트 목록

- dividend: 기본 배당 계산, 세율 0%, 배당률 0%, 잘못된 투자금/환율/세율, `normalizePercent`
- etf: 전체 조회, ticker 조회, 소문자 ticker, 없는 ticker, 카테고리 조회, 검색, 데이터 기준일
- watchlist: 추가, 중복 방지, 삭제, 조회, clear, JSON 오류, SSR 방어
- compare: pair 파싱, 잘못된 pair, 비교 결과, 비교 요약
- rankings: 배당률 정렬, 운용보수 정렬, 월배당 필터, 카테고리 필터, 위험도 필터, 고배당 필터
- simulation: 10년 시뮬레이션, 재투자 true/false, 월 추가 투자금, 최종 월 배당금, 잘못된 years, 음수 성장률
- calendar: 전체 이벤트, 날짜순 정렬, ticker 필터, 타입 필터, 날짜 범위, upcoming
- alerts: 추가, 삭제, toggle, ticker 조회, 잘못된 입력값, JSON 오류, clear
- portfolio: 추가, 삭제, 수정, 투자금 기준 요약, 수량/평단 기준 요약, 없는 ticker, clear
- portfolioCalendar: 포트폴리오 ticker 기준 필터, 빈 포트폴리오, upcoming, 요약, 다음 이벤트
- backup: 백업 생성, JSON 직렬화, 유효성 검증, 잘못된 JSON, Replace, Merge, 중복 제거
- format/seo/siteUrl: 원화/달러/퍼센트/ticker 포맷, SEO title/description, 기본 site URL, 환경변수 site URL

## 4. localStorage 테스트 주의사항

- 각 테스트 전에 localStorage mock을 새로 생성한다.
- 테스트 순서에 의존하지 않는다.
- JSON 파싱 오류 케이스를 별도로 검증한다.
- SSR 방어는 `window`가 없을 때 오류 없이 동작하는지 확인한다.

## 5. 날짜 기반 테스트 주의사항

- 현재 날짜에 의존하지 않고 `today` 파라미터를 사용한다.
- 날짜 문자열은 ISO `YYYY-MM-DD` 형식을 사용한다.
- upcoming 테스트는 고정된 기준일로 검증한다.

## 6. 릴리즈 전 테스트 명령어

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

현재 프로젝트에는 `lint` 스크립트가 있다.

## 7. 실패 시 대응 절차

1. 실패한 테스트가 요구사항을 올바르게 표현하는지 확인한다.
2. 테스트가 잘못되었으면 테스트를 수정하고 이유를 기록한다.
3. 구현 결함이면 최소 범위로 수정한다.
4. 같은 테스트를 다시 실행해 회귀가 해결됐는지 확인한다.
5. 마지막에 전체 테스트, lint, typecheck, build를 실행한다.

## 8. 향후 E2E 테스트 후보

- 배당 계산기 입력 후 결과 표시
- 관심종목 추가/삭제
- 비교 페이지 pair 이동
- 알림 규칙 추가/삭제
- 포트폴리오 추가 후 요약 갱신
- 백업 JSON 내보내기/가져오기
