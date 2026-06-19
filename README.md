# Dividend Lab Korea

Dividend Lab Korea는 한국 투자자를 위한 미국주식 배당·ETF 계산기 MVP입니다.

## 벤치마킹 방향

- TradingView의 관심종목, 스크리너, 알림 구조
- Yahoo Finance의 종목 상세, 포트폴리오, 뉴스/캘린더 구조

초기 MVP는 한국 투자자가 빠르게 예상 배당금을 확인하고 관심 ETF를 다시 볼 수 있는 흐름에 집중합니다. 정적 ETF 데이터를 기반으로 ETF 비교와 랭킹/스크리너도 제공합니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버가 실행되면 `http://localhost:3000`에서 확인합니다.

## 폴더 구조

```text
docs/harness           MVP 하네스 문서
docs/output            진행 현황과 의사결정 로그
src/app                Next.js App Router 페이지
src/components         화면 컴포넌트
src/domain             배당, ETF, 관심종목 도메인 타입과 로직
src/data               정적 ETF 데이터
src/lib                공통 유틸리티
tests/e2e              E2E 테스트
```

## 1차 MVP 범위

- 배당금 계산기
- ETF 기본 데이터
- ETF 상세 페이지
- 관심종목 워치리스트
- ETF 비교 페이지
- ETF 랭킹/스크리너 페이지
- 배당 재투자 시뮬레이션
- 주요 페이지 SEO 메타데이터
- sitemap.xml / robots.txt

## 2차 MVP 후보

- ETF 비교 고도화
- 랭킹 필터 고도화
- SEO 페이지 확장

## 3차 MVP 후보

- 배당락/실적 캘린더
- 가격/배당 알림
- 뉴스 요약
- 포트폴리오 저장

## MVP 제외 범위

- 회원가입
- 로그인
- DB 저장
- 실시간 주가 API 연동
- 결제
- 관리자 페이지
- AI 뉴스 요약
- 증권사 연동
- 실제 푸시 알림
- 실시간 차트

## 검색 색인 준비

- `NEXT_PUBLIC_SITE_URL`이 있으면 sitemap과 robots에서 해당 도메인을 사용합니다.
- 환경변수가 없으면 `http://localhost:3000`을 기본 URL로 사용합니다.
- 배포 후 Google Search Console에 `/sitemap.xml`을 제출합니다.
