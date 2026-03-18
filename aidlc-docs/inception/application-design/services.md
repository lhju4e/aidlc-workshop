# Services

## 서비스 오케스트레이션 패턴

### 레이어 구조
```
Client (Browser) → Controller → Service → Repository → MySQL
                       ↓
                  SSEService (이벤트 발행)
```

## 서비스 정의

### AuthService
- **역할**: 인증/인가 오케스트레이션
- **오케스트레이션**:
  - `registerStore`: StoreRepo.create → AdminRepo.create → JWT 생성
  - `loginAdmin`: StoreRepo.findById → AdminRepo.findByUsername → 비밀번호 검증 → 시도 제한 확인 → JWT 생성
  - `loginTable`: StoreRepo.findById → TableRepo.findByNumber → 비밀번호 검증 → JWT 생성

### OrderService
- **역할**: 주문 처리 오케스트레이션
- **오케스트레이션**:
  - `createOrder`: 세션 확인 → (첫 주문이면 SessionRepo.create) → OrderRepo.create → PaymentRepo.create(미결제) → SSEService.broadcast(newOrder)
  - `updateStatus`: OrderRepo.updateStatus → SSEService.broadcast(statusChange)
  - `deleteOrder`: OrderRepo.delete → 총액 재계산 → SSEService.broadcast(orderDeleted)

### TableService
- **역할**: 테이블/세션 라이프사이클 오케스트레이션
- **오케스트레이션**:
  - `completeTable`: PaymentService.checkUnpaid(경고) → OrderRepo.moveToHistory → SessionRepo.close → 테이블 리셋 → SSEService.broadcast(tableCompleted)

### PaymentService
- **역할**: 결제 상태 오케스트레이션
- **오케스트레이션**:
  - `updatePaymentStatus`: PaymentRepo.update → SSEService.broadcast(paymentChange)

### SSEService
- **역할**: 실시간 이벤트 허브
- **이벤트 타입**:
  - `newOrder`: 신규 주문 생성 시
  - `orderStatusChange`: 주문 상태 변경 시
  - `orderDeleted`: 주문 삭제 시
  - `paymentStatusChange`: 결제 상태 변경 시
  - `tableCompleted`: 테이블 이용 완료 시
- **필터링**: storeId, tableId 기반으로 관련 클라이언트에만 전송

### MenuService
- **역할**: 메뉴 관리 오케스트레이션
- **오케스트레이션**:
  - `createMenu`: 유효성 검증 → FileService.uploadImage(있으면) → MenuRepo.create
  - `reorderMenus`: MenuRepo.bulkUpdateSortOrder

### FileService
- **역할**: 파일 I/O
- **저장 경로**: `uploads/images/{storeId}/{filename}`
- **URL 패턴**: `/uploads/images/{storeId}/{filename}`
