# Domain Entities (Frontend Types) - Unit 3: Admin+Kitchen Frontend

## API Response Types (Backend에서 수신)

### Store
```typescript
interface Store {
  id: string;
  name: string;
  createdAt: string;
}
```

### Table
```typescript
interface Table {
  id: string;
  storeId: string;
  tableNumber: number;
  createdAt: string;
}
```

### Menu
```typescript
interface Menu {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  createdAt: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  storeId: string;
  name: string;
  sortOrder: number;
}
```

### Order
```typescript
interface Order {
  id: string;
  storeId: string;
  tableId: string;
  sessionId: string;
  orderNumber: number;
  status: 'pending' | 'preparing' | 'completed';
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}
```

### OrderItem
```typescript
interface OrderItem {
  id: string;
  orderId: string;
  menuId: string;
  menuName: string;
  quantity: number;
  unitPrice: number;
}
```

### Payment
```typescript
interface Payment {
  id: string;
  orderId: string;
  status: 'unpaid' | 'paid' | 'failed';
  updatedAt: string;
}
```

### Session
```typescript
interface Session {
  id: string;
  tableId: string;
  storeId: string;
  startedAt: string;
  completedAt: string | null;
  isActive: boolean;
}
```

---

## Frontend-Only Types (UI 상태)

### AuthState
```typescript
interface AuthState {
  token: string | null;
  store: Store | null;
  isAuthenticated: boolean;
}
```

### TableCardData (대시보드용)
```typescript
interface TableCardData {
  table: Table;
  orders: Order[];
  totalAmount: number;
  pendingCount: number;
  hasActiveSession: boolean;
}
```

### NotificationSettings
```typescript
interface NotificationSettings {
  enabled: boolean;
  volume: number; // 0~100
}
```

### OrderHistoryFilter
```typescript
interface OrderHistoryFilter {
  startDate: string;
  endDate: string;
  tableId: string | null;
  status: ('pending' | 'preparing' | 'completed')[];
}
```

### MenuFormData
```typescript
interface MenuFormData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  image: File | null;
}
```

### SSEEvent
```typescript
interface SSEEvent {
  type: 'newOrder' | 'orderStatusChange' | 'orderDeleted' | 'paymentStatusChange' | 'tableCompleted';
  data: unknown;
}
```
