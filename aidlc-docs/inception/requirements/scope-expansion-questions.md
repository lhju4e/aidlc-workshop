# Requirements Change - Scope Expansion Clarification

constraints.md에서 제외 범위로 정의된 기능들의 추가를 요청하셨습니다.
각 기능의 구현 범위를 확인하기 위해 아래 질문에 답변해 주세요.

---

## Question 1
결제 기능의 구현 범위는 어떻게 하시겠습니까?

A) 실제 PG사 연동 (토스페이먼츠, KG이니시스 등) + 카드/간편결제
B) 테스트용 결제 모듈 (PG 테스트 모드 연동, 실제 과금 없음)
C) 결제 상태 관리만 구현 (결제 요청/완료/실패 상태 추적, 실제 PG 연동 없이 수동 결제 확인)
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 2
알림 시스템의 구현 범위는 어떻게 하시겠습니까?

A) 브라우저 Web Push 알림 (관리자에게 신규 주문 알림)
B) 소리/진동 알림 (관리자 대시보드에서 신규 주문 시 알림음)
C) 브라우저 Web Push + 소리/진동 알림 모두
D) SMS/이메일 알림 포함
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 3
주방 연동의 구현 범위는 어떻게 하시겠습니까?

A) 주방 디스플레이 화면 (KDS) - 주문 목록 실시간 표시 + 조리 완료 처리
B) 주방 프린터 연동 (주문 접수 시 주방에 주문서 자동 출력)
C) 주방 디스플레이 + 식재료 재고 관리
D) 주방 디스플레이만 (재고 관리 제외)
X) Other (please describe after [Answer]: tag below)

[Answer]: D
