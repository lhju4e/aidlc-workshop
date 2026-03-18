# Code Generation Plan - Customer Frontend (Unit 2)

## Unit Context
- **Unit**: frontend/customer (React SPA)
- **기술**: Vite + React 18 + TypeScript + Zustand + Tailwind CSS + Axios
- **Stories**: US-01, US-02, US-03, US-04, US-05
- **의존성**: Unit 1 Backend API (REST + SSE)

## Plan Steps

### Step 1: Project Setup
- [x] package.json, tsconfig.json, vite.config.ts
- [x] tailwind.config.js, postcss.config.js
- [x] index.html, src/main.tsx

### Step 2: Types + Utils + Constants
- [x] src/types/index.ts (API 응답 타입, 로컬 상태 타입)
- [x] src/utils/format.ts (가격/날짜 포맷)
- [x] src/utils/constants.ts (API URL 등)

### Step 3: API Service Layer
- [x] src/services/api.ts (Axios 인스턴스 + 인터셉터)
- [x] src/services/auth.service.ts
- [x] src/services/menu.service.ts
- [x] src/services/order.service.ts

### Step 4: Zustand Stores
- [x] src/store/authStore.ts
- [x] src/store/cartStore.ts (localStorage 동기화)

### Step 5: Custom Hooks
- [x] src/hooks/useSSE.ts
- [x] src/hooks/useToast.ts

### Step 6: Common Components
- [x] src/components/common/Toast.tsx
- [x] src/components/common/ErrorBoundary.tsx
- [x] src/components/common/LoadingSpinner.tsx

### Step 7: Layout + Menu Components (US-01, US-02)
- [x] src/components/layout/TabLayout.tsx
- [x] src/components/menu/CategorySidebar.tsx
- [x] src/components/menu/MenuGrid.tsx
- [x] src/components/menu/MenuCard.tsx
- [x] src/components/menu/MenuDetailModal.tsx

### Step 8: Cart Components (US-03)
- [x] src/components/cart/CartPanel.tsx
- [x] src/components/cart/CartItem.tsx
- [x] src/components/cart/CartSummary.tsx

### Step 9: Order Components (US-04)
- [x] src/components/order/OrderConfirmModal.tsx

### Step 10: Order History Components (US-05)
- [x] src/components/order/OrderCard.tsx
- [x] src/components/order/OrderItemRow.tsx

### Step 11: Pages
- [x] src/pages/SetupPage.tsx (US-01)
- [x] src/pages/MenuPage.tsx (US-02, US-03)
- [x] src/pages/OrderSuccessPage.tsx (US-04)
- [x] src/pages/OrderHistoryPage.tsx (US-05)

### Step 12: App Entry + Routing
- [x] src/App.tsx
- [x] public/placeholder.png

### Step 13: Code Summary
- [x] aidlc-docs/construction/customer-frontend/code/code-summary.md
