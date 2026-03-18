# Tech Stack Decisions - Customer Frontend (Unit 2)

## 확정 기술 스택

| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| Build Tool | Vite | 5.x | 빠른 HMR, 경량 번들, 현재 React 생태계 표준 |
| Framework | React | 18.x | 컴포넌트 기반 SPA, 풍부한 생태계 |
| Language | TypeScript | 5.x | 타입 안전성, Backend와 언어 통일 |
| State Management | Zustand | 4.x | 경량, 간단한 API, 소규모 앱에 적합, Context보다 리렌더링 최적화 |
| Styling | Tailwind CSS | 3.x | 유틸리티 클래스 기반 빠른 UI 개발, 반응형 지원 용이 |
| HTTP Client | Axios | 1.x | 인터셉터로 JWT 자동 첨부, 에러 핸들링 편리 |
| Routing | React Router | 6.x | SPA 라우팅 표준 |

## 개발 도구

| 도구 | 용도 |
|------|------|
| ESLint | 코드 린팅 |
| Prettier | 코드 포맷팅 |
| @types/* | TypeScript 타입 정의 |

## 아키텍처 결정

| 결정 | 내용 | 근거 |
|------|------|------|
| SPA | 단일 페이지 앱 (CSR) | 태블릿 전용, SEO 불필요, 빠른 페이지 전환 |
| Zustand | Context 대신 Zustand | cart/auth 상태의 빈번한 업데이트에 리렌더링 최적화 필요 |
| Axios 인터셉터 | JWT 자동 첨부 + 401 자동 재로그인 | 인증 로직 중앙화, 컴포넌트에서 인증 신경 안 써도 됨 |
| localStorage | 장바구니 + credentials 저장 | 태블릿 전용 기기, 보안 위험 낮음, 간단한 영속성 |
| SSE (EventSource) | 실시간 주문 상태 업데이트 | 브라우저 내장 API, 자동 재연결, 서버→클라이언트 단방향에 적합 |
| 네트워크 에러 알림 | 에러 표시 + 관리자 SSE 알림 | 고객 화면에 에러 표시 + Backend SSE로 관리자에게 테이블 상태 알림 |
