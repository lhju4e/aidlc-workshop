# Customer Frontend - Business Logic Model

## 1. 자동 로그인 플로우

```
앱 시작
  │
  ├─ localStorage에 credentials 있음?
  │   ├─ Yes → POST /api/auth/table/login
  │   │         ├─ 성공 → JWT 저장 → 메뉴 화면
  │   │         └─ 실패 → credentials 삭제 → 설정 화면
  │   └─ No → 설정 화면
  │
  └─ 설정 화면
      └─ 관리자가 storeId, tableNumber, password 입력
          └─ POST /api/auth/table/login
              ├─ 성공 → credentials 저장 → JWT 저장 → 메뉴 화면
              └─ 실패 → 에러 표시
```

## 2. 메뉴 조회 + 장바구니 추가 플로우

```
메뉴 화면 (좌측 카테고리 + 우측 사이드 장바구니)
  │
  ├─ GET /api/menus?storeId={storeId} → 메뉴 목록 로드
  ├─ 좌측 카테고리 클릭 → 해당 카테고리 메뉴 필터링
  │
  └─ 메뉴 카드 클릭
      └─ 상세 모달 표시 (이미지, 이름, 설명, 가격)
          └─ 수량 선택 (+/-) → "장바구니 담기" 클릭
              └─ 장바구니에 추가 (동일 메뉴면 수량 합산)
                  └─ localStorage 동기화
                      └─ 우측 사이드 패널 갱신
```

## 3. 주문 생성 플로우

```
장바구니 사이드 패널 → "주문하기" 클릭
  │
  └─ 주문 확인 모달 (최종 내역 + 총 금액)
      └─ "주문 확정" 클릭
          └─ POST /api/orders (storeId, tableId, sessionId, items)
              ├─ 성공
              │   ├─ 주문 완료 화면 (주문 번호 표시)
              │   ├─ 장바구니 비우기 + localStorage 클리어
              │   └─ 5초 카운트다운 → 메뉴 화면 자동 이동
              └─ 실패
                  ├─ 에러 토스트 표시
                  └─ 장바구니 유지
```

## 4. 주문 내역 + SSE 실시간 업데이트 플로우

```
주문 내역 탭 클릭
  │
  ├─ GET /api/orders?storeId={storeId}&tableId={tableId}&sessionId={sessionId}
  │   └─ 주문 목록 표시 (시간 역순)
  │
  └─ SSE 연결: GET /api/sse/orders?storeId={storeId}&tableId={tableId}
      └─ 이벤트 수신
          ├─ order_status_changed → 해당 주문 상태 갱신 + 토스트 알림
          ├─ order_created → 주문 목록에 추가
          └─ order_deleted → 주문 목록에서 제거
```

## 5. 페이지 네비게이션 구조

```
하단 탭 네비게이션
  ├─ [메뉴] ← 기본 탭
  │   └─ MenuPage (좌측 카테고리 + 메뉴 그리드 + 우측 장바구니 패널)
  ├─ [주문내역]
  │   └─ OrderHistoryPage (주문 목록 + SSE 실시간 업데이트)
  └─ SetupPage (초기 설정 - 탭에 미표시, 인증 전에만 접근)
```

## 6. API 연동 매핑

| 화면 | API | 용도 |
|------|-----|------|
| SetupPage | POST /api/auth/table/login | 테이블 로그인 |
| MenuPage | GET /api/menus?storeId | 메뉴 목록 조회 |
| MenuPage (모달) | - | 장바구니 추가 (로컬) |
| CartPanel | POST /api/orders | 주문 생성 |
| OrderHistoryPage | GET /api/orders?tableId&sessionId | 주문 내역 조회 |
| OrderHistoryPage | GET /api/sse/orders?tableId | SSE 실시간 수신 |
