# Customer Frontend - Business Rules

## 1. 인증 규칙

### BR-AUTH-01: 자동 로그인
- localStorage에 `SetupCredentials`가 존재하면 자동 로그인 시도
- 성공 시: JWT 토큰 저장 → 메뉴 화면 이동
- 실패 시: 저장된 credentials 삭제 → 초기 설정 화면 표시

### BR-AUTH-02: 초기 설정
- 관리자가 1회 설정 (storeId, tableNumber, password)
- 설정 완료 후 credentials를 localStorage에 저장
- 이후 자동 로그인 활성화

### BR-AUTH-03: 세션 만료
- JWT 토큰 만료(16시간) 시 저장된 credentials로 자동 재로그인 시도
- 재로그인 실패 시 초기 설정 화면으로 이동

## 2. 장바구니 규칙

### BR-CART-01: 아이템 추가
- 상세 모달에서 수량 선택 후 추가
- 동일 메뉴 추가 시 기존 아이템의 수량 합산
- 최소 수량: 1

### BR-CART-02: 수량 조절
- 사이드 패널에서 +/- 버튼으로 조절
- 수량 1에서 감소 시 해당 아이템 삭제
- 최대 수량 제한 없음

### BR-CART-03: 총 금액 계산
- `totalAmount = Σ(unitPrice × quantity)` 실시간 계산
- 원화(₩) 단위, 천 단위 콤마 표시

### BR-CART-04: 로컬 저장
- 장바구니 변경 시 localStorage에 즉시 동기화
- 페이지 새로고침 시 localStorage에서 복원
- 주문 확정 시 장바구니 비우기 + localStorage 클리어

### BR-CART-05: 장바구니 비우기
- "전체 삭제" 버튼으로 장바구니 초기화
- 확인 없이 즉시 삭제

## 3. 주문 규칙

### BR-ORDER-01: 주문 생성 조건
- 장바구니에 1개 이상의 아이템이 있어야 함
- 유효한 JWT 토큰이 있어야 함

### BR-ORDER-02: 주문 성공 처리
- 주문 번호 표시
- 장바구니 자동 비우기
- 5초 카운트다운 후 메뉴 화면 자동 이동
- 카운트다운 중 수동 이동 가능

### BR-ORDER-03: 주문 실패 처리
- 에러 메시지 표시 (토스트)
- 장바구니 유지 (삭제하지 않음)
- 재시도 가능

### BR-ORDER-04: 주문 정보 구성
- 매장 ID, 테이블 ID, 세션 ID는 JWT에서 추출
- items: menuId, menuName, quantity, unitPrice 배열
- totalAmount: 프론트엔드 계산값

## 4. 주문 내역 규칙

### BR-HISTORY-01: 표시 범위
- 현재 테이블 세션의 주문만 표시
- 이전 세션 / 이용 완료된 주문 제외

### BR-HISTORY-02: 정렬
- 주문 시간 역순 (최신 주문이 위)

### BR-HISTORY-03: SSE 실시간 업데이트
- 주문 상태 변경 시 토스트 알림 표시
- 토스트: "주문 #[번호] 상태가 [상태]로 변경되었습니다"
- 주문 목록 자동 갱신

## 5. UI 표시 규칙

### BR-UI-01: 메뉴 이미지
- imageUrl이 null이면 기본 플레이스홀더 이미지 표시

### BR-UI-02: 가격 표시
- 형식: `₩12,000` (원화 기호 + 천 단위 콤마)

### BR-UI-03: 주문 상태 표시
- pending → "대기중" (주황색)
- preparing → "준비중" (파란색)
- completed → "완료" (초록색)
