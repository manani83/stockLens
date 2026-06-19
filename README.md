# Dividend Lab Korea

Dividend Lab Korea는 한국 투자자를 위한 미국주식 배당·ETF 계산기 MVP입니다.

## 벤치마킹 방향

- TradingView의 관심종목, 스크리너, 알림 구조
- Yahoo Finance의 종목 상세, 포트폴리오, 뉴스/캘린더 구조

초기 MVP는 한국 투자자가 빠르게 예상 배당금을 확인하고 관심 ETF를 다시 볼 수 있는 흐름에 집중합니다. 정적 ETF 데이터를 기반으로 ETF 비교와 랭킹/스크리너도 제공합니다.

## 운영/배포 문서

- [운영/배포 체크리스트](docs/harness/12_OPERATION_DEPLOY_CHECKLIST.md)
- [환경변수 가이드](docs/harness/14_ENVIRONMENT_VARIABLES.md)
- [투자 유의사항 가이드](docs/harness/13_LEGAL_DISCLAIMER_GUIDE.md)
- [데이터 업데이트 정책](docs/harness/11_DATA_UPDATE_POLICY.md)
- [수익화 준비 가이드](docs/harness/10_MONETIZATION_GUIDE.md)
- [알림 규칙 설계](docs/harness/15_ALERT_RULES_DESIGN.md)
- [포트폴리오 MVP 설계](docs/harness/16_PORTFOLIO_MVP_DESIGN.md)
- [localStorage 백업/복원 가이드](docs/harness/17_LOCAL_BACKUP_GUIDE.md)
- [UI/UX 정리 가이드](docs/harness/18_UI_UX_GUIDE.md)
- [성능/접근성/SEO 체크리스트](docs/harness/19_PERFORMANCE_ACCESSIBILITY_SEO_CHECKLIST.md)
- [회귀 테스트 계획](docs/harness/20_REGRESSION_TEST_PLAN.md)
- [데이터 소스 아키텍처](docs/harness/21_DATA_SOURCE_ARCHITECTURE.md)
- [외부 데이터 제공자 검토](docs/harness/22_EXTERNAL_DATA_PROVIDER_REVIEW.md)
- [분석 이벤트 명세](docs/harness/23_ANALYTICS_EVENT_SPEC.md)
- [분석 구현 가이드](docs/harness/24_ANALYTICS_IMPLEMENTATION_GUIDE.md)
- [콘텐츠 SEO 전략](docs/harness/25_CONTENT_SEO_STRATEGY.md)
- [콘텐츠 작성 가이드](docs/harness/26_CONTENT_WRITING_GUIDE.md)
- [실데이터 연동 후보 검토](docs/harness/27_REAL_DATA_INTEGRATION_REVIEW.md)
- [데이터 제공자 선택 기준](docs/harness/28_DATA_PROVIDER_SELECTION_CRITERIA.md)
- [데이터 라이선스 리스크 체크리스트](docs/harness/29_DATA_LICENSE_RISK_CHECKLIST.md)
- [수동 CSV 업데이트 가이드](docs/harness/30_MANUAL_CSV_UPDATE_GUIDE.md)
- [ETF CSV 스키마](docs/harness/31_ETF_CSV_SCHEMA.md)
- [콘텐츠 운영 플로우](docs/harness/32_CONTENT_OPERATION_FLOW.md)
- [ETF 데이터 운영 플로우](docs/harness/33_ETF_DATA_OPERATION_FLOW.md)
- [월간 운영 체크리스트](docs/harness/34_MONTHLY_OPERATION_CHECKLIST.md)
- [보안/개인정보 체크리스트](docs/harness/35_SECURITY_PRIVACY_CHECKLIST.md)
- [localStorage 개인정보 가이드](docs/harness/36_LOCAL_STORAGE_PRIVACY_GUIDE.md)
- [외부 스크립트 도입 정책](docs/harness/37_THIRD_PARTY_SCRIPT_POLICY.md)
- [오류/빈 상태 가이드](docs/harness/38_ERROR_EMPTY_STATE_GUIDE.md)
- [운영 런북](docs/output/OPERATION_RUNBOOK.md)
- [보안 점검 요약](docs/output/SECURITY_REVIEW_SUMMARY.md)
- [v0.1.0 릴리즈 요약](docs/output/v0.1.0_RELEASE_SUMMARY.md)
- [v0.1.0 배포 체크리스트](docs/output/v0.1.0_DEPLOYMENT_CHECKLIST.md)
- [v0.1.0 Sign-off](docs/output/v0.1.0_SIGN_OFF.md)
- [v0.1.0 배포 후 계획](docs/output/v0.1.0_POST_RELEASE_PLAN.md)
- [릴리즈 후보 문서](docs/output/RELEASE_CANDIDATE.md)
- [릴리즈 노트](docs/output/RELEASE_NOTES.md)
- [알려진 제한사항](docs/output/KNOWN_LIMITATIONS.md)
- [다음 단계](docs/output/NEXT_STEPS.md)

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버가 실행되면 `http://localhost:3000`에서 확인합니다.

## 테스트 방법

```bash
npm test
npm run lint
npm run typecheck
```

## 빌드 방법

```bash
npm run build
```

## 환경변수

- `NEXT_PUBLIC_SITE_URL`: sitemap, robots, metadata에 사용할 실제 사이트 URL입니다.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`: 향후 분석도구 provider 설정값입니다. 현재 기본값은 `None`입니다.
- 환경변수가 없으면 `http://localhost:3000`을 기본값으로 사용합니다.

API KEY는 클라이언트 환경변수나 코드에 포함하지 않습니다. 향후 외부 금융 API를 도입할 경우 서버 환경변수로만 관리합니다.

