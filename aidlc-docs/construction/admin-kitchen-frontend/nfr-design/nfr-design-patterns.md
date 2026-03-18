# NFR Design Patterns - Unit 3: Admin+Kitchen Frontend

## Pattern 1: Next.js App Router + Client Components

```
app/
├── layout.tsx           # Root layout (html, body, Tailwind)
├── admin/
│   ├── layout.tsx       # 'use client' - AdminLayout (Navbar, AuthGuard)
│   └── [pages]/page.tsx # 'use client' - 각 페이지
└── kitchen/
    ├── layout.tsx       # 'use client' - KitchenLayout (AuthGuard)
    └── page.tsx         # 'use client' - KitchenDisplayPage
```

- Root layout만 Server Component, 나머지 모두 `'use client'`
- SSE 실시간 연결, 인터랙티브 UI 중심이므로 Client Components 위주
- Next.js 파일 기반 라우팅으로 `/admin/*`, `/kitchen/*` 자연 분리

## Pattern 2: Zustand Store (도메인별 분리)

```typescript
// stores/authStore.ts
interface AuthStore {
  token: string | null;
  store: Store | null;
  login: (credentials) => Promise<void>;
  logout: () => void;
}

// stores/orderStore.ts
interface OrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  updateOrder: (orderId: string, data: Partial<Order>) => void;
  removeOrder: (orderId: string) => void;
}

// stores/notificationStore.ts
interface NotificationStore {
  enabled: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
}
```

- 각 store는 독립적, 필요한 컴포넌트에서만 구독
- persist 미들웨어: authStore(token), notificationStore(설정) → localStorage

## Pattern 3: Axios 인스턴스 + Interceptor

```typescript
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// Request interceptor: JWT 자동 첨부
api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: 401 자동 로그아웃
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) authStore.getState().logout();
    return Promise.reject(err);
  }
);
```

## Pattern 4: SSE Hook (재사용 가능)

```typescript
function useSSE(url: string, handlers: Record<string, (data) => void>) {
  useEffect(() => {
    const token = authStore.getState().token;
    const eventSource = new EventSource(`${url}?token=${token}`);
    let retryCount = 0;

    Object.entries(handlers).forEach(([event, handler]) => {
      eventSource.addEventListener(event, (e) => {
        handler(JSON.parse(e.data));
        retryCount = 0;
      });
    });

    eventSource.onerror = () => {
      eventSource.close();
      if (retryCount < 5) {
        setTimeout(() => reconnect(), 3000);
        retryCount++;
      }
    };

    return () => eventSource.close();
  }, [url]);
}
```

- 자동 재연결 (3초 간격, 최대 5회)
- 이벤트 타입별 핸들러 등록
- 컴포넌트 언마운트 시 자동 정리

## Pattern 5: AuthGuard Layout

```typescript
// admin/layout.tsx
'use client';
export default function AdminLayout({ children }) {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace('/admin/login');
  }, [token]);

  if (!token) return null;
  return <>{<Navbar />}{children}</>;
}
```

- Layout 레벨에서 인증 체크 → 하위 모든 페이지 보호
- 토큰 없으면 로그인 페이지 리다이렉트

## Pattern 6: 알림음 시스템

```typescript
class NotificationSound {
  private audioContext: AudioContext | null = null;

  init() { // 첫 사용자 인터랙션 시 호출
    this.audioContext = new AudioContext();
  }

  play(volume: number) {
    if (!this.audioContext) return;
    // Web Audio API로 알림음 재생
  }
}
```

- 브라우저 autoplay 정책 대응: 첫 클릭/터치 시 AudioContext 초기화
- Zustand notificationStore와 연동 (enabled, volume)

## Pattern 7: Optimistic UI + Rollback

```
드래그앤드롭 순서 변경:
  1. UI 즉시 업데이트 (optimistic)
  2. API 호출 (PUT /api/menus/reorder)
  3. 실패 시 이전 상태로 롤백
```

- 메뉴 순서 변경, 주문 상태 변경에 적용
- 사용자 체감 속도 향상

## Pattern 8: Responsive Grid (Tailwind)

```typescript
// 테이블 카드 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {tables.map(t => <TableCard key={t.table.id} data={t} />)}
</div>
```

- Tailwind 반응형 클래스로 브레이크포인트 대응
- 모바일 1열 → 태블릿 2열 → 데스크톱 3~4열
