# Tech Stack Decisions - Unit 3: Admin+Kitchen Frontend

## 확정 기술 스택

| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| Framework | Next.js | 14.x | App Router, 파일 기반 라우팅, React 최신 기능 지원 |
| Language | TypeScript | 5.x | 타입 안전성, Backend와 언어 통일 |
| State Management | Zustand | latest | 경량, 간단한 API, 보일러플레이트 최소 |
| Styling | Tailwind CSS | 3.x | 유틸리티 기반, 반응형 용이, 커스텀 디자인 |
| UI Components | Headless UI | latest | Tailwind 호환, 접근성 내장, 모달/드롭다운 등 |
| Drag & Drop | @dnd-kit | latest | 모던, 경량, 접근성 지원, React 18 호환 |
| HTTP Client | Axios | latest | 인터셉터 (JWT 자동 첨부, 401 처리), 자동 JSON 변환 |
| Routing | Next.js App Router | 내장 | 파일 기반 라우팅, 레이아웃 시스템 |
| Date | dayjs | latest | 경량, moment.js 호환 API, 포맷/파싱 |
| Testing | Jest + React Testing Library | latest | Next.js 공식 지원, 컴포넌트 테스트 |

## 개발 도구

| 도구 | 용도 |
|------|------|
| ESLint | 코드 린팅 (next/core-web-vitals 설정) |
| Prettier | 코드 포맷팅 |
| @types/* | TypeScript 타입 정의 |
| tailwind-merge | Tailwind 클래스 충돌 해결 |
| clsx | 조건부 클래스 결합 |

## 아키텍처 결정

| 결정 | 내용 | 근거 |
|------|------|------|
| Next.js App Router | 파일 기반 라우팅 + 레이아웃 | 관리자/주방 경로 분리에 적합 |
| Client Components 위주 | 대부분 'use client' | SSE 실시간 연결, 인터랙티브 UI 중심 |
| Zustand Store 분리 | auth, orders, tables, menus, payments | 도메인별 독립 관리 |
| Axios 인스턴스 | baseURL + interceptor 설정 | JWT 자동 첨부, 401 자동 로그아웃 |
| Tailwind 반응형 | sm/md/lg 브레이크포인트 | 모바일/태블릿/데스크톱 대응 |

## Next.js 라우팅 구조

```
app/
├── layout.tsx              # Root layout
├── admin/
│   ├── layout.tsx          # Admin layout (Navbar, 인증 체크)
│   ├── login/page.tsx      # LoginPage
│   ├── register/page.tsx   # RegisterPage
│   ├── dashboard/page.tsx  # DashboardPage
│   ├── menus/page.tsx      # MenuManagementPage
│   ├── payments/page.tsx   # PaymentManagementPage
│   └── history/page.tsx    # OrderHistoryPage
└── kitchen/
    ├── layout.tsx          # Kitchen layout
    └── page.tsx            # KitchenDisplayPage
```
