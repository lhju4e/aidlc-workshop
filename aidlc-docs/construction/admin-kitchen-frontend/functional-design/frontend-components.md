# Frontend Components - Unit 3: Admin+Kitchen Frontend

## 컴포넌트 계층 구조

```
App
├── AdminLayout (인증 필요, /admin/*)
│   ├── Navbar (네비게이션 바)
│   ├── LoginPage (/admin/login)
│   ├── RegisterPage (/admin/register)
│   ├── DashboardPage (/admin/dashboard)
│   │   ├── TableCardGrid
│   │   │   └── TableCard (테이블별 카드)
│   │   └── TableDetailModal
│   │       ├── OrderList
│   │       │   └── OrderCard
│   │       └── TableActions (이용 완료, 테이블 설정)
│   ├── MenuManagementPage (/admin/menus)
│   │   ├── CategoryTabs
│   │   ├── DraggableMenuList
│   │   │   └── MenuItemRow
│   │   └── MenuFormModal
│   ├── PaymentManagementPage (/admin/payments)
│   │   └── PaymentTable
│   └── OrderHistoryPage (/admin/history)
│       ├── HistoryFilter
│       └── HistoryTable
├── KitchenLayout (/kitchen)
│   └── KitchenDisplayPage
│       └── KitchenOrderGrid
│           └── KitchenOrderCard
└── Common
    ├── ConfirmModal
    ├── NotificationToggle
    ├── LoadingSpinner
    └── ErrorBanner
```

---

## 페이지별 컴포넌트 상세

### LoginPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| storeId (state) | string | 매장 식별자 입력 |
| username (state) | string | 사용자명 입력 |
| password (state) | string | 비밀번호 입력 |
| error (state) | string \| null | 에러 메시지 |
| isLoading (state) | boolean | 로딩 상태 |

### RegisterPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| storeName (state) | string | 매장명 입력 |
| username (state) | string | 사용자명 입력 |
| password (state) | string | 비밀번호 입력 |
| error (state) | string \| null | 에러 메시지 |
| isLoading (state) | boolean | 로딩 상태 |

### DashboardPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| tables (state) | TableCardData[] | 테이블 카드 데이터 |
| selectedTable (state) | TableCardData \| null | 모달에 표시할 테이블 |
| isModalOpen (state) | boolean | 상세 모달 열림 여부 |

### TableCard
| Props/State | 타입 | 설명 |
|-------------|------|------|
| data (props) | TableCardData | 테이블 카드 데이터 |
| onClick (props) | () => void | 클릭 핸들러 |

### TableDetailModal
| Props/State | 타입 | 설명 |
|-------------|------|------|
| table (props) | TableCardData | 선택된 테이블 데이터 |
| isOpen (props) | boolean | 모달 열림 여부 |
| onClose (props) | () => void | 닫기 핸들러 |
| onStatusChange (props) | (orderId, status) => void | 주문 상태 변경 |
| onDeleteOrder (props) | (orderId) => void | 주문 삭제 |
| onCompleteTable (props) | (tableId) => void | 이용 완료 |

### MenuManagementPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| menus (state) | Menu[] | 메뉴 목록 |
| categories (state) | Category[] | 카테고리 목록 |
| selectedCategory (state) | string \| null | 선택된 카테고리 |
| isFormOpen (state) | boolean | 폼 모달 열림 여부 |
| editingMenu (state) | Menu \| null | 수정 중인 메뉴 |

### MenuFormModal
| Props/State | 타입 | 설명 |
|-------------|------|------|
| menu (props) | Menu \| null | 수정 시 기존 메뉴 (null이면 신규) |
| categories (props) | Category[] | 카테고리 목록 |
| isOpen (props) | boolean | 모달 열림 여부 |
| onClose (props) | () => void | 닫기 핸들러 |
| onSubmit (props) | (data: MenuFormData) => void | 제출 핸들러 |

### PaymentManagementPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| payments (state) | (Payment & { order: Order })[] | 결제+주문 데이터 |
| tables (state) | Table[] | 테이블 목록 (그룹핑용) |

### OrderHistoryPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| history (state) | Order[] | 과거 주문 목록 |
| filter (state) | OrderHistoryFilter | 필터 조건 |
| tables (state) | Table[] | 테이블 목록 (필터용) |

### KitchenDisplayPage
| Props/State | 타입 | 설명 |
|-------------|------|------|
| orders (state) | Order[] | 미완료 주문 목록 |
| tables (state) | Table[] | 테이블 목록 (번호 매핑) |

### KitchenOrderCard
| Props/State | 타입 | 설명 |
|-------------|------|------|
| order (props) | Order | 주문 데이터 |
| tableNumber (props) | number | 테이블 번호 |
| onStartCooking (props) | (orderId) => void | 조리 시작 |
| onCompleteCooking (props) | (orderId) => void | 조리 완료 |

---

## API Integration Points

| 컴포넌트 | Backend Endpoint | 용도 |
|----------|-----------------|------|
| LoginPage | POST /api/auth/admin/login | 관리자 로그인 |
| RegisterPage | POST /api/auth/register | 매장 등록 |
| DashboardPage | GET /api/tables, GET /api/orders, GET /api/sse/orders | 테이블/주문 로드 + SSE |
| TableDetailModal | PATCH /api/orders/:id/status, DELETE /api/orders/:id, POST /api/tables/:id/complete | 주문 상태/삭제/이용완료 |
| MenuManagementPage | GET/POST/PUT/DELETE /api/menus, PUT /api/menus/reorder, POST /api/menus/:id/image | 메뉴 CRUD |
| PaymentManagementPage | GET /api/payments, PATCH /api/payments/:orderId | 결제 조회/변경 |
| OrderHistoryPage | GET /api/tables/:id/history | 과거 내역 조회 |
| KitchenDisplayPage | GET /api/orders, GET /api/sse/orders, PATCH /api/orders/:id/status | 주문 조회 + SSE + 상태 변경 |
