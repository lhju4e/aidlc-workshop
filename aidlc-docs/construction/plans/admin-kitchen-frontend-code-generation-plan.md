# Code Generation Plan - Unit 3: Admin+Kitchen Frontend

## Unit Context
- **이름**: frontend/admin
- **기술**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Zustand
- **코드 위치**: `table-order/frontend/admin/`
- **관련 Story**: US-06, US-07, US-08, US-09, US-10, US-11

## Dependencies
- Unit 1 (Backend API): REST API + SSE 엔드포인트 제공
- Backend API URL: `http://localhost:3000/api`

## Plan Steps

- [x] Step 1: 프로젝트 초기 설정
- [x] Step 2: TypeScript 타입 정의 + Axios 인스턴스
- [x] Step 3: Zustand Stores
- [x] Step 4: API Service 모듈
- [x] Step 5: Custom Hooks
- [x] Step 6: 공통 컴포넌트 + Root Layout
- [x] Step 7: 관리자 인증 페이지 (US-06)
- [x] Step 8: 대시보드 + 테이블 상세 (US-07, US-09)
- [x] Step 9: 메뉴 관리 페이지 (US-10)
- [x] Step 10: 결제 관리 + 주문 내역 페이지 (US-08)
- [x] Step 11: 주방 디스플레이 (US-11)
- [x] Step 12: Unit Tests
- [x] Step 13: Code Summary 문서
