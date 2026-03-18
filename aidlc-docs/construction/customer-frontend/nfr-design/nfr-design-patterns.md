# NFR Design Patterns - Customer Frontend (Unit 2)

## Pattern 1: 프로젝트 구조 (Feature-Based)

```
src/
├── pages/          # 페이지 컴포넌트
├── components/     # 재사용 UI 컴포넌트
├── hooks/          # Custom Hooks
├── services/       # API 호출 레이어
├── store/          # Zustand 스토어
├── types/          # TypeScript 타입 정의
├── utils/          # 유틸리티 함수
└── App.tsx         # 라우팅 + 인증 분기
```

## Pattern 2: Axios 인터셉터 (JWT 자동 관리)

```typescript
// Request 인터셉터: JWT 자동 첨부
axios.interceptors.request → Authorization: Bearer <token>

// Response 인터셉터: 401 시 자동 재로그인
axios.interceptors.response → 401 에러
  → 저장된 credentials로 재로그인 시도
  → 성공 → 원래 요청 재시도
  → 실패 → 설정 화면으로 이동
```

## Pattern 3: Zustand 상태 관리

```typescript
// Auth Store
useAuthStore: { token, table, login(), logout(), autoLogin() }

// Cart Store (localStorage 동기화)
useCartStore: { items, totalAmount, addItem(), updateQuantity(), removeItem(), clear() }
  → subscribe로 localStorage 자동 동기화
  → 초기화 시 localStorage에서 복원
```

## Pattern 4: SSE 연결 관리 (useSSE Hook)

```
컴포넌트 마운트 → EventSource 연결
  → onmessage → 이벤트 타입별 처리
    → order_status_changed → 주문 상태 갱신 + 토스트
    → order_created → 목록에 추가
    → order_deleted → 목록에서 제거
  → onerror → 자동 재연결 (EventSource 기본 동작)
컴포넌트 언마운트 → EventSource.close()
```

## Pattern 5: 네트워크 에러 처리

```
API 호출 실패
  ├─ 네트워크 에러 (offline) → 에러 토스트 표시
  │   └─ SSE로 관리자에게 테이블 연결 상태 알림
  ├─ 401 Unauthorized → Axios 인터셉터에서 자동 재로그인
  ├─ 4xx 에러 → 에러 메시지 토스트 표시
  └─ 5xx 에러 → "서버 오류" 토스트 표시
```

## Pattern 6: localStorage 영속성

```
장바구니 변경 → Zustand store 업데이트 → subscribe → localStorage.setItem('cart')
앱 시작 → localStorage.getItem('cart') → Zustand store 초기값
주문 확정 → store.clear() → localStorage.removeItem('cart')

credentials 저장 → localStorage.setItem('credentials')
자동 로그인 → localStorage.getItem('credentials')
```

## Pattern 7: React Error Boundary

```
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

- 렌더링 에러 시 전체 앱 크래시 방지
- 에러 화면에서 "새로고침" 버튼 제공

## Pattern 8: 코드 스플리팅 (Lazy Loading)

```typescript
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const SetupPage = lazy(() => import('./pages/SetupPage'));
```

- 초기 번들 크기 최소화 (500KB 이내 목표)
- 메뉴 페이지는 기본 로드 (가장 빈번한 화면)
- 나머지 페이지는 lazy load
