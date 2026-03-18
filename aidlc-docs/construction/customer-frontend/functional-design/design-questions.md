# Customer Frontend - Functional Design Questions

고객 태블릿 UI (Unit 2) 설계를 위한 질문입니다.
각 질문의 [Answer]: 뒤에 선택지 알파벳을 입력해 주세요.

---

## Question 1
고객 태블릿의 전체 UI 레이아웃 스타일은?

A) 하단 탭 네비게이션 (메뉴/장바구니/주문내역 탭)
B) 사이드바 네비게이션
C) 상단 헤더에 네비게이션 버튼
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
메뉴 카테고리 전환 방식은?

A) 상단 가로 탭 (스크롤 가능)
B) 좌측 사이드 카테고리 목록
C) 드롭다운 선택
D) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 3
메뉴 카드에서 장바구니 추가 방식은?

A) 카드에 바로 +/- 버튼 표시 (수량 직접 조절)
B) 카드 클릭 → 상세 모달에서 수량 선택 후 추가
C) 카드에 "담기" 버튼 → 1개씩 추가 (수량은 장바구니에서 조절)
D) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 4
장바구니 UI 위치는?

A) 별도 페이지 (하단 탭 또는 버튼으로 이동)
B) 화면 우측 사이드 패널 (항상 표시)
C) 하단 슬라이드업 패널 (접었다 펼 수 있음)
D) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 5
주문 성공 후 화면 동작은?

A) 주문 완료 화면 표시 → 5초 후 메뉴 화면 자동 이동 (US-04 AC 기준)
B) 주문 완료 화면 표시 → 사용자가 직접 "메뉴로 돌아가기" 클릭
C) 주문 내역 화면으로 바로 이동
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
태블릿 화면 방향(orientation) 기준은?

A) 가로(Landscape) 전용
B) 세로(Portrait) 전용
C) 반응형 (가로/세로 모두 지원)
D) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 7
메뉴 이미지가 없는 경우 표시 방식은?

A) 기본 플레이스홀더 이미지 표시
B) 이미지 영역 없이 텍스트만 표시
C) 아이콘(예: 음식 아이콘)으로 대체
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 8
주문 내역 페이지에서 SSE 실시간 업데이트 시 시각적 피드백은?

A) 상태 변경 시 해당 주문 카드 하이라이트 애니메이션
B) 토스트 알림으로 상태 변경 안내
C) 상태 텍스트만 변경 (별도 애니메이션 없음)
D) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 9
초기 설정(Setup) 화면에서 입력받을 정보와 방식은?

A) 매장ID + 테이블번호 + 비밀번호를 직접 입력
B) 매장ID + 테이블번호 + 비밀번호를 QR코드로 스캔
C) 관리자가 태블릿에서 직접 설정 (한 번만)
D) Other (please describe after [Answer]: tag below)

[Answer]: c
