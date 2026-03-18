# Requirements Verification Questions

아래 질문들에 답변해 주세요. 각 질문의 `[Answer]:` 태그 뒤에 선택지 알파벳을 입력해 주세요.
선택지 중 맞는 것이 없으면 X를 선택하고 설명을 추가해 주세요.

---

## Question 1
기술 스택 (Backend Framework)을 어떤 것으로 사용하시겠습니까?

A) Node.js + Express (JavaScript/TypeScript)
B) Spring Boot (Java/Kotlin)
C) Django / FastAPI (Python)
D) Go (Gin/Echo)
X) Other (please describe after [Answer]: tag below)

[Answer]: 추천해서 써줘

## Question 2
기술 스택 (Frontend Framework)을 어떤 것으로 사용하시겠습니까?

A) React (JavaScript/TypeScript)
B) Vue.js
C) Next.js (React 기반 SSR)
D) Angular
X) Other (please describe after [Answer]: tag below)

[Answer]: 백엔드랑 맞는걸로 추천해줘

## Question 3
데이터베이스로 어떤 것을 사용하시겠습니까?

A) PostgreSQL
B) MySQL
C) DynamoDB (NoSQL)
D) MongoDB (NoSQL)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 4
배포 환경은 어떻게 계획하고 계십니까?

A) AWS 클라우드 (EC2, ECS, Lambda 등)
B) 로컬/온프레미스 서버
C) Docker Compose 기반 로컬 개발 환경만 (배포는 추후 결정)
D) Kubernetes 기반
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 5
관리자 계정 관리 방식은 어떻게 하시겠습니까? 요구사항에 매장 인증(매장 식별자 + 사용자명 + 비밀번호)이 있는데, 관리자 계정 생성은 어떻게 처리하나요?

A) 시스템 초기 설정 시 seed 데이터로 기본 관리자 계정 생성 (추후 관리자가 추가 계정 생성)
B) 회원가입 API를 통해 관리자가 직접 계정 생성
C) 매장 등록 시 관리자 계정이 자동 생성되는 매장 등록 프로세스 구현
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 6
매장(Store) 관리 범위는 어떻게 되나요? 현재 요구사항에는 매장 생성/수정/삭제 기능이 명시되어 있지 않습니다.

A) 단일 매장만 지원 (DB에 하나의 매장 데이터만 존재)
B) 다중 매장 지원하되, 매장 CRUD는 seed 데이터 또는 DB 직접 관리
C) 다중 매장 지원 + 매장 관리 API 구현
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 7
테이블 태블릿의 자동 로그인에서 "테이블 비밀번호"는 어떤 용도인가요? 보안 수준을 확인하고 싶습니다.

A) 단순 식별용 (4자리 PIN 수준, 태블릿 초기 설정 시 사용)
B) 보안 인증용 (복잡한 비밀번호, 태블릿 도난/무단 사용 방지)
C) 태블릿-서버 간 API 인증 토큰 역할 (JWT 등)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 8
메뉴 이미지 관리 방식은 어떻게 하시겠습니까? 요구사항에 "이미지 URL"이 있는데, 이미지 업로드/저장은 제외 범위(constraints.md)에 포함되어 있습니다.

A) 외부 이미지 URL 직접 입력 (관리자가 이미 호스팅된 이미지 URL을 입력)
B) 로컬 서버에 이미지 파일 업로드 기능 구현 (간단한 파일 업로드)
C) 이미지 기능 자체를 MVP에서 제외 (placeholder 이미지 사용)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 9
주문 상태 실시간 업데이트(고객 측)에 대해 요구사항에 "(선택사항)"이라고 되어 있습니다. MVP에 포함하시겠습니까?

A) 포함 - 고객도 SSE로 주문 상태 실시간 업데이트 수신
B) 제외 - 고객은 페이지 새로고침 또는 수동 조회로 상태 확인
C) 간단한 polling 방식으로 구현 (30초 간격 등)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 10
메뉴 관리 기능이 관리자용 기능(3.2.4)에는 있지만, MVP 범위(섹션 4)의 관리자용 목록에는 명시되어 있지 않습니다. 메뉴 관리(CRUD)를 MVP에 포함하시겠습니까?

A) 포함 - 관리자 화면에서 메뉴 CRUD 기능 구현
B) 제외 - seed 데이터로 메뉴 초기 설정, 관리 화면 없이 DB 직접 관리
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 11
"메뉴 노출 순서 조정" 기능의 구현 수준은 어떻게 하시겠습니까?

A) 드래그 앤 드롭 UI로 순서 변경
B) 숫자 입력으로 순서(sortOrder) 지정
C) MVP에서 제외 (등록 순서대로 표시)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 12
테이블 세션의 "첫 주문 시 세션 시작"에 대해 확인합니다. 테이블 세션 시작 시점은 정확히 언제인가요?

A) 고객이 해당 테이블에서 첫 번째 주문을 생성(확정)하는 시점에 자동으로 세션 시작
B) 관리자가 "테이블 세션 시작" 버튼을 눌러 수동으로 시작
C) 태블릿이 자동 로그인되는 시점에 세션 시작
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 13
동시 접속 및 부하 규모를 어느 정도로 예상하시나요? (NFR 설계에 필요)

A) 소규모 - 단일 매장, 동시 테이블 10개 이하
B) 중규모 - 단일 매장, 동시 테이블 10~50개
C) 대규모 - 다중 매장, 매장당 50개 이상 테이블
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 14
Security Extension 규칙을 이 프로젝트에 적용하시겠습니까?

A) Yes — 모든 SECURITY 규칙을 blocking constraint로 적용 (프로덕션 수준 애플리케이션에 권장)
B) No — SECURITY 규칙 건너뛰기 (PoC, 프로토타입, 실험적 프로젝트에 적합)
X) Other (please describe after [Answer]: tag below)

[Answer]: B
