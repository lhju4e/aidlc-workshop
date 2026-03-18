# Code Summary - Customer Frontend (Unit 2)

## 생성된 파일 목록

### Project Setup (6 files)
- `frontend/customer/package.json`
- `frontend/customer/tsconfig.json`
- `frontend/customer/vite.config.ts`
- `frontend/customer/tailwind.config.js`
- `frontend/customer/postcss.config.js`
- `frontend/customer/index.html`

### Core (2 files)
- `src/main.tsx` - Vite 엔트리포인트
- `src/index.css` - Tailwind CSS imports

### Types + Utils (3 files)
- `src/types/index.ts` - API 응답/로컬 상태/SSE 이벤트 타입
- `src/utils/format.ts` - 가격/시간/상태 포맷 함수
- `src/utils/constants.ts` - API URL, localStorage 키

### API Service Layer (4 files)
- `src/services/api.ts` - Axios 인스턴스 + JWT 인터셉터
- `src/services/auth.service.ts` - 테이블 로그인
- `src/services/menu.service.ts` - 메뉴/카테고리 조회
- `src/services/order.service.ts` - 주문 생성/조회

### Zustand Stores (2 files)
- `src/store/authStore.ts` - 인증 상태 (자동 로그인 포함)
- `src/store/cartStore.ts` - 장바구니 (localStorage 동기화)

### Custom Hooks (2 files)
- `src/hooks/useSSE.ts` - SSE 연결 관리
- `src/hooks/useToast.ts` - 토스트 알림 관리

### Common Components (3 files)
- `src/components/common/Toast.tsx`
- `src/components/common/ErrorBoundary.tsx`
- `src/components/common/LoadingSpinner.tsx`

### Layout Components (1 file)
- `src/components/layout/TabLayout.tsx` - 하단 탭 네비게이션

### Menu Components (4 files)
- `src/components/menu/CategorySidebar.tsx`
- `src/components/menu/MenuGrid.tsx`
- `src/components/menu/MenuCard.tsx`
- `src/components/menu/MenuDetailModal.tsx`

### Cart Components (3 files)
- `src/components/cart/CartPanel.tsx`
- `src/components/cart/CartItem.tsx`
- `src/components/cart/CartSummary.tsx`

### Order Components (3 files)
- `src/components/order/OrderConfirmModal.tsx`
- `src/components/order/OrderCard.tsx`
- `src/components/order/OrderItemRow.tsx`

### Pages (4 files)
- `src/pages/SetupPage.tsx` (US-01)
- `src/pages/MenuPage.tsx` (US-02, US-03, US-04)
- `src/pages/OrderSuccessPage.tsx` (US-04)
- `src/pages/OrderHistoryPage.tsx` (US-05)

### App Entry (1 file)
- `src/App.tsx` - 라우팅 + 인증 분기 + lazy loading

### Assets (1 file)
- `public/placeholder.png`

**총 파일 수**: 39개

## Story 매핑
- US-01 (자동 로그인): SetupPage + authStore + auth.service
- US-02 (메뉴 조회): MenuPage + CategorySidebar + MenuGrid + MenuCard + MenuDetailModal
- US-03 (장바구니): CartPanel + CartItem + CartSummary + cartStore
- US-04 (주문 생성): OrderConfirmModal + OrderSuccessPage + order.service
- US-05 (주문 내역): OrderHistoryPage + OrderCard + useSSE + Toast
