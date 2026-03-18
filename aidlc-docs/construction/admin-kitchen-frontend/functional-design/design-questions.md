# Functional Design Questions - Unit 3: Admin+Kitchen Frontend

아래 질문에 답변해주세요. 각 질문의 [Answer]: 뒤에 선택지 알파벳을 입력해주세요.

---

## Question 1
관리자 대시보드(DashboardPage)의 테이블 카드 그리드에서 테이블 상태를 어떻게 시각적으로 구분하시겠습니까?

A) 색상만으로 구분 (예: 빈 테이블=회색, 주문 있음=파랑, 신규 주문=빨강)
B) 색상 + 아이콘 조합 (색상 구분 + 상태 아이콘 표시)
C) 색상 + 뱃지 숫자 (색상 구분 + 대기 주문 수 뱃지)
D) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 2
대시보드에서 테이블 카드 클릭 시 상세 보기를 어떤 방식으로 표시하시겠습니까?

A) 별도 페이지로 이동 (TableDetailPage)
B) 모달/다이얼로그로 표시 (현재 페이지 유지)
C) 사이드 패널(Drawer)로 표시 (대시보드 옆에 슬라이드)
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 3
메뉴 관리 페이지에서 메뉴 등록/수정 폼을 어떤 방식으로 제공하시겠습니까?

A) 인라인 편집 (목록에서 직접 수정)
B) 모달/다이얼로그 폼
C) 별도 페이지로 이동
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 4
주방 디스플레이(KitchenDisplayPage)의 주문 카드 레이아웃을 어떻게 구성하시겠습니까?

A) 단일 리스트 (시간순 정렬, 스크롤)
B) 칸반 보드 스타일 (대기중 | 준비중 컬럼 분리)
C) 그리드 카드 (테이블별 카드, 상태 색상 구분)
D) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 5
관리자/주방 앱 간 라우팅을 어떻게 구분하시겠습니까? (동일 SPA 내)

A) URL 경로 기반 분리 (/admin/*, /kitchen/*)
B) 로그인 후 역할 선택 화면 제공 (관리자 모드 / 주방 모드)
C) 관리자 로그인 후 대시보드에서 주방 디스플레이 링크로 이동
D) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 6
신규 주문 알림음 기능의 상세 동작을 어떻게 설정하시겠습니까?

A) 단순 ON/OFF 토글만 (기본 알림음 1개)
B) ON/OFF 토글 + 볼륨 조절
C) ON/OFF 토글 + 알림음 종류 선택 (2~3가지)
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 7
결제 상태 관리 UI를 어디에 배치하시겠습니까?

A) 테이블 상세 페이지(TableDetailPage) 내 주문별 결제 상태 표시/변경
B) 별도 결제 관리 페이지
C) 대시보드 테이블 카드에서 바로 결제 상태 변경 가능
D) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 8
과거 주문 내역(OrderHistoryPage)의 필터링/검색 기능 범위를 어떻게 하시겠습니까?

A) 날짜 범위 필터만
B) 날짜 범위 + 테이블 번호 필터
C) 날짜 범위 + 테이블 번호 + 주문 상태 필터
D) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 9
관리자 앱의 반응형 디자인 지원 범위를 어떻게 하시겠습니까?

A) 데스크톱 전용 (최소 1024px)
B) 데스크톱 + 태블릿 (최소 768px)
C) 데스크톱 + 태블릿 + 모바일 (완전 반응형)
D) Other (please describe after [Answer]: tag below)

[Answer]: C