## 기술 스택

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vitest
- localStorage 기반 MVP 저장소

## 폴더 구조

```text
docs/harness           MVP 하네스 문서
docs/output            진행 현황과 의사결정 로그
src/app                Next.js App Router 페이지
src/components         화면 컴포넌트
src/domain             배당, ETF, 관심종목, CSV 검증 도메인 타입과 로직
src/data               정적 ETF 데이터
data/manual            수동 ETF 데이터 갱신용 CSV 템플릿
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
- 광고/제휴 placeholder와 제휴 고지 문구
- ETF 데이터 기준일과 정적 데이터 안내
- 배당락/실적 캘린더 정적 MVP
- 가격/배당 알림 규칙 localStorage MVP
- 포트폴리오 localStorage MVP
- 포트폴리오 배당 캘린더 연결
- localStorage 데이터 백업/복원
- UI/UX 공통 컴포넌트
- 실서비스 데이터 소스 추상화 설계
- 분석 이벤트 추상화 설계
- 정적 가이드 콘텐츠 구조
- 수동 ETF CSV import 검증 로직
- 콘텐츠/ETF 데이터 운영 플로우 문서
- 보안/개인정보 점검 문서
- 오류/404/빈 상태 공통 UI
- v0.1.0 배포 패키징 문서

## 주요 기능

- 투자금, 환율, 배당률, 세율 기반 예상 배당금 계산
- 주요 미국 배당 ETF 상세 정보와 비교
- ETF 랭킹/스크리너
- 관심종목, 알림 규칙, 포트폴리오 localStorage 저장
- 포트폴리오 기준 배당 캘린더
- localStorage 데이터 JSON 백업/복원
- 배당 ETF 가이드 콘텐츠
- SEO metadata, sitemap.xml, robots.txt

## 2차 MVP 후보

- ETF 비교 고도화
- 랭킹 필터 고도화
- SEO 페이지 확장
- 백업 파일 포맷 고도화

## 3차 MVP 후보

- 뉴스 요약
- 실시간 가격/배당 알림 발송
- 사용자 계정 기반 포트폴리오 저장

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

## 데이터 라이선스 주의사항

- 외부 금융 데이터는 상업적 사용, 재배포, 캐싱, 화면 표시 가능 여부를 확인한 뒤 사용해야 합니다.
- 라이선스가 불명확한 무료 API나 공개 웹 데이터는 핵심 계산과 광고 수익 페이지에 사용하지 않습니다.
- 현재 MVP는 실시간 API, 크롤링, API KEY 없이 정적 데이터와 수동 CSV 검증 구조만 제공합니다.

## localStorage 저장 항목

- `dividend-lab-watchlist`: 관심종목 ticker와 선택 memo
- `dividend-lab-alert-rules`: 알림 조건과 선택 memo
- `dividend-lab-portfolio`: 보유 ETF, 투자금, 수량, 평균단가, 선택 memo

이름, 이메일, 전화번호, 주소, 계좌번호, 증권사 로그인 정보는 저장하지 않습니다.

## 기능 페이지

- `/calendar`: 정적 예시 데이터 기반 배당락/실적 캘린더
- `/alerts`: 목표 가격, 배당률, 배당 일정 알림 조건 저장 MVP
- `/portfolio`: 보유 ETF 입력과 예상 세후 월 배당금 계산 MVP
- `/portfolio/calendar`: 저장 포트폴리오 기준 배당 캘린더
- `/settings/backup`: 관심종목, 알림 규칙, 포트폴리오 백업/복원
- `/guides`: 배당 ETF 교육용 가이드 목록
- `/guides/[slug]`: 정적 가이드 상세 페이지

## 검색 색인 준비

- `NEXT_PUBLIC_SITE_URL`이 있으면 sitemap과 robots에서 해당 도메인을 사용합니다.
- 환경변수가 없으면 `http://localhost:3000`을 기본 URL로 사용합니다.
- 배포 후 Google Search Console에 `/sitemap.xml`을 제출합니다.

## 데이터 최신성 안내

- ETF 데이터는 `src/data/etfData.ts`의 초기 MVP용 정적 데이터입니다.
- 각 ETF 데이터는 `dataAsOf`와 `dataNote`를 포함합니다.
- 실제 투자 전 운용사 공식 자료와 최신 공시를 반드시 확인해야 합니다.

## 투자 유의사항

- 본 사이트의 계산 결과, ETF 정보, 비교 결과, 랭킹 정보는 단순 참고용입니다.
- 실제 수익률, 배당금, 세금, 환율, 분배금 정책은 시장 상황과 운용사 정책에 따라 달라질 수 있습니다.
- 투자 판단의 최종 책임은 투자자 본인에게 있습니다.

## 알려진 제한사항

- 실시간 주가 API와 외부 금융 API를 연동하지 않습니다.
- 로그인, DB 저장, 서버 기반 알림은 제공하지 않습니다.
- 관심종목, 알림 규칙, 포트폴리오는 브라우저 localStorage에 저장됩니다.
- 브라우저 데이터 삭제 시 저장 정보가 사라질 수 있습니다.

## 수익화 준비

- 현재는 광고 placeholder와 제휴 고지 문구만 제공합니다.
- 실제 애드센스 코드, 광고 스크립트, 제휴 URL은 포함하지 않습니다.
- 특정 증권사나 상품을 추천하지 않습니다.

## 다음 계획

- 실제 ETF 데이터 수동 검증
- CSV 업데이트 프로세스 리허설
- 환율 데이터 연동 후보 검토
- 가이드 콘텐츠 추가
- GA4/GTM과 광고/제휴 실제 도입 여부 검토
