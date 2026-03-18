# Customer Frontend - Frontend Components

## 1. 컴포넌트 계층 구조

```
App
├── SetupPage
│   └── SetupForm (storeId, tableNumber, password 입력)
│
├── TabLayout (하단 탭 네비게이션)
│   ├── MenuPage
│   │   ├── CategorySidebar (좌측 카테고리 목록)
│   │   ├── MenuGrid (메뉴 카드 그리드)
│   │   │   └── MenuCard (개별 메뉴 카드)
│   │   ├── MenuDetailModal (메뉴 상세 + 수량 선택)
│   │   └── CartPanel (우측 사이드 장바구니)
│   │       ├── CartItem (장바구니 아이템)
│   │       └── CartSummary (총 금액 + 주문하기 버튼)
│   │
│   └── OrderHistoryPage
│       ├── OrderCard (주문 카드)
│       │   └── OrderItemRow (주문 아이템 행)
│       └── Toast (상태 변경 알림)
│
├── OrderConfirmModal (주문 확인 모달)
└── OrderSuccessPage (주문 완료 + 5초 카운트다운)
```

## 2. 컴포넌트 상세

### App
- **State**: `isAuthenticated: boolean`, `isLoading: boolean`
- **로직**: 앱 시작 시 자동 로그인 시도 → 결과에 따라 SetupPage 또는 TabLayout 렌더링

### SetupPage
- **Props**: `onLoginSuccess: () => void`
- **State**: `storeId`, `tableNumber`, `password`, `error`, `isSubmitting`
- **로직**: 폼 제출 → POST /api/auth/table/login → 성공 시 credentials + JWT 저장

### TabLayout
- **State**: `activeTab: 'menu' | 'history'`
- **로직**: 하단 탭으로 MenuPage / OrderHistoryPage 전환

### CategorySidebar
- **Props**: `categories: string[]`, `activeCategory: string`, `onSelect: (category) => void`
- **로직**: 카테고리 클릭 시 부모에 선택 전달

### MenuGrid
- **Props**: `menus: Menu[]`, `onMenuClick: (menu) => void`
- **로직**: 메뉴 카드 그리드 렌더링

### MenuCard
- **Props**: `menu: Menu`, `onClick: () => void`
- **로직**: 이미지(또는 플레이스홀더) + 이름 + 가격 표시, 클릭 시 상세 모달

### MenuDetailModal
- **Props**: `menu: Menu`, `onClose: () => void`, `onAddToCart: (menuId, quantity) => void`
- **State**: `quantity: number` (기본값 1)
- **로직**: 수량 +/- 조절 → "장바구니 담기" 클릭 시 onAddToCart 호출

### CartPanel
- **Props**: `cart: Cart`, `onUpdateQuantity`, `onRemoveItem`, `onClearCart`, `onOrder`
- **로직**: 장바구니 아이템 목록 + 총 금액 + 주문하기 버튼, 항상 우측에 표시

### CartItem
- **Props**: `item: CartItem`, `onUpdateQuantity`, `onRemove`
- **로직**: 메뉴명 + 수량 +/- + 소계 표시

### CartSummary
- **Props**: `totalAmount: number`, `itemCount: number`, `onOrder: () => void`
- **로직**: 총 금액 표시 + "주문하기" 버튼 (아이템 0개면 비활성화)

### OrderConfirmModal
- **Props**: `cart: Cart`, `onConfirm: () => void`, `onCancel: () => void`
- **State**: `isSubmitting: boolean`
- **로직**: 최종 주문 내역 확인 → 확정 시 POST /api/orders

### OrderSuccessPage
- **Props**: `orderNumber: string`, `onComplete: () => void`
- **State**: `countdown: number` (5부터 시작)
- **로직**: 5초 카운트다운 → 자동으로 메뉴 화면 이동

### OrderHistoryPage
- **State**: `orders: Order[]`, `isLoading: boolean`
- **로직**: GET /api/orders로 목록 로드 + SSE 연결로 실시간 업데이트

### OrderCard
- **Props**: `order: Order`
- **로직**: 주문 번호, 시각, 상태 배지, 아이템 목록, 금액 표시

### Toast
- **Props**: `message: string`, `type: 'info' | 'success'`
- **로직**: 3초 후 자동 사라짐

## 3. 상태 관리

### 전역 상태 (Context 또는 Store)
- `auth`: JWT 토큰, 테이블 정보 (storeId, tableId, sessionId)
- `cart`: 장바구니 아이템 배열 + 총 금액 (localStorage 동기화)

### 로컬 상태
- 각 페이지/컴포넌트의 UI 상태 (로딩, 에러, 모달 열림 등)

## 4. Custom Hooks

### useAuth
- 자동 로그인, 로그인, 로그아웃, 토큰 갱신 로직

### useCart
- 장바구니 CRUD + localStorage 동기화 + 총 금액 계산

### useSSE
- SSE 연결 관리, 이벤트 리스너 등록/해제, 재연결 로직

### useToast
- 토스트 메시지 표시/숨김 관리
