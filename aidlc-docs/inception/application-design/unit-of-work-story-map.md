# Unit of Work - Story Map

## Story → Unit 매핑

| Story | Unit 1 (Backend) | Unit 2 (Customer FE) | Unit 3 (Admin+Kitchen FE) |
|-------|:-----------------:|:--------------------:|:-------------------------:|
| US-01: 테이블 자동 로그인 | ✅ API | ✅ UI | |
| US-02: 메뉴 조회 | ✅ API | ✅ UI | |
| US-03: 장바구니 관리 | | ✅ UI (로컬) | |
| US-04: 주문 생성 | ✅ API | ✅ UI | |
| US-05: 주문 내역 조회 | ✅ API+SSE | ✅ UI | |
| US-06: 매장 등록/관리자 인증 | ✅ API | | ✅ UI |
| US-07: 실시간 주문 모니터링 | ✅ API+SSE | | ✅ UI |
| US-08: 결제 상태 관리 | ✅ API | | ✅ UI |
| US-09: 테이블 설정/세션 관리 | ✅ API | | ✅ UI |
| US-10: 메뉴 관리 | ✅ API | | ✅ UI |
| US-11: 주방 주문 확인/조리 | ✅ API+SSE | | ✅ UI |

## Unit별 Story 요약

### Unit 1: Backend API
- **전체 Story 관여**: US-01~02, US-04~11 (US-03 제외 - 장바구니는 클라이언트 전용)
- **Story 수**: 10/11

### Unit 2: Customer Frontend
- **관련 Story**: US-01, US-02, US-03, US-04, US-05
- **Story 수**: 5/11

### Unit 3: Admin + Kitchen Frontend
- **관련 Story**: US-06, US-07, US-08, US-09, US-10, US-11
- **Story 수**: 6/11
