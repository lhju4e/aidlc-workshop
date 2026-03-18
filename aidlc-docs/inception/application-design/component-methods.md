# Component Methods

> 비즈니스 규칙 상세는 Functional Design(CONSTRUCTION)에서 정의

## AuthController
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `POST /api/auth/register` | `{storeName, username, password}` | `{store, token}` | 매장 등록 + 관리자 계정 생성 |
| `POST /api/auth/admin/login` | `{storeId, username, password}` | `{token, store}` | 관리자 로그인 |
| `POST /api/auth/table/login` | `{storeId, tableNumber, password}` | `{token, table}` | 테이블 태블릿 로그인 |

## MenuController
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `GET /api/menus` | `?storeId, ?category` | `Menu[]` | 메뉴 목록 조회 |
| `POST /api/menus` | `{name, price, description, category, image}` | `Menu` | 메뉴 등록 |
| `PUT /api/menus/:id` | `{name?, price?, description?, category?, image?}` | `Menu` | 메뉴 수정 |
| `DELETE /api/menus/:id` | - | `{success}` | 메뉴 삭제 |
| `PUT /api/menus/reorder` | `{menuIds: string[]}` | `{success}` | 메뉴 순서 변경 |
| `POST /api/menus/:id/image` | `FormData(file)` | `{imageUrl}` | 이미지 업로드 |

## OrderController
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `POST /api/orders` | `{storeId, tableId, sessionId, items[]}` | `Order` | 주문 생성 |
| `GET /api/orders` | `?storeId, ?tableId, ?sessionId, ?status` | `Order[]` | 주문 목록 조회 |
| `PATCH /api/orders/:id/status` | `{status}` | `Order` | 주문 상태 변경 |
| `DELETE /api/orders/:id` | - | `{success}` | 주문 삭제 |

## TableController
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `POST /api/tables` | `{storeId, tableNumber, password}` | `Table` | 테이블 설정 |
| `GET /api/tables` | `?storeId` | `Table[]` | 테이블 목록 조회 |
| `POST /api/tables/:id/complete` | - | `{success}` | 테이블 이용 완료 |
| `GET /api/tables/:id/history` | `?startDate, ?endDate` | `OrderHistory[]` | 과거 주문 내역 |

## PaymentController
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `GET /api/payments` | `?storeId, ?tableId, ?status` | `Payment[]` | 결제 상태 조회 |
| `PATCH /api/payments/:orderId` | `{status}` | `Payment` | 결제 상태 변경 |

## SSEController
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `GET /api/sse/orders` | `?storeId, ?tableId` | `SSE stream` | 주문 이벤트 스트림 |

## AuthService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `registerStore()` | `storeName, username, password` | `{store, admin, token}` | 매장+관리자 생성 |
| `loginAdmin()` | `storeId, username, password` | `{token}` | 관리자 인증 |
| `loginTable()` | `storeId, tableNumber, password` | `{token}` | 테이블 인증 |
| `verifyToken()` | `token` | `{payload}` | JWT 검증 |

## MenuService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `getMenus()` | `storeId, category?` | `Menu[]` | 메뉴 조회 |
| `createMenu()` | `menuData` | `Menu` | 메뉴 생성 |
| `updateMenu()` | `id, menuData` | `Menu` | 메뉴 수정 |
| `deleteMenu()` | `id` | `void` | 메뉴 삭제 |
| `reorderMenus()` | `menuIds[]` | `void` | 순서 변경 |

## OrderService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `createOrder()` | `orderData` | `Order` | 주문 생성 (세션 자동 시작 포함) |
| `getOrders()` | `filters` | `Order[]` | 주문 조회 |
| `updateStatus()` | `orderId, status` | `Order` | 상태 변경 |
| `deleteOrder()` | `orderId` | `void` | 주문 삭제 + 총액 재계산 |

## TableService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `setupTable()` | `storeId, tableNumber, password` | `Table` | 테이블 설정 |
| `completeTable()` | `tableId` | `void` | 이용 완료 (주문→이력, 리셋) |
| `getHistory()` | `tableId, dateRange?` | `OrderHistory[]` | 과거 내역 조회 |
| `startSession()` | `tableId` | `Session` | 세션 시작 |

## PaymentService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `getPayments()` | `filters` | `Payment[]` | 결제 상태 조회 |
| `updatePaymentStatus()` | `orderId, status` | `Payment` | 결제 상태 변경 |
| `checkUnpaid()` | `tableId` | `{hasUnpaid, total}` | 미결제 확인 |

## SSEService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `addClient()` | `clientId, response, filters` | `void` | SSE 클라이언트 등록 |
| `removeClient()` | `clientId` | `void` | 클라이언트 제거 |
| `broadcast()` | `event, data, filters` | `void` | 이벤트 브로드캐스트 |

## FileService
| Method | Input | Output | 설명 |
|--------|-------|--------|------|
| `uploadImage()` | `file` | `{imageUrl}` | 이미지 저장 + URL 반환 |
| `deleteImage()` | `imageUrl` | `void` | 이미지 삭제 |
