# 분석도구 구현 가이드

## 1. 현재 구현 범위

- `trackEvent` 함수만 준비했다.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` 환경변수로 provider를 선택할 수 있다.
- 현재 MVP에서는 실제 외부 전송을 하지 않는다.

## 2. 향후 GA4 연동 방법

- `NEXT_PUBLIC_ANALYTICS_PROVIDER=GA4`
- `NEXT_PUBLIC_GA_ID` 설정
- 실제 `gtag` 삽입은 별도 작업으로 분리한다.

## 3. 향후 GTM 연동 방법

- `NEXT_PUBLIC_ANALYTICS_PROVIDER=GTM`
- `NEXT_PUBLIC_GTM_ID` 설정
- 실제 GTM 스크립트 삽입은 별도 작업으로 분리한다.

## 4. 주의사항

- 개인정보 수집 금지
- 투자금 등 민감할 수 있는 값을 무분별하게 전송하지 않기
- 사용자가 입력한 메모 전송 금지
- localStorage 원문 데이터 전송 금지
- 백업 데이터 원문 전송 금지
