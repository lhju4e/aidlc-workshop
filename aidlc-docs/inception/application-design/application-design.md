# Application Design - 통합 문서

## 아키텍처 개요

테이블오더 서비스는 **모놀리식 아키텍처**로 구성됩니다:
- **Backend**: Node.js + Express (TypeScript) - 단일 서버
- **Frontend**: React (TypeScript) - 3개 SPA (고객/관리자/주방)
- **Database**: MySQL - 단일 인스턴스
- **실시간 통신**: SSE (Server-Sent Events)

## 레이어 구조

```
+-----------------------------------------------------------+
|                    Frontend Layer                          |
|  +---------------+ +---------------+ +------------------+ |
|  | Customer App  | |  Admin App    | |  Kitchen App     | |
|  | (React SPA)   | | (React SPA)   | | (React SPA)      | |
|  +---------------+ +---------------+ +------------------+ |
+-----------------------------------------------------------+
                          |
                    REST API + SSE
                          |
+-----------------------------------------------------------+
|                    Backend Layer                           |
|  +----------------------------------------------------+  |
|  |              Controllers (Route Handlers)           |  |
|  |  Auth | Menu | Order | Table | Payment | SSE        |  |
|  +----------------------------------------------------+  |
|  +----------------------------------------------------+  |
|  |              Middleware                              |  |
|  |  Auth Middleware | Error Handler                     |  |
|  +----------------------------------------------------+  |
|  +----------------------------------------------------+  |
|  |              Services (Business Logic)              |  |
|  |  Auth | Menu | Order | Table | Payment | SSE | File |  |
|  +----------------------------------------------------+  |
|  +----------------------------------------------------+  |
|  |              Repositories (Data Access)             |  |
|  |  Store | Admin | Menu | Order | Table | Session |   |  |
|  |  Payment                                            |  |
|  +----------------------------------------------------+  |
+-----------------------------------------------------------+
                          |
+-----------------------------------------------------------+
|                    Data Layer                              |
|  +----------------------------------------------------+  |
|  |                    MySQL                             |  |
|  |  stores | admins | tables | sessions | menus |      |  |
|  |  categories | orders | order_items | payments |     |  |
|  |  order_history                                      |  |
|  +----------------------------------------------------+  |
+-----------------------------------------------------------+
```

## 핵심 데이터 엔티티

| 엔티티 | 설명 |
|--------|------|
| Store | 매장 정보 |
| Admin | 관리자 계정 |
| Table | 테이블 정보 (번호, 비밀번호) |
| Session | 테이블 세션 (시작/종료 시각) |
| Category | 메뉴 카테고리 |
| Menu | 메뉴 항목 (이름, 가격, 설명, 이미지, 순서) |
| Order | 주문 (테이블, 세션, 상태, 총액) |
| OrderItem | 주문 항목 (메뉴, 수량, 단가) |
| Payment | 결제 상태 (주문별) |
| OrderHistory | 과거 주문 이력 (이용 완료 후 이동) |

## SSE 이벤트 흐름

| 이벤트 | 발생 시점 | 수신 대상 |
|--------|-----------|-----------|
| `newOrder` | 주문 생성 | Admin, Kitchen |
| `orderStatusChange` | 상태 변경 (대기중→준비중→완료) | Customer, Admin, Kitchen |
| `orderDeleted` | 주문 삭제 | Customer, Admin, Kitchen |
| `paymentStatusChange` | 결제 상태 변경 | Admin |
| `tableCompleted` | 테이블 이용 완료 | Admin |

## 상세 문서 참조
- 컴포넌트 정의: [components.md](components.md)
- 메서드 시그니처: [component-methods.md](component-methods.md)
- 서비스 오케스트레이션: [services.md](services.md)
- 의존성 관계: [component-dependency.md](component-dependency.md)
