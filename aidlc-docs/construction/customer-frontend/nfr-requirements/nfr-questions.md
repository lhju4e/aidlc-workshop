# Customer Frontend - NFR Requirements Questions

고객 태블릿 UI (Unit 2) 비기능 요구사항 및 기술 스택 결정을 위한 질문입니다.
각 질문의 [Answer]: 뒤에 선택지 알파벳을 입력해 주세요.

---

## Question 1
React 프로젝트 빌드 도구는?

A) Vite (빠른 빌드, HMR, 최신 표준)
B) Create React App (CRA)
C) Next.js (SSR/SSG 포함)
D) Other (please describe after [Answer]: tag below)

[Answer]: 적절한거로 너가 추천해줘

## Question 2
상태 관리 라이브러리는?

A) React Context API만 사용 (외부 라이브러리 없음)
B) Zustand (경량, 간단한 API)
C) Redux Toolkit (대규모 상태 관리)
D) Other (please describe after [Answer]: tag below)

[Answer]: 적절한거로 너가 추천해줘

## Question 3
CSS/스타일링 방식은?

A) Tailwind CSS (유틸리티 클래스)
B) CSS Modules (컴포넌트별 스코프)
C) styled-components (CSS-in-JS)
D) Other (please describe after [Answer]: tag below)

[Answer]: 적절한거로 너가 추천해줘

## Question 4
HTTP 클라이언트 라이브러리는?

A) fetch API (브라우저 내장, 추가 의존성 없음)
B) Axios (인터셉터, 자동 JSON 변환)
C) Other (please describe after [Answer]: tag below)

[Answer]: 적절한거로 너가 추천해줘

## Question 5
태블릿 최소 지원 화면 크기는?

A) 768px (iPad Mini 기준)
B) 1024px (iPad 기준)
C) 600px (소형 태블릿 포함)
D) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 6
오프라인/네트워크 끊김 시 대응 방식은?

A) 네트워크 끊김 감지 → 상단 배너로 알림 표시
B) 별도 처리 없음 (에러 발생 시 에러 메시지만 표시)
C) 오프라인 모드 지원 (장바구니 유지, 네트워크 복구 시 자동 재시도)
D) Other (please describe after [Answer]: tag below)

[Answer]: d , 에러메세지 표시하고 관리자 계정한테 알림이 가면 좋겠어.

## Question 7
페이지 초기 로딩 성능 목표는?

A) 3초 이내 (일반적 웹앱 수준)
B) 1초 이내 (고성능 목표)
C) 특별한 목표 없음 (합리적 수준이면 OK)
D) Other (please describe after [Answer]: tag below)

[Answer]: a
