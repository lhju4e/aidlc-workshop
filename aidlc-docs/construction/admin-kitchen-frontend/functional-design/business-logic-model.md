# Business Logic Model - Unit 3: Admin+Kitchen Frontend

## 라우팅 구조

```
/admin/login          → LoginPage
/admin/register       → RegisterPage
/admin/dashboard      → DashboardPage
/admin/menus          → MenuManagementPage
/admin/payments       → PaymentManagementPage
/admin/history        → OrderHistoryPage
/kitchen              → KitchenDisplayPage
```

- `/admin/*` 경로는 JWT 인증 필수 (미인증 시 /admin/login 리다이렉트)
- `/kitchen` 경로는 `/admin/*`와 동일 JWT 사용 (관리자 로그인 후 접근)

---

## 핵심 UI 플로우

### Flow 1: 관리자 인증 플로우
```
RegisterPage
  → 매장명, 사용자명, 비밀번호 입력
  → 클라이언트 검증 (필수값, 비밀번호 8자 이상)
  → POST /api/auth/register
  → 성공: JWT 저장 (localStorage) → /admin/dashboard 이동
  → 실패: 에러 메시지 표시

LoginPage
  → 매장 식별자, 사용자명, 비밀번호 입력
  → POST /api/auth/admin/login
  → 성공: JWT 저장 (localStorage) → /admin/dashboard 이동
  → 실패: 에러 메시지 표시 (잠금 시 남은 시간 표시)
```

### Flow 2: 대시보드 주문 모니터링 플로우
```
DashboardPage 진입
  → GET /api/tables?storeId=X → 테이블 목록 로드
  → GET /api/orders?storeId=X → 활성 주문 로드
  → SSE 연결 (GET /api/sse/orders?storeId=X)
  → 테이블별 카드 그리드 렌더링
    → 각 카드: 테이블 번호, 총 주문액, 대기 주문 수 뱃지, 상태 색상
  → SSE 이벤트 수신 시:
    → newOrder: 해당 테이블 카드 업데이트 + 알림음 재생
    → orderStatusChange: 해당 주문 상태 업데이트
    → orderDeleted: 해당 주문 제거 + 총액 재계산
    → tableCompleted: 해당 테이블 카드 리셋
  → 테이블 카드 클릭 → 모달 표시 (주문 목록 상세)
    → 주문 상태 변경 (pending→preparing→completed)
    → 주문 삭제 (확인 팝업)
    → 테이블 이용 완료 (미결제 경고 → 확인 팝업)
```

### Flow 3: 메뉴 관리 플로우
```
MenuManagementPage 진입
  → GET /api/menus?storeId=X → 카테고리별 메뉴 로드
  → 카테고리 탭/필터로 분류 표시
  → 메뉴 추가 버튼 → 모달 폼 (메뉴명, 가격, 설명, 카테고리, 이미지)
    → 클라이언트 검증 → POST /api/menus + POST /api/menus/:id/image
  → 메뉴 수정 버튼 → 모달 폼 (기존 값 프리필)
    → PUT /api/menus/:id
  → 메뉴 삭제 → 확인 팝업 → DELETE /api/menus/:id
  → 드래그앤드롭 순서 변경 → PUT /api/menus/reorder
```

### Flow 4: 결제 관리 플로우
```
PaymentManagementPage 진입
  → GET /api/payments?storeId=X → 결제 목록 로드
  → 테이블별 그룹핑, 총 결제/미결제 금액 표시
  → 결제 상태 변경 버튼 → PATCH /api/payments/:orderId
  → SSE paymentStatusChange 이벤트로 실시간 업데이트
```

### Flow 5: 과거 주문 내역 플로우
```
OrderHistoryPage 진입
  → 필터 UI: 날짜 범위 + 테이블 번호 + 주문 상태
  → GET /api/tables/:id/history?startDate&endDate → 필터링된 내역 로드
  → 시간 역순 정렬 표시
  → 각 항목: 주문 번호, 시각, 메뉴 목록, 총 금액, 이용 완료 시각
```

### Flow 6: 주방 디스플레이 플로우
```
KitchenDisplayPage 진입
  → GET /api/orders?storeId=X&status=pending,preparing → 미완료 주문 로드
  → SSE 연결 (GET /api/sse/orders?storeId=X)
  → 테이블별 그리드 카드 렌더링
    → 각 카드: 테이블 번호, 메뉴명/수량, 주문 시각, 상태 색상
    → 대기중(pending): 주황색, 준비중(preparing): 파란색
  → 조리 시작 버튼 → PATCH /api/orders/:id/status {status: 'preparing'}
  → 조리 완료 버튼 → PATCH /api/orders/:id/status {status: 'completed'}
  → 완료된 주문은 목록에서 자동 제거
  → 신규 주문 SSE 수신 시 알림음 재생 + 카드 추가
```

## 알림음 시스템
```
알림 설정 (localStorage 저장):
  → enabled: boolean (기본값: true)
  → volume: number 0~100 (기본값: 70)
  → Audio API로 재생
  → 브라우저 autoplay 정책: 첫 사용자 인터랙션 후 활성화
```
