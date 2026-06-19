# localStorage 백업/복원 가이드

## 1. 현재 범위

- 브라우저 `localStorage`에 저장된 데이터를 JSON 파일로 내보낸다.
- JSON 백업 파일을 다시 가져와 기존 데이터를 덮어쓰기 또는 병합할 수 있다.
- 서버 저장, DB 저장, 로그인, 클라우드 동기화는 제공하지 않는다.

## 2. 백업 대상

- 관심종목: `dividend-lab-watchlist`
- 알림 규칙: `dividend-lab-alert-rules`
- 포트폴리오: `dividend-lab-portfolio`

## 3. 백업 데이터 구조

- `version`: 백업 포맷 버전
- `exportedAt`: 내보낸 시각
- `watchlist`: 관심종목 배열
- `alertRules`: 알림 규칙 배열
- `portfolio`: 포트폴리오 보유 항목 배열

## 4. 가져오기 방식

- Replace: 기존 데이터를 백업 파일 내용으로 덮어쓴다.
- Merge: 기존 데이터와 백업 데이터를 병합한다.
- 병합 중복 기준은 관심종목 ticker, 알림 규칙 id, 포트폴리오 id이다.

## 5. 주의사항

- 백업 파일은 사용자가 직접 보관해야 한다.
- 브라우저 데이터 삭제나 파일 분실 시 복구가 어려울 수 있다.
- 현재 MVP는 민감한 개인정보 입력을 요구하지 않는다.
- 백업 파일을 다른 사람과 공유하지 않는 것이 좋다.
