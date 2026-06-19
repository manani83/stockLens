# Dividend Lab Korea MVP Release Candidate

## 1. 릴리즈 후보명

Dividend Lab Korea MVP Release Candidate

## 2. 릴리즈 범위

- 배당 계산기
- ETF 상세 페이지
- 관심종목 워치리스트
- ETF 비교
- ETF 랭킹/스크리너
- 배당 재투자 시뮬레이션
- 배당락/실적 캘린더
- 알림 규칙 저장
- 포트폴리오 저장
- 포트폴리오 배당 캘린더
- 데이터 백업/복원
- 가이드 콘텐츠
- 수동 CSV 데이터 검증 구조
- SEO/sitemap/robots
- 광고/제휴 placeholder
- 데이터 최신성 안내
- 보안/개인정보 점검 문서
- 오류/404/빈 상태 공통 UI
- 운영/배포 문서
- v0.1.0 패키징 문서

## 3. 검증 결과

- `npm test`: 19개 테스트 파일, 141개 테스트 통과
- `npm run lint`: 통과
- `npm run typecheck`: 통과
- `npm run build`: 통과
- 로컬 오류 URL 확인: `/not-existing-page` 404, `/etf/unknown` 200 안내 페이지, `/compare/bad-url` 200 안내 페이지

## 4. 배포 가능 여부 판단

조건부 배포 가능.

코드 기준으로 테스트, lint, typecheck, build가 통과했고 투자 유의사항, 데이터 참고용 문구, 실시간 데이터 미연동 상태, 보안/개인정보 문서, 오류 상태 UI, README 문서가 정리되어 있다. 다만 실제 도메인, sitemap URL, 모바일 화면, ETF 데이터 최신성, 법적 문구는 배포 전 사람이 확인해야 한다.

## 5. 배포 전 필수 확인

- 실제 도메인 설정
- `NEXT_PUBLIC_SITE_URL` 설정
- sitemap URL 확인
- robots.txt 확인
- 모바일 화면 확인
- ETF 데이터 최신성 수동 검증
- 투자 유의사항 문구 검토
- 광고/제휴 영역 실제 코드 미삽입 확인
- API KEY 미삽입 확인
- v0.1.0 sign-off 확인
