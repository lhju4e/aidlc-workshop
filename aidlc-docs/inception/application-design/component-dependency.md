# Component Dependencies

## 의존성 매트릭스

| Component | 의존 대상 |
|-----------|-----------|
| AuthController | AuthService |
| MenuController | MenuService, FileService |
| OrderController | OrderService |
| TableController | TableService |
| PaymentController | PaymentService |
| SSEController | SSEService |
| AuthService | StoreRepo, AdminRepo, TableRepo |
| MenuService | MenuRepo, FileService |
| OrderService | OrderRepo, SessionRepo, PaymentRepo, SSEService |
| TableService | TableRepo, OrderRepo, SessionRepo, PaymentService, SSEService |
| PaymentService | PaymentRepo, SSEService |
| FileService | (파일 시스템) |
| SSEService | (HTTP Response 객체 관리) |
| Auth Middleware | AuthService |
| Customer App | MenuController, OrderController, SSEController |
| Admin App | AuthController, OrderController, TableController, MenuController, PaymentController, SSEController |
| Kitchen App | OrderController, SSEController |

## 데이터 흐름

```
+------------------+     +------------------+     +------------------+
|   Customer App   |     |    Admin App     |     |   Kitchen App    |
| (Table Tablet)   |     | (PC/Tablet)      |     | (Kitchen Display)|
+--------+---------+     +--------+---------+     +--------+---------+
         |                        |                        |
         +------------+-----------+------------+-----------+
                      |                        |
                      v                        v
              +-------+--------+       +-------+--------+
              | REST API       |       | SSE Endpoint   |
              | Controllers    |       | SSEController  |
              +-------+--------+       +-------+--------+
                      |                        |
                      v                        v
              +-------+--------+       +-------+--------+
              | Services       +------>+ SSEService     |
              | (Business      |       | (Event Hub)    |
              |  Logic)        |       +----------------+
              +-------+--------+
                      |
                      v
              +-------+--------+
              | Repositories   |
              | (Data Access)  |
              +-------+--------+
                      |
                      v
              +-------+--------+
              |     MySQL      |
              +----------------+
```

## 통신 패턴

| 패턴 | 사용처 |
|------|--------|
| REST (동기) | 모든 CRUD 연산 (Client → Controller → Service → Repo) |
| SSE (비동기, 서버→클라이언트) | 주문 실시간 업데이트, 상태 변경 알림 |
| 내부 호출 (동기) | Service → SSEService.broadcast() |
