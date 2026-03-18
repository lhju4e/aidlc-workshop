# Functional Design Plan - Customer Frontend (Unit 2)

## Unit Context
- **Unit**: Customer Frontend (React SPA)
- **기술**: React + TypeScript
- **Stories**: US-01, US-02, US-03, US-04, US-05
- **책임**: 고객 태블릿 UI (자동 로그인, 메뉴 조회, 장바구니, 주문 생성, 주문 내역)

## Plan Steps

### Step 1: Collect Design Questions
- [ ] 질문 파일 생성 및 사용자 답변 수집
- [ ] 답변 분석 및 모호성 확인

### Step 2: Frontend Components Design
- [ ] `frontend-components.md` 생성
  - 컴포넌트 계층 구조
  - Props/State 정의
  - 사용자 인터랙션 플로우
  - API 연동 포인트

### Step 3: Domain Entities (Frontend)
- [ ] `domain-entities.md` 생성
  - 프론트엔드 데이터 모델/인터페이스
  - API 응답 타입
  - 로컬 상태 타입 (장바구니 등)

### Step 4: Business Rules (Frontend)
- [ ] `business-rules.md` 생성
  - 장바구니 로직
  - 폼 검증 규칙
  - 상태 전이 규칙
  - 에러 처리 규칙

### Step 5: Business Logic Model
- [ ] `business-logic-model.md` 생성
  - 페이지 간 네비게이션 플로우
  - SSE 이벤트 처리 플로우
  - 자동 로그인 플로우
  - 주문 생성 플로우
