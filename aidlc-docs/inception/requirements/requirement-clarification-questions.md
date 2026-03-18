# Requirements Clarification Questions

답변 분석 중 모호한 부분과 모순이 발견되었습니다. 아래 질문에 답변해 주세요.

---

## Ambiguity 1: 기술 스택 선택 (Q1, Q2)
Q1과 Q2에서 "추천해줘"라고 답변하셨습니다. 프로젝트 특성(단일 매장, 소규모, 로컬 배포, SSE 실시간 통신, 이미지 업로드)을 고려하여 추천드립니다:

**Backend 추천: Node.js + Express (TypeScript)**
- SSE 구현이 간단하고 자연스러움
- 파일 업로드 처리 용이 (multer 등)
- Frontend와 동일 언어(TypeScript)로 개발 효율성 높음
- 소규모 프로젝트에 적합한 경량 프레임워크

**Frontend 추천: React (TypeScript)**
- 컴포넌트 기반으로 메뉴 카드, 장바구니, 주문 목록 등 UI 구성에 적합
- 생태계가 풍부하여 드래그앤드롭 등 라이브러리 활용 용이
- TypeScript로 Backend와 타입 공유 가능

### Clarification Question 1
위 추천 기술 스택을 수락하시겠습니까?

A) 수락 - Backend: Node.js + Express (TypeScript), Frontend: React (TypeScript)
B) Backend만 변경하고 싶음 (아래 [Answer]: 태그에 원하는 스택 기재)
C) Frontend만 변경하고 싶음 (아래 [Answer]: 태그에 원하는 스택 기재)
D) 둘 다 변경하고 싶음 (아래 [Answer]: 태그에 원하는 스택 기재)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Contradiction 1: 메뉴 노출 순서 vs 메뉴 관리 제외 (Q10, Q11)
Q10에서 메뉴 관리(CRUD)를 MVP에서 **제외**(B)하셨는데, Q11에서 메뉴 노출 순서 조정을 **드래그앤드롭 UI**(A)로 구현하겠다고 하셨습니다. 메뉴 관리 화면이 없으면 드래그앤드롭 순서 조정 UI를 배치할 곳이 없습니다.

### Clarification Question 2
어떻게 해결하시겠습니까?

A) 메뉴 관리(CRUD) 화면을 MVP에 포함하고, 그 안에 드래그앤드롭 순서 조정도 포함
B) 메뉴 관리(CRUD)는 제외 유지, 순서 조정도 MVP에서 제외 (seed 데이터의 sortOrder 값으로 관리)
C) 메뉴 관리(CRUD)는 제외하되, 순서 조정만 별도 간단한 화면으로 구현
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Clarification 1: 테이블 세션 시작 시점 변경 확인 (Q12)
Q12에서 C(태블릿 자동 로그인 시 세션 시작)를 선택하셨습니다. 원래 요구사항에는 "세션의 첫 주문 시작 시 세션 시작"으로 되어 있었습니다. 이 변경을 확인합니다.

태블릿 자동 로그인 시 세션 시작으로 하면:
- 고객이 주문하지 않아도 세션이 시작됨
- 관리자가 "이용 완료" 처리 후 태블릿이 재로그인하면 바로 새 세션 시작
- 주문 없는 빈 세션이 생길 수 있음

### Clarification Question 3
이 동작이 의도한 것이 맞습니까?

A) 맞음 - 태블릿 자동 로그인 시 세션 시작 (빈 세션 허용)
B) 변경 - 원래 요구사항대로 첫 주문 생성 시 세션 시작
X) Other (please describe after [Answer]: tag below)

[Answer]: B
