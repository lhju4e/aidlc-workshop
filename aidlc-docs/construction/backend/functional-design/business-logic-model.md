# Business Logic Model - Backend API

## 핵심 비즈니스 플로우

### Flow 1: 매장 등록 플로우
```
Client → POST /api/auth/register
  → 입력 검증 (storeName, username, password)
  → 트랜잭션 시작
    → Store 생성
    → Admin 생성 (password → bcrypt hash)
  → 트랜잭션 커밋
  → JWT 토큰 생성
  → 응답: {store, token}
```

### Flow 2: 주문 생성 플로우
```
Client → POST /api/orders
  → JWT 검증 (role: table)
  → 입력 검증 (items[])
  → 메뉴 유효성 검증 (storeId 일치)
  → 트랜잭션 시작
    → 활성 세션 확인
      → 없으면: Session 생성 (세션 자동 시작)
    → Order 생성 (orderNumber 채번)
    → OrderItem[] 생성 (메뉴명/단가 스냅샷)
    → Payment 생성 (status: unpaid)
  → 트랜잭션 커밋
  → SSEService.broadcast('newOrder', order)
  → 응답: {order}
```

### Flow 3: 주문 상태 변경 플로우
```
Client → PATCH /api/orders/:id/status
  → JWT 검증 (role: admin 또는 kitchen 접근)
  → 상태 전이 검증 (pending→preparing→completed)
  → Order.status 업데이트
  → SSEService.broadcast('orderStatusChange', {orderId, status})
  → 응답: {order}
```

### Flow 4: 테이블 이용 완료 플로우
```
Client → POST /api/tables/:id/complete
  → JWT 검증 (role: admin)
  → 활성 세션 확인
  → 미결제 주문 확인 → 경고 포함 응답 (처리는 계속)
  → 트랜잭션 시작
    → Session.isActive = false, completedAt = NOW
  → 트랜잭션 커밋
  → SSEService.broadcast('tableCompleted', {tableId})
  → 응답: {success, unpaidWarning?}
```

### Flow 5: SSE 이벤트 플로우
```
Client → GET /api/sse/orders?storeId=X&tableId=Y
  → JWT 검증
  → SSE 헤더 설정 (Content-Type: text/event-stream)
  → SSEService.addClient(clientId, res, {storeId, tableId})
  → 연결 유지 (heartbeat 30초)
  → 연결 종료 시 → SSEService.removeClient(clientId)
```

## API 인증/인가 매트릭스

| Endpoint | 인증 필요 | 허용 역할 |
|----------|-----------|-----------|
| POST /api/auth/register | ❌ | 공개 |
| POST /api/auth/admin/login | ❌ | 공개 |
| POST /api/auth/table/login | ❌ | 공개 |
| GET /api/menus | ✅ | table, admin |
| POST /api/menus | ✅ | admin |
| PUT /api/menus/:id | ✅ | admin |
| DELETE /api/menus/:id | ✅ | admin |
| PUT /api/menus/reorder | ✅ | admin |
| POST /api/menus/:id/image | ✅ | admin |
| POST /api/orders | ✅ | table |
| GET /api/orders | ✅ | table, admin |
| PATCH /api/orders/:id/status | ✅ | admin |
| DELETE /api/orders/:id | ✅ | admin |
| POST /api/tables | ✅ | admin |
| GET /api/tables | ✅ | admin |
| POST /api/tables/:id/complete | ✅ | admin |
| GET /api/tables/:id/history | ✅ | admin |
| GET /api/payments | ✅ | admin |
| PATCH /api/payments/:orderId | ✅ | admin |
| GET /api/sse/orders | ✅ | table, admin |

## 주문 상태 전이 다이어그램

```
+----------+     +------------+     +-----------+
| pending  +---->+ preparing  +---->+ completed |
| (대기중) |     | (준비중)    |     | (완료)    |
+----------+     +------------+     +-----------+
```
- 역방향 전이 불가
- 삭제는 어떤 상태에서든 가능 (관리자만)

## 결제 상태 전이

```
+--------+     +------+
| unpaid +---->+ paid |
| (미결제)|     |(결제완료)|
+---+----+     +------+
    |
    +--------->+--------+
               | failed |
               |(결제실패)|
               +--------+
```
- unpaid → paid, unpaid → failed 가능
- paid → unpaid (환불 시나리오는 MVP 제외)
