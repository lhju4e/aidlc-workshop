# Logical Components - Customer Frontend (Unit 2)

## 프로젝트 구조

```
frontend/customer/
├── src/
│   ├── App.tsx                   # 라우팅 + 인증 분기
│   ├── main.tsx                  # Vite 엔트리포인트
│   ├── pages/
│   │   ├── SetupPage.tsx         # 초기 설정 (관리자 1회)
│   │   ├── MenuPage.tsx          # 메뉴 조회 (기본 화면)
│   │   ├── OrderHistoryPage.tsx  # 주문 내역
│   │   └── OrderSuccessPage.tsx  # 주문 완료 (5초 카운트다운)
│   ├── components/
│   │   ├── layout/
│   │   │   └── TabLayout.tsx     # 하단 탭 네비게이션
│   │   ├── menu/
│   │   │   ├── CategorySidebar.tsx
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MenuCard.tsx
│   │   │   └── MenuDetailModal.tsx
│   │   ├── cart/
│   │   │   ├── CartPanel.tsx     # 우측 사이드 패널
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── order/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderItemRow.tsx
│   │   │   └── OrderConfirmModal.tsx
│   │   └── common/
│   │       ├── Toast.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── LoadingSpinner.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useSSE.ts
│   │   └── useToast.ts
│   ├── services/
│   │   ├── api.ts                # Axios 인스턴스 + 인터셉터
│   │   ├── auth.service.ts
│   │   ├── menu.service.ts
│   │   └── order.service.ts
│   ├── store/
│   │   ├── authStore.ts          # Zustand auth 스토어
│   │   └── cartStore.ts          # Zustand cart 스토어 (localStorage 동기화)
│   ├── types/
│   │   └── index.ts              # 공통 타입 정의
│   └── utils/
│       ├── format.ts             # 가격 포맷, 날짜 포맷
│       └── constants.ts          # 상수 (API URL 등)
├── public/
│   └── placeholder.png           # 메뉴 이미지 플레이스홀더
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## 의존성 목록

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "zustand": "^4",
    "axios": "^1"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "latest",
    "typescript": "^5",
    "tailwindcss": "^3",
    "postcss": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "prettier": "latest",
    "@types/react": "^18",
    "@types/react-dom": "^18"
  }
}
```

## 라우팅 구조

```
/setup          → SetupPage (인증 전)
/               → MenuPage (기본, 인증 후)
/order-success  → OrderSuccessPage
/history        → OrderHistoryPage
```

## 환경 변수

```
VITE_API_BASE_URL=http://localhost:3000/api
```
