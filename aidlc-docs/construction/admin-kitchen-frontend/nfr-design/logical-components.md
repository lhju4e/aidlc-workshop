# Logical Components - Unit 3: Admin+Kitchen Frontend

## 프로젝트 구조

```
frontend/admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Tailwind, 폰트)
│   │   ├── admin/
│   │   │   ├── layout.tsx                # AdminLayout (Navbar, AuthGuard)
│   │   │   ├── login/page.tsx            # LoginPage
│   │   │   ├── register/page.tsx         # RegisterPage
│   │   │   ├── dashboard/page.tsx        # DashboardPage
│   │   │   ├── menus/page.tsx            # MenuManagementPage
│   │   │   ├── payments/page.tsx         # PaymentManagementPage
│   │   │   └── history/page.tsx          # OrderHistoryPage
│   │   └── kitchen/
│   │       ├── layout.tsx                # KitchenLayout (AuthGuard)
│   │       └── page.tsx                  # KitchenDisplayPage
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Navbar.tsx
│   │   │   ├── TableCardGrid.tsx
│   │   │   ├── TableCard.tsx
│   │   │   ├── TableDetailModal.tsx
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderCard.tsx
│   │   │   ├── MenuFormModal.tsx
│   │   │   ├── DraggableMenuList.tsx
│   │   │   ├── CategoryTabs.tsx
│   │   │   ├── PaymentTable.tsx
│   │   │   ├── HistoryFilter.tsx
│   │   │   └── HistoryTable.tsx
│   │   ├── kitchen/
│   │   │   ├── KitchenOrderGrid.tsx
│   │   │   └── KitchenOrderCard.tsx
│   │   └── common/
│   │       ├── ConfirmModal.tsx
│   │       ├── NotificationToggle.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBanner.tsx
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── orderStore.ts
│   │   ├── tableStore.ts
│   │   ├── menuStore.ts
│   │   ├── paymentStore.ts
│   │   └── notificationStore.ts
│   ├── services/
│   │   ├── api.ts                        # Axios 인스턴스 + interceptor
│   │   ├── authService.ts
│   │   ├── menuService.ts
│   │   ├── orderService.ts
│   │   ├── tableService.ts
│   │   └── paymentService.ts
│   ├── hooks/
│   │   ├── useSSE.ts                     # SSE 연결 훅
│   │   └── useNotificationSound.ts       # 알림음 훅
│   ├── types/
│   │   └── index.ts                      # TypeScript 인터페이스
│   └── utils/
│       └── cn.ts                         # clsx + tailwind-merge 헬퍼
├── public/
│   └── sounds/
│       └── notification.mp3              # 알림음 파일
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── .env.local
```

## 환경 변수 (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 의존성 구조

```
Pages → Components + Stores + Hooks
Components → Stores + Services + Types
Stores → Services + Types
Services → api.ts (Axios 인스턴스) + Types
Hooks → Stores + Services
```

- 단방향 의존성 (순환 참조 없음)
- Stores는 Services를 통해서만 API 호출
- Components는 Stores를 통해서만 상태 접근
