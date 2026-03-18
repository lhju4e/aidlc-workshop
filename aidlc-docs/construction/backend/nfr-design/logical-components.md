# Logical Components - Backend API (Unit 1)

## 프로젝트 구조

```
backend/
├── src/
│   ├── app.ts                    # Express 앱 설정, 미들웨어 등록
│   ├── server.ts                 # 서버 시작 (포트 바인딩)
│   ├── config/
│   │   └── database.ts           # MySQL connection pool 설정
│   ├── middleware/
│   │   ├── auth.ts               # JWT 인증 + 역할 인가 미들웨어
│   │   ├── errorHandler.ts       # 전역 에러 핸들러
│   │   └── validate.ts           # express-validator 결과 처리
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── menu.routes.ts
│   │   ├── order.routes.ts
│   │   ├── table.routes.ts
│   │   ├── payment.routes.ts
│   │   └── sse.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── menu.controller.ts
│   │   ├── order.controller.ts
│   │   ├── table.controller.ts
│   │   ├── payment.controller.ts
│   │   └── sse.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── menu.service.ts
│   │   ├── order.service.ts
│   │   ├── table.service.ts
│   │   ├── payment.service.ts
│   │   ├── sse.service.ts
│   │   └── file.service.ts
│   ├── repositories/
│   │   ├── store.repository.ts
│   │   ├── admin.repository.ts
│   │   ├── menu.repository.ts
│   │   ├── category.repository.ts
│   │   ├── order.repository.ts
│   │   ├── table.repository.ts
│   │   ├── session.repository.ts
│   │   └── payment.repository.ts
│   ├── models/
│   │   └── types.ts              # TypeScript 인터페이스/타입 정의
│   ├── utils/
│   │   ├── AppError.ts           # 커스텀 에러 클래스
│   │   └── transaction.ts        # withTransaction 헬퍼
│   └── validators/
│       ├── auth.validator.ts
│       ├── menu.validator.ts
│       ├── order.validator.ts
│       ├── table.validator.ts
│       └── payment.validator.ts
├── uploads/                      # 이미지 업로드 디렉토리
│   └── images/
├── database/
│   └── schema.sql                # MySQL DDL
├── package.json
├── tsconfig.json
└── .env                          # 환경 변수
```

## 환경 변수 (.env)

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=tableorder
DB_PASSWORD=<password>
DB_NAME=tableorder
JWT_SECRET=<secret>
UPLOAD_DIR=uploads/images
MAX_FILE_SIZE=5242880
```

## Express 미들웨어 체인

```
cors()
express.json()
express.static('uploads')    # 이미지 정적 서빙
routes                       # API 라우트
errorHandler                 # 전역 에러 핸들러
```

## 의존성 주입 방식

- 단순 모듈 import 방식 (DI 프레임워크 미사용)
- Repository → pool 인스턴스 import
- Service → Repository 인스턴스 import
- Controller → Service 인스턴스 import
- 소규모 프로젝트에 적합한 단순한 구조
