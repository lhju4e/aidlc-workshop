# Business Rules - Backend API

## BR-01: 매장 등록
- 매장명은 필수, 1~100자
- 관리자 username은 매장 내 고유
- 비밀번호는 최소 8자
- 매장 등록 시 관리자 계정 자동 생성 (트랜잭션)

## BR-02: 관리자 로그인
- 매장 식별자 + username + password로 인증
- 비밀번호 검증: bcrypt.compare
- 로그인 실패 시 loginAttempts 증가
- **5회 연속 실패 시 15분 잠금** (lockedUntil 설정)
- 로그인 성공 시 loginAttempts 리셋
- JWT 토큰 발급 (만료: 16시간)
- JWT payload: `{adminId, storeId, role: 'admin'}`

## BR-03: 테이블 태블릿 로그인
- 매장 식별자 + 테이블 번호 + 비밀번호로 인증
- 비밀번호 검증: bcrypt.compare
- JWT 토큰 발급 (만료: 16시간)
- JWT payload: `{tableId, storeId, tableNumber, role: 'table'}`

## BR-04: 테이블 설정
- 테이블 번호는 매장 내 고유
- 비밀번호는 최소 8자 (보안 인증용)
- 비밀번호 bcrypt 해싱 후 저장

## BR-05: 메뉴 관리
- 메뉴명 필수, 1~100자
- 가격 필수, 0 이상 정수 (원 단위)
- 카테고리 필수, 유효한 categoryId
- sortOrder: reorder 시 배열 인덱스 기반 일괄 업데이트
- 이미지: 선택사항, 업로드 시 로컬 저장 후 URL 반환

## BR-06: 주문 생성
- 장바구니 items 필수, 1개 이상
- 각 item: menuId, quantity(1 이상) 필수
- menuId 유효성 검증 (해당 매장의 메뉴인지)
- 주문 시점의 메뉴명, 단가를 OrderItem에 스냅샷 저장
- totalAmount = SUM(quantity * unitPrice)
- **세션 자동 시작**: 해당 테이블에 활성 세션이 없으면 새 세션 생성
- 주문 생성 시 Payment 레코드 자동 생성 (status: 'unpaid')
- orderNumber: 매장별 자동 증가
- SSE broadcast: `newOrder` 이벤트

## BR-07: 주문 상태 변경
- 허용 전이: pending → preparing → completed
- 역방향 전이 불가 (completed → preparing 등)
- 상태 변경 시 SSE broadcast: `orderStatusChange`

## BR-08: 주문 삭제
- 관리자만 삭제 가능 (role: 'admin')
- 삭제 시 관련 OrderItem, Payment도 삭제 (CASCADE)
- SSE broadcast: `orderDeleted`

## BR-09: 테이블 이용 완료
- 활성 세션이 있어야 처리 가능
- **미결제 확인**: 해당 세션의 미결제(unpaid) 주문이 있으면 경고 반환 (처리는 계속 가능)
- 세션 completedAt 설정, isActive = false
- 해당 세션의 모든 주문은 과거 이력으로 유지 (isActive=false인 세션으로 필터링)
- SSE broadcast: `tableCompleted`

## BR-10: 결제 상태 변경
- 허용 상태: unpaid, paid, failed
- 관리자만 변경 가능
- updatedAt 자동 갱신
- SSE broadcast: `paymentStatusChange`

## BR-11: 주문 조회 필터링
- **고객 측**: storeId + tableId + 활성 세션의 주문만 반환
- **관리자 측**: storeId 기준, 활성 세션의 주문 (상태/테이블 필터 가능)
- **주방 측**: storeId 기준, status가 pending 또는 preparing인 주문만

## BR-12: 과거 주문 내역 조회
- 완료된 세션(isActive=false)의 주문 조회
- 날짜 범위 필터링 (startDate, endDate)
- 시간 역순 정렬

## BR-13: SSE 연결 관리
- 클라이언트별 storeId, tableId(선택) 필터 등록
- 연결 종료 시 자동 정리
- 이벤트 발행 시 필터 기반으로 관련 클라이언트에만 전송

## BR-14: 이미지 업로드
- 허용 파일 형식: jpg, jpeg, png, gif, webp
- 최대 파일 크기: 5MB
- 저장 경로: `uploads/images/{storeId}/{uuid}.{ext}`
- 기존 이미지 있으면 교체 시 이전 파일 삭제
