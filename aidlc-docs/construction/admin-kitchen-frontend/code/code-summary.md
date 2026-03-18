# Code Summary - Unit 3: Admin+Kitchen Frontend

## 기술 스택
- Next.js 14 (App Router) + TypeScript 5 + Tailwind CSS 3
- Zustand (상태 관리) + Axios (HTTP) + @dnd-kit (드래그앤드롭)
- Headless UI (모달/다이얼로그) + dayjs (날짜)
- Jest + React Testing Library (테스트)

## 생성 파일 목록

### 설정 파일 (7개)
- package.json, tsconfig.json, next.config.js
- tailwind.config.ts, postcss.config.js
- .env.local, jest.config.js, jest.setup.ts

### 타입/유틸리티 (2개)
- src/types/index.ts
- src/utils/cn.ts

### API 계층 (6개)
- src/services/api.ts (Axios 인스턴스)
- src/services/authService.ts, orderService.ts, tableService.ts, menuService.ts, paymentService.ts

### 상태 관리 (6개)
- src/stores/authStore.ts, orderStore.ts, tableStore.ts, menuStore.ts, paymentStore.ts, notificationStore.ts

### Hooks (2개)
- src/hooks/useSSE.ts, useNotificationSound.ts

### 페이지 (9개)
- src/app/layout.tsx (Root)
- src/app/admin/layout.tsx (AuthGuard + Navbar)
- src/app/admin/login/page.tsx, register/page.tsx, dashboard/page.tsx, menus/page.tsx, payments/page.tsx, history/page.tsx
- src/app/kitchen/layout.tsx, page.tsx

### 컴포넌트 (16개)
- admin: Navbar, TableCardGrid, TableCard, TableDetailModal, OrderList, OrderCard, CategoryTabs, DraggableMenuList, MenuFormModal, PaymentTable, HistoryFilter, HistoryTable
- kitchen: KitchenOrderGrid, KitchenOrderCard
- common: ConfirmModal, NotificationToggle, LoadingSpinner, ErrorBanner

### 테스트 (7개)
- stores: authStore, orderStore, menuStore, paymentStore, notificationStore
- services: authService, orderService

## 총 파일 수: 약 48개

## Story 구현 현황
- [x] US-06: 매장 등록/관리자 인증 (LoginPage, RegisterPage)
- [x] US-07: 실시간 주문 모니터링 (DashboardPage, SSE, 알림음)
- [x] US-08: 결제 상태 관리 (PaymentManagementPage)
- [x] US-09: 테이블 설정/세션 관리 (TableDetailModal)
- [x] US-10: 메뉴 관리 (MenuManagementPage, 드래그앤드롭)
- [x] US-11: 주방 주문 확인/조리 (KitchenDisplayPage)
