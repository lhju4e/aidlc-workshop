# Code Summary - Backend API (Unit 1)

## 생성된 파일 목록

### Project Setup (4 files)
- `table-order/backend/package.json`
- `table-order/backend/tsconfig.json`
- `table-order/backend/.env.example`
- `table-order/database/schema.sql`

### Core Infrastructure (7 files)
- `src/config/database.ts` - MySQL connection pool
- `src/models/types.ts` - TypeScript 인터페이스
- `src/utils/AppError.ts` - 커스텀 에러 클래스
- `src/utils/transaction.ts` - 트랜잭션 헬퍼
- `src/middleware/errorHandler.ts` - 전역 에러 핸들러
- `src/middleware/validate.ts` - 검증 미들웨어
- `src/middleware/auth.ts` - JWT 인증/인가

### Repository Layer (8 files)
- `src/repositories/store.repository.ts`
- `src/repositories/admin.repository.ts`
- `src/repositories/table.repository.ts`
- `src/repositories/session.repository.ts`
- `src/repositories/category.repository.ts`
- `src/repositories/menu.repository.ts`
- `src/repositories/order.repository.ts`
- `src/repositories/payment.repository.ts`

### Service Layer (7 files)
- `src/services/sse.service.ts`
- `src/services/file.service.ts`
- `src/services/auth.service.ts`
- `src/services/menu.service.ts`
- `src/services/order.service.ts`
- `src/services/table.service.ts`
- `src/services/payment.service.ts`

### Validators (5 files)
- `src/validators/auth.validator.ts`
- `src/validators/menu.validator.ts`
- `src/validators/order.validator.ts`
- `src/validators/table.validator.ts`
- `src/validators/payment.validator.ts`

### Controllers + Routes (12 files)
- `src/controllers/auth.controller.ts` + `src/routes/auth.routes.ts`
- `src/controllers/menu.controller.ts` + `src/routes/menu.routes.ts`
- `src/controllers/order.controller.ts` + `src/routes/order.routes.ts`
- `src/controllers/table.controller.ts` + `src/routes/table.routes.ts`
- `src/controllers/payment.controller.ts` + `src/routes/payment.routes.ts`
- `src/controllers/sse.controller.ts` + `src/routes/sse.routes.ts`

### App Entry (2 files)
- `src/app.ts`
- `src/server.ts`

### Unit Tests (7 files)
- `src/services/__tests__/sse.service.test.ts`
- `src/services/__tests__/auth.service.test.ts`
- `src/services/__tests__/order.service.test.ts`
- `src/services/__tests__/menu.service.test.ts`
- `src/services/__tests__/table.service.test.ts`
- `src/services/__tests__/payment.service.test.ts`
- `src/middleware/__tests__/auth.test.ts`

### Config (1 file)
- `jest.config.js`

**총 파일 수**: 54개
