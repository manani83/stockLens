# 운영 런북

## 1. 운영 개요

Dividend Lab Korea는 정적 ETF 데이터, localStorage 기반 사용자 기능, 정적 가이드 콘텐츠로 구성된 MVP다. 운영자는 ETF 데이터 기준일, 콘텐츠 품질, SEO 색인, 배포 전 검증을 주기적으로 확인한다.

## 2. 월간 점검 순서

1. ETF 데이터 기준일과 주요 수치를 확인한다.
2. 배당 캘린더 예시 데이터와 안내 문구를 확인한다.
3. 신규 가이드 주제를 검토한다.
4. sitemap과 주요 페이지 metadata를 확인한다.
5. `npm test`, `npm run lint`, `npm run build`를 실행한다.
6. 배포 후 주요 URL 응답을 확인한다.

## 3. ETF 데이터 수정 순서

1. 운용사 공식 자료와 최신 공시를 확인한다.
2. CSV 템플릿에 변경 값을 정리한다.
3. CSV parser 테스트로 형식을 확인한다.
4. `src/data/etfData.ts`에 사람이 반영한다.
5. 테스트와 build를 실행한다.
6. `docs/output/decision-log.md`에 변경 이유와 기준일을 기록한다.

## 4. 가이드 콘텐츠 추가 순서

1. 키워드와 검색 의도를 정한다.
2. `src/data/guideArticles.ts`에 slug, title, description, keywords, content, relatedSlugs를 추가한다.
3. 투자 추천, 수익 보장, 매수/매도 권유 표현을 제거한다.
4. 내부 링크와 관련 가이드를 확인한다.
5. build 후 `/guides/[slug]`와 sitemap 포함을 확인한다.

## 5. 배포 전 확인 순서

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- 주요 페이지 수동 확인
- 데이터 기준일과 투자 유의사항 확인

## 6. 배포 후 확인 순서

- 메인 페이지 접속 확인
- `/calculator`, `/etf/SCHD`, `/compare`, `/rankings`, `/guides` 접속 확인
- `/sitemap.xml`, `/robots.txt` 응답 확인
- Search Console 색인 상태 확인

## 7. 장애/오류 대응

1. 오류 범위를 확인한다.
2. 최근 변경 파일을 확인한다.
3. 재현 가능한 테스트를 추가하거나 기존 테스트로 재현한다.
4. 수정 후 전체 검증 명령을 실행한다.
5. 사용자에게 노출되는 안내 문구가 필요한지 확인한다.

## 8. 데이터 오류 대응

1. 오류가 있는 ticker와 영향 페이지를 확인한다.
2. 공식 자료 기준으로 값을 재검증한다.
3. `dataAsOf`와 `dataNote`를 함께 갱신한다.
4. 변경 내역을 decision-log에 기록한다.
5. 필요 시 가이드나 화면의 참고용 안내를 보강한다.

## 9. SEO 오류 대응

1. sitemap 포함 여부를 확인한다.
2. metadata title/description을 확인한다.
3. 내부 링크가 끊겼는지 확인한다.
4. 404 또는 중복 slug가 있는지 확인한다.
5. build 결과의 정적 페이지 목록을 확인한다.

## 10. 다음 개선 후보

- CSV import 검증 CLI 추가
- 환율 API 후보 약관 검토
- ETF 데이터 제공자 선정
- 콘텐츠 주제 확장
- 운영자용 변경 이력 템플릿 추가
