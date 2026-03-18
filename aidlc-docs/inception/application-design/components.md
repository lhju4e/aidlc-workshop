# Components

## Backend Components

### 1. AuthController
- **목적**: 인증 관련 HTTP 요청 처리
- **책임**: 매장 등록, 관리자 로그인, 테이블 태블릿 로그인
- **인터페이스**: REST API (`/api/auth/*`)

### 2. MenuController
- **목적**: 메뉴 관련 HTTP 요청 처리
- **책임**: 메뉴 CRUD, 카테고리별 조회, 순서 변경, 이미지 업로드
- **인터페이스**: REST API (`/api/menus/*`)

### 3. OrderController
- **목적**: 주문 관련 HTTP 요청 처리
- **책임**: 주문 생성, 조회, 상태 변경, 삭제
- **인터페이스**: REST API (`/api/orders/*`)

### 4. TableController
- **목적**: 테이블 관리 HTTP 요청 처리
- **책임**: 테이블 설정, 세션 관리, 이용 완료, 과거 내역 조회
- **인터페이스**: REST API (`/api/tables/*`)

### 5. PaymentController
- **목적**: 결제 상태 관리 HTTP 요청 처리
- **책임**: 결제 상태 조회/변경
- **인터페이스**: REST API (`/api/payments/*`)

### 6. SSEController
- **목적**: Server-Sent Events 연결 관리
- **책임**: SSE 연결 수립, 이벤트 브로드캐스트 (주문/상태 변경)
- **인터페이스**: SSE (`/api/sse/*`)

### 7. AuthService
- **목적**: 인증/인가 비즈니스 로직
- **책임**: JWT 생성/검증, 비밀번호 해싱/검증, 로그인 시도 제한

### 8. MenuService
- **목적**: 메뉴 비즈니스 로직
- **책임**: 메뉴 CRUD 처리, 순서 변경 로직, 유효성 검증

### 9. OrderService
- **목적**: 주문 비즈니스 로직
- **책임**: 주문 생성, 상태 변경, 세션 자동 시작, 주문 삭제, 총액 계산

### 10. TableService
- **목적**: 테이블/세션 비즈니스 로직
- **책임**: 테이블 설정, 세션 생성/종료, 이용 완료 처리, 과거 내역 관리

### 11. PaymentService
- **목적**: 결제 상태 비즈니스 로직
- **책임**: 결제 상태 변경, 미결제 확인, 결제 이력 관리

### 12. SSEService
- **목적**: SSE 연결 및 이벤트 관리
- **책임**: 클라이언트 연결 관리, 이벤트 발행, 연결 정리

### 13. FileService
- **목적**: 파일 업로드 처리
- **책임**: 이미지 파일 저장, URL 생성

### 14. Repository Layer (StoreRepo, MenuRepo, OrderRepo, TableRepo, PaymentRepo, SessionRepo)
- **목적**: 데이터 접근 계층
- **책임**: MySQL CRUD 연산, 쿼리 실행

## Frontend Components

### 15. Customer App (고객용)
- **목적**: 테이블 태블릿 고객 인터페이스
- **책임**: 메뉴 조회, 장바구니, 주문 생성, 주문 내역 조회
- **주요 페이지**: MenuPage, CartPage, OrderPage, OrderHistoryPage, SetupPage

### 16. Admin App (관리자용)
- **목적**: 매장 관리자 인터페이스
- **책임**: 로그인, 주문 모니터링, 테이블 관리, 메뉴 관리, 결제 관리
- **주요 페이지**: LoginPage, DashboardPage, TableDetailPage, MenuManagementPage, OrderHistoryPage

### 17. Kitchen App (주방용)
- **목적**: 주방 디스플레이 인터페이스
- **책임**: 주문 실시간 표시, 조리 상태 변경
- **주요 페이지**: KitchenDisplayPage

## Shared/Common Components

### 18. Auth Middleware
- **목적**: 요청 인증/인가 처리
- **책임**: JWT 토큰 검증, 역할 기반 접근 제어

### 19. Error Handler
- **목적**: 전역 에러 처리
- **책임**: 에러 응답 표준화, 에러 로깅
