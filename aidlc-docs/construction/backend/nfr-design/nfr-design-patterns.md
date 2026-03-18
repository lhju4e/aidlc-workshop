# NFR Design Patterns - Backend API (Unit 1)

## Pattern 1: 3-Layer Architecture

```
Request → Router → Auth Middleware → Controller → Service → Repository → MySQL
                                         ↓
                                    SSEService.broadcast()
```

- **Controller**: HTTP 요청/응답 처리, 입력 검증
- **Service**: 비즈니스 로직, 트랜잭션 관리
- **Repository**: SQL 쿼리 실행, 데이터 매핑

## Pattern 2: JWT Stateless Authentication

```typescript
// 미들웨어 체인
authenticate(req, res, next)     // JWT 검증, req.user 설정
authorize(...roles)(req, res, next) // 역할 확인
```

- 토큰 위치: `Authorization: Bearer <token>`
- Payload: `{id, storeId, role, tableNumber?}`
- 만료: 16시간
- Stateless: 서버 재시작 영향 없음

## Pattern 3: Centralized Error Handling

```typescript
// 커스텀 에러 클래스
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number)
}

// 전역 에러 핸들러 (Express 마지막 미들웨어)
errorHandler(err, req, res, next) {
  // AppError → 해당 statusCode + message
  // 기타 에러 → 500 + "Internal Server Error"
}
```

- 비즈니스 에러: AppError(message, 400/401/403/404/409)
- 시스템 에러: 500 + 일반 메시지 (내부 정보 노출 방지)

## Pattern 4: Input Validation Middleware

```typescript
// express-validator 체인
const createOrderValidation = [
  body('items').isArray({ min: 1 }),
  body('items.*.menuId').isUUID(),
  body('items.*.quantity').isInt({ min: 1 }),
  handleValidationErrors  // 검증 실패 시 400 응답
];
```

- 모든 API 엔드포인트에 검증 미들웨어 적용
- Controller 진입 전 검증 완료

## Pattern 5: Connection Pool

```typescript
const pool = mysql.createPool({
  host, port, user, password, database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

- 최대 10개 연결
- 자동 연결 반환
- 트랜잭션 시 pool.getConnection() → conn.beginTransaction()

## Pattern 6: Transaction Management

```typescript
async function withTransaction<T>(fn: (conn: Connection) => Promise<T>): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
```

- 매장 등록, 주문 생성, 이용 완료에 적용
- 실패 시 자동 롤백

## Pattern 7: SSE Event Hub (In-Memory)

```typescript
class SSEService {
  private clients: Map<string, SSEClient>;

  addClient(id, res, filters: {storeId, tableId?})
  removeClient(id)
  broadcast(event, data, filters: {storeId, tableId?})
}
```

- 클라이언트별 storeId/tableId 필터
- broadcast 시 필터 매칭 클라이언트에만 전송
- 30초 heartbeat (`:keepalive\n\n`)
- 연결 종료 시 자동 정리 (`req.on('close')`)

## Pattern 8: Login Brute-Force Protection

```
로그인 시도 → loginAttempts 확인
  → lockedUntil > NOW → 403 "계정 잠금"
  → 비밀번호 불일치 → loginAttempts++
    → loginAttempts >= 5 → lockedUntil = NOW + 15분
  → 비밀번호 일치 → loginAttempts = 0, lockedUntil = null
```

## Pattern 9: File Upload with Validation

```
POST multipart/form-data → multer 미들웨어
  → 파일 형식 검증 (jpg/png/gif/webp)
  → 파일 크기 검증 (5MB)
  → UUID 파일명 생성
  → uploads/images/{storeId}/ 저장
  → URL 반환
```
