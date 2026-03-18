# Unit of Work

## 분해 전략
- **아키텍처**: 모놀리스 (단일 서버 + 다중 SPA)
- **배포 단위**: 1개 (Backend + Frontend 빌드 결과물을 하나의 서버에서 서빙)
- **개발 단위**: 3개 Unit (논리적 분리)

## 코드 구조

```
table-order/
├── backend/                    # Unit 1: Backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.ts
│   ├── uploads/                # 이미지 업로드 디렉토리
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── customer/               # Unit 2: Customer Frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   └── App.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── admin/                  # Unit 3: Admin + Kitchen Frontend
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   │   ├── admin/
│       │   │   └── kitchen/
│       │   ├── hooks/
│       │   ├── services/
│       │   ├── store/
│       │   └── App.tsx
│       ├── package.json
│       └── tsconfig.json
├── database/
│   └── schema.sql              # DB 스키마
└── package.json                # Root (workspace)
```

---

## Unit 1: Backend API + Database

| 항목 | 내용 |
|------|------|
| **이름** | backend |
| **유형** | Module (Backend API Server) |
| **기술** | Node.js + Express (TypeScript), MySQL |
| **책임** | REST API, SSE, 인증, 비즈니스 로직, 데이터 접근 |

**포함 컴포넌트**:
- 모든 Controllers (Auth, Menu, Order, Table, Payment, SSE)
- 모든 Services (Auth, Menu, Order, Table, Payment, SSE, File)
- 모든 Repositories
- Middleware (Auth, Error Handler)
- Database 스키마

**핵심 기능**:
- REST API 엔드포인트 제공
- SSE 이벤트 스트림 관리
- JWT 인증/인가
- MySQL 데이터 CRUD
- 이미지 파일 업로드/서빙

---

## Unit 2: Customer Frontend

| 항목 | 내용 |
|------|------|
| **이름** | frontend/customer |
| **유형** | Module (React SPA) |
| **기술** | React (TypeScript) |
| **책임** | 고객 태블릿 UI (메뉴 조회, 장바구니, 주문, 주문 내역) |

**포함 페이지**:
- SetupPage (초기 설정)
- MenuPage (메뉴 조회, 기본 화면)
- CartPage (장바구니)
- OrderPage (주문 확인/생성)
- OrderHistoryPage (주문 내역)

**핵심 기능**:
- 자동 로그인 / 세션 관리
- 메뉴 카드 UI
- 장바구니 로컬 저장
- SSE 주문 상태 실시간 수신

---

## Unit 3: Admin + Kitchen Frontend

| 항목 | 내용 |
|------|------|
| **이름** | frontend/admin |
| **유형** | Module (React SPA) |
| **기술** | React (TypeScript) |
| **책임** | 관리자 대시보드 + 주방 디스플레이 UI |

**관리자 페이지**:
- LoginPage (관리자 로그인)
- RegisterPage (매장 등록)
- DashboardPage (주문 모니터링 그리드)
- TableDetailPage (테이블 상세/세션 관리)
- MenuManagementPage (메뉴 CRUD + 드래그앤드롭)
- OrderHistoryPage (과거 주문 내역)

**주방 페이지**:
- KitchenDisplayPage (주방 주문 디스플레이)

**핵심 기능**:
- 관리자 JWT 인증
- SSE 실시간 주문 모니터링
- 신규 주문 알림음
- 메뉴 드래그앤드롭 순서 조정
- 이미지 업로드
- 결제 상태 관리
- 주방 조리 상태 관리
