# 테이블오더 서비스

테이블 태블릿 기반 주문 관리 시스템 (고객 주문 + 관리자 대시보드 + 주방 디스플레이)

## 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Node.js 20 + Express 4 + TypeScript 5 + MySQL 8 |
| Customer Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Admin/Kitchen Frontend | Next.js 14 + TypeScript + Tailwind CSS + Zustand |
| 실시간 통신 | SSE (Server-Sent Events) |

## 사전 요구사항

- Node.js 20+
- MySQL 8+ 또는 MariaDB 10+
- npm

## 빠른 시작

### 1. 자동 설정 (권장)

```bash
cd table-order
./setup.sh
```

스크립트가 아래 작업을 자동으로 수행합니다:
- DB 생성 + 스키마 적용
- 샘플 데이터 로드 (선택)
- Backend `.env` 파일 생성
- 전체 의존성 설치

### 2. 수동 설정

```bash
# DB 생성 + 스키마
mysql -u root -p < table-order/database/schema.sql

# (선택) 샘플 데이터 로드
mysql -u root -p tableorder < table-order/database/loaddata.sql

# Backend 환경 설정
cp table-order/backend/.env.example table-order/backend/.env
# .env 파일에서 DB_PASSWORD 수정 (특수문자 포함 시 따옴표로 감싸기)
mkdir -p table-order/backend/uploads/images

# 의존성 설치
cd table-order/backend && npm install
cd ../frontend/customer && npm install
cd ../admin && npm install
```

### 3. 실행

3개 터미널에서 각각 실행:

```bash
# 터미널 1 - Backend API (포트 3000)
cd table-order/backend && npm run dev

# 터미널 2 - Customer Frontend (포트 5173)
cd table-order/frontend/customer && npm run dev

# 터미널 3 - Admin/Kitchen Frontend (포트 3001)
cd table-order/frontend/admin && npm run dev
```

### 4. 접속

| 앱 | URL | 설명 |
|---|---|---|
| Customer | http://localhost:5173 | 고객 태블릿 (메뉴 조회, 주문) |
| Admin 로그인 | http://localhost:3001/admin/login | 관리자 로그인 |
| Admin 매장등록 | http://localhost:3001/admin/register | 신규 매장 등록 |
| Admin 대시보드 | http://localhost:3001/admin/dashboard | 주문 모니터링 |
| Admin 테이블관리 | http://localhost:3001/admin/tables | 테이블 CRUD |
| Admin 메뉴관리 | http://localhost:3001/admin/menus | 메뉴 CRUD |
| Admin 결제관리 | http://localhost:3001/admin/payments | 결제 상태 관리 |
| Admin 주문내역 | http://localhost:3001/admin/history | 주문 내역 조회 |
| Kitchen | http://localhost:3001/kitchen | 주방 디스플레이 |

## 샘플 데이터 로그인 정보

샘플 데이터를 로드한 경우:

| 앱 | 로그인 정보 |
|---|---|
| Admin | 매장명: `테스트매장` / 사용자명: `admin` / 비밀번호: `password123` |
| Customer | 매장ID: `f0e2a614-5167-45a4-8ac2-eeaaa3f5f739` / 테이블: `1` / 비밀번호: `table1234` |

## 프로젝트 구조

```
table-order/
├── backend/                    # Backend API (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/        # HTTP 요청 처리
│   │   ├── services/           # 비즈니스 로직
│   │   ├── repositories/       # 데이터 접근
│   │   ├── middleware/         # 인증, 에러 처리
│   │   ├── routes/             # API 라우트
│   │   ├── validators/         # 입력 검증
│   │   └── models/             # 타입 정의
│   └── uploads/                # 이미지 업로드
├── frontend/
│   ├── customer/               # Customer SPA (Vite + React)
│   └── admin/                  # Admin + Kitchen SPA (Next.js)
├── database/
│   ├── schema.sql              # DB 스키마
│   └── loaddata.sql            # 샘플 데이터
├── setup.sh                    # 초기 설정 스크립트
└── README.md
```

## .env 설정 참고

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD="your_password"    # 특수문자(#등) 포함 시 반드시 따옴표
DB_NAME=tableorder
JWT_SECRET=your-secret-key
UPLOAD_DIR=uploads/images
MAX_FILE_SIZE=5242880
```
