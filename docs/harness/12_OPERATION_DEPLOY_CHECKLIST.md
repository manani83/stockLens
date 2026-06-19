# 운영/배포 체크리스트

## 1. 배포 전 코드 체크

- [ ] `npm install` 성공
- [ ] `npm test` 성공
- [ ] `npm run build` 성공
- [ ] `npm run lint` 성공
- [ ] TypeScript 오류 없음
- [ ] `console.log` 불필요 출력 확인
- [ ] 사용하지 않는 파일 확인

## 2. 기능 체크

- [ ] 배당 계산기 정상 동작
- [ ] ETF 상세 페이지 정상 접근
- [ ] 관심종목 localStorage 저장/삭제
- [ ] ETF 비교 페이지 정상 접근
- [ ] ETF 랭킹 페이지 정상 접근
- [ ] 배당 재투자 시뮬레이션 정상 동작
- [ ] 배당락/실적 캘린더 정상 접근
- [ ] 알림 규칙 localStorage 저장/삭제
- [ ] 포트폴리오 localStorage 저장/삭제
- [ ] 포트폴리오 예상 배당금 계산 표시
- [ ] sitemap.xml 생성
- [ ] robots.txt 생성

## 3. SEO 체크

- [ ] 메인 페이지 metadata 확인
- [ ] ETF 상세 페이지 metadata 확인
- [ ] 비교 페이지 metadata 확인
- [ ] 랭킹 페이지 metadata 확인
- [ ] 시뮬레이션 페이지 metadata 확인
- [ ] 캘린더 페이지 metadata 확인
- [ ] 알림 규칙 페이지 metadata 확인
- [ ] 포트폴리오 페이지 metadata 확인
- [ ] 내부 링크 확인
- [ ] h1 중복 여부 확인

## 4. 수익화 체크

- [ ] 광고 placeholder 위치 확인
- [ ] 제휴 고지 문구 표시 확인
- [ ] 실제 광고 코드 미삽입 상태 확인
- [ ] 실제 제휴 링크 미삽입 상태 확인
- [ ] 실제 GA4/GTM 스크립트 미삽입 상태 확인
- [ ] 외부 스크립트 도입 정책 확인

## 4-1. 보안/개인정보 체크

- [ ] API KEY 하드코딩 없음
- [ ] `NEXT_PUBLIC_*`에 민감정보 없음
- [ ] localStorage 저장 key와 저장 항목 확인
- [ ] memo가 외부로 전송되지 않음
- [ ] 백업/복원은 서버 업로드 없이 브라우저에서만 동작
- [ ] `dangerouslySetInnerHTML` 미사용 확인
- [ ] 전역 404/error 페이지 확인

## 5. 데이터 체크

- [ ] ETF 데이터 기준일 표시
- [ ] 데이터 참고용 문구 표시
- [ ] 운용사 공식 데이터 확인 필요 문구 표시
- [ ] 업데이트 정책 문서 존재 여부

## 6. 배포 체크

- [ ] `NEXT_PUBLIC_SITE_URL` 설정
- [ ] 실제 도메인 연결
- [ ] HTTPS 적용
- [ ] Vercel build command 확인
- [ ] Vercel output 설정 확인
- [ ] 환경변수 등록 확인

## 7. 배포 후 체크

- [ ] `/` 접속 확인
- [ ] `/sitemap.xml` 접속 확인
- [ ] `/robots.txt` 접속 확인
- [ ] `/etf/schd` 접속 확인
- [ ] `/compare/schd-vs-jepi` 접속 확인
- [ ] `/rankings` 접속 확인
- [ ] `/simulation` 접속 확인
- [ ] `/calendar` 접속 확인
- [ ] `/alerts` 접속 확인
- [ ] `/portfolio` 접속 확인
- [ ] 모바일 화면 확인
- [ ] Google Search Console 등록
- [ ] sitemap 제출
- [ ] 릴리즈 후보 문서 확인
- [ ] 알려진 제한사항 확인

## 현재 배포 준비 상태

- scripts: `build`, `test`, `lint`, `typecheck`가 존재한다.
- 수익화: 실제 광고 코드와 제휴 링크 없이 placeholder와 고지 문구만 준비했다.
- 데이터: 정적 ETF 데이터 기준일과 참고용 안내를 표시하는 구조를 추가했다.
- 법적 고지: 기본 투자 유의사항 문서를 추가했다.
- 기능 확장: 캘린더, 알림 규칙, 포트폴리오는 외부 연동 없이 localStorage 또는 정적 데이터 기반으로 준비했다.
- 릴리즈 후보: 테스트, lint, typecheck, build 통과 시 조건부 배포 가능으로 판단한다.
- 보안/개인정보: 개인정보 수집 없이 localStorage 기반 저장만 사용하며 외부 스크립트는 실제 삽입하지 않았다.
- 오류 처리: 전역 404/error 페이지와 주요 빈 상태 안내를 정리했다.
- 최종 판단은 `npm test`, `npm run lint`, `npm run build` 실행 결과와 사람이 확인해야 할 항목을 기준으로 한다.

## 사람이 반드시 확인해야 할 항목

- ETF 수치가 운용사 공식 자료와 최신 공시에 부합하는지 확인한다.
- 배포 도메인과 `NEXT_PUBLIC_SITE_URL` 값이 일치하는지 확인한다.
- 모바일 화면에서 광고 placeholder가 과하게 크지 않은지 확인한다.
- 투자 유의사항과 제휴 고지가 법무/컴플라이언스 기준에 맞는지 확인한다.
- 보안/개인정보 체크리스트와 v0.1.0 sign-off 문서를 배포 승인 전에 확인한다.
