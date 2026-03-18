# Code Generation Plan - Backend API (Unit 1)

## Unit Context
- **Unit**: Backend API + Database
- **기술**: Node.js 20 + Express 4 + TypeScript 5 + MySQL 8 + mysql2
- **Stories**: US-01, US-02, US-04, US-05, US-06, US-07, US-08, US-09, US-10, US-11
- **코드 위치**: `table-order/backend/`

## Generation Steps

### Step 1: Project Structure Setup
- [x] `table-order/backend/package.json` 생성
- [x] `table-order/backend/tsconfig.json` 생성
- [x] `table-order/backend/.env.example` 생성
- [x] `table-order/database/schema.sql` 생성

### Step 2: Core Infrastructure
- [x] `src/config/database.ts`
- [x] `src/models/types.ts`
- [x] `src/utils/AppError.ts`
- [x] `src/utils/transaction.ts`
- [x] `src/middleware/errorHandler.ts`
- [x] `src/middleware/validate.ts`
- [x] `src/middleware/auth.ts`

### Step 3: Repository Layer
- [x] `src/repositories/store.repository.ts`
- [x] `src/repositories/admin.repository.ts`
- [x] `src/repositories/table.repository.ts`
- [x] `src/repositories/session.repository.ts`
- [x] `src/repositories/category.repository.ts`
- [x] `src/repositories/menu.repository.ts`
- [x] `src/repositories/order.repository.ts`
- [x] `src/repositories/payment.repository.ts`

### Step 4: Service Layer
- [x] `src/services/sse.service.ts`
- [x] `src/services/file.service.ts`
- [x] `src/services/auth.service.ts`
- [x] `src/services/menu.service.ts`
- [x] `src/services/order.service.ts`
- [x] `src/services/table.service.ts`
- [x] `src/services/payment.service.ts`

### Step 5: Validators
- [x] `src/validators/auth.validator.ts`
- [x] `src/validators/menu.validator.ts`
- [x] `src/validators/order.validator.ts`
- [x] `src/validators/table.validator.ts`
- [x] `src/validators/payment.validator.ts`

### Step 6: Controllers + Routes
- [x] `src/controllers/auth.controller.ts` + `src/routes/auth.routes.ts`
- [x] `src/controllers/menu.controller.ts` + `src/routes/menu.routes.ts`
- [x] `src/controllers/order.controller.ts` + `src/routes/order.routes.ts`
- [x] `src/controllers/table.controller.ts` + `src/routes/table.routes.ts`
- [x] `src/controllers/payment.controller.ts` + `src/routes/payment.routes.ts`
- [x] `src/controllers/sse.controller.ts` + `src/routes/sse.routes.ts`

### Step 7: App Entry Point
- [x] `src/app.ts`
- [x] `src/server.ts`

### Step 8: Unit Tests
- [x] `src/services/__tests__/auth.service.test.ts`
- [x] `src/services/__tests__/menu.service.test.ts`
- [x] `src/services/__tests__/order.service.test.ts`
- [x] `src/services/__tests__/table.service.test.ts`
- [x] `src/services/__tests__/payment.service.test.ts`
- [x] `src/services/__tests__/sse.service.test.ts`
- [x] `src/middleware/__tests__/auth.test.ts`

### Step 9: Documentation
- [x] `aidlc-docs/construction/backend/code/code-summary.md`
