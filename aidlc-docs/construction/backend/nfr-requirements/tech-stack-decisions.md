# Tech Stack Decisions - Backend API (Unit 1)

## 확정 기술 스택

| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| Runtime | Node.js | 20 LTS | 안정적, SSE 네이티브 지원, TypeScript 호환 |
| Framework | Express | 4.x | 경량, 미들웨어 생태계, SSE 구현 용이 |
| Language | TypeScript | 5.x | 타입 안전성, Frontend와 언어 통일 |
| Database | MySQL | 8.x | 관계형 데이터, 트랜잭션 지원, 안정성 |
| DB Client | mysql2 | latest | Promise 지원, prepared statement, connection pool |
| Authentication | jsonwebtoken | latest | JWT 생성/검증 |
| Password | bcrypt | latest | 비밀번호 해싱 |
| File Upload | multer | latest | Express 파일 업로드 미들웨어 |
| Validation | express-validator | latest | 입력 검증 미들웨어 |
| UUID | uuid | latest | 엔티티 ID 생성 |
| CORS | cors | latest | Cross-Origin 요청 허용 |
| Environment | dotenv | latest | 환경 변수 관리 |

## 개발 도구

| 도구 | 용도 |
|------|------|
| ts-node-dev | 개발 서버 (hot reload) |
| typescript | TypeScript 컴파일러 |
| @types/* | TypeScript 타입 정의 |
| jest + ts-jest | 단위 테스트 |

## 아키텍처 결정

| 결정 | 내용 | 근거 |
|------|------|------|
| ORM 미사용 | 직접 SQL 쿼리 (mysql2) | 소규모 프로젝트, 쿼리 제어 용이, 의존성 최소화 |
| SSE 직접 구현 | Express Response 객체 활용 | 라이브러리 불필요, 소규모 연결 수 |
| 인메모리 SSE 관리 | Map 기반 클라이언트 관리 | 단일 서버, 소규모 (Redis 불필요) |
| 파일 로컬 저장 | uploads/ 디렉토리 | 로컬 배포, S3 불필요 |
| Connection Pool | mysql2 pool (max: 10) | 소규모 동시 접속에 적합 |
