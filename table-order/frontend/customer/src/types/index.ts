// API 응답 타입
export interface Menu {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
  sortOrder: number;
}

export interface Order {
  id: string;
  storeId: string;
  tableId: string;
  sessionId: string;
  orderNumber: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  items?: OrderItem[];
}

export type OrderStatus = 'pending' | 'preparing' | 'completed';

export interface OrderItem {
  id: string;
  orderId: string;
  menuId: string;
  menuName: string;
  quantity: number;
  unitPrice: number;
}

export interface Table {
  id: string;
  storeId: string;
  tableNumber: number;
}

export interface AuthResponse {
  token: string;
  table: Table;
  session?: { id: string };
}

// 로컬 상태 타입
export interface CartItem {
  menuId: string;
  menuName: string;
  unitPrice: number;
  imageUrl: string | null;
  quantity: number;
}

export interface SetupCredentials {
  storeId: string;
  tableNumber: number;
  password: string;
}

// SSE 이벤트 타입
export interface OrderSSEEvent {
  type: 'order_status_changed' | 'order_created' | 'order_deleted';
  orderId: string;
  status?: OrderStatus;
  order?: Order;
}
