# 환경변수 가이드

## 현재 환경변수

### `NEXT_PUBLIC_SITE_URL`

- 설명: 사이트의 실제 도메인 URL
- 사용 위치: sitemap, robots, metadata
- 예시: `https://dividend-lab.example.com`
- 기본값: `http://localhost:3000`

### `NEXT_PUBLIC_ANALYTICS_PROVIDER`

- 설명: 분석도구 provider 설정
- 허용값: `None`, `GA4`, `GTM`, `Custom`
- 기본값: `None`

### `NEXT_PUBLIC_GA_ID`

- 설명: 향후 GA4 연결 시 사용할 측정 ID
- 현재 MVP에서는 사용하지 않음

### `NEXT_PUBLIC_GTM_ID`

- 설명: 향후 GTM 연결 시 사용할 컨테이너 ID
- 현재 MVP에서는 사용하지 않음

## 향후 후보 환경변수

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `FINANCE_API_KEY`
- `NEWS_API_KEY`

## 주의사항

- 현재 MVP에서는 실제 API KEY를 사용하지 않는다.
- API KEY는 절대 클라이언트 코드에 노출하지 않는다.
- 민감한 키는 서버 환경변수로 관리해야 한다.
