# NFR Requirements - Customer Frontend (Unit 2)

## NFR-01: 성능 (Performance)

| 항목 | 요구사항 |
|------|----------|
| 초기 페이지 로딩 | 3초 이내 (FCP 기준) |
| 메뉴 목록 렌더링 | API 응답 후 500ms 이내 화면 표시 |
| 장바구니 조작 | 즉시 반영 (로컬 상태, 16ms 이내) |
| 주문 생성 응답 | 2초 이내 (Backend API 포함) |
| SSE 이벤트 반영 | 수신 후 500ms 이내 UI 업데이트 |
| 번들 크기 | 초기 로드 500KB 이내 (gzip) |

## NFR-02: 가용성 (Availability)

| 항목 | 요구사항 |
|------|----------|
| 네트워크 끊김 감지 | 에러 메시지 표시 + SSE를 통해 관리자에게 알림 전달 |
| SSE 재연결 | 연결 끊김 시 자동 재연결 (EventSource 기본 동작) |
| 장바구니 영속성 | localStorage 기반, 브라우저 새로고침/네트워크 끊김에도 유지 |
| JWT 만료 대응 | 저장된 credentials로 자동 재로그인 시도 |

## NFR-03: 보안 (Security)

| 항목 | 요구사항 |
|------|----------|
| 토큰 저장 | localStorage에 JWT 저장 (태블릿 전용 기기) |
| API 요청 인증 | 모든 API 요청에 Authorization 헤더 자동 첨부 (Axios 인터셉터) |
| 입력 검증 | 초기 설정 폼 클라이언트 측 검증 (서버 측 검증은 Backend 담당) |
| XSS 방지 | React 기본 이스케이핑 + 사용자 입력 sanitize |

## NFR-04: 사용성 (Usability)

| 항목 | 요구사항 |
|------|----------|
| 최소 화면 크기 | 1024px (iPad 기준) |
| 반응형 | 가로/세로 모두 지원 |
| 터치 타겟 | 최소 44x44px |
| 시각적 피드백 | 로딩 스피너, 토스트 알림, 버튼 비활성화 상태 |
| 접근성 | 기본 ARIA 속성, 충분한 색상 대비 |

## NFR-05: 유지보수성 (Maintainability)

| 항목 | 요구사항 |
|------|----------|
| 타입 안전성 | TypeScript strict mode |
| 컴포넌트 구조 | 페이지/컴포넌트/훅/서비스 분리 |
| 코드 스타일 | ESLint + Prettier |
| 에러 바운더리 | React Error Boundary로 전역 에러 처리 |
