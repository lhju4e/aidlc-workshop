# Customer Frontend - Domain Entities

## 1. API 응답 타입

### Menu
```typescript
interface Menu {
  id: string;
  storeId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string | null;
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
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

type OrderStatus = 'pending' | 'preparing' | 'completed';
```

### OrderItem
```typescript
interface OrderItem {
  menuId: string;
  menuName: string;
  quantity: number;
  unitPrice: number;
}
```

### Table
```typescript
interface Table {
  id: string;
  storeId: string;
  tableNumber: number;
  sessionId: string | null;
}
```

### AuthToken
```typescript
interface AuthResponse {
  token: string;
  table: Table;
}
```

## 2. 로컬 상태 타입

### CartItem
```typescript
interface CartItem {
  menuId: string;
  menuName: string;
  unitPrice: number;
  imageUrl: string | null;
  quantity: number;
}
```

### Cart
```typescript
interface Cart {
  items: CartItem[];
  totalAmount: number;
}
```

### SetupCredentials
```typescript
interface SetupCredentials {
  storeId: string;
  tableNumber: number;
  password: string;
}
```

## 3. SSE 이벤트 타입

### OrderSSEEvent
```typescript
interface OrderSSEEvent {
  type: 'order_status_changed' | 'order_created' | 'order_deleted';
  data: {
    orderId: string;
    status?: OrderStatus;
    tableId?: string;
  };
}
```
