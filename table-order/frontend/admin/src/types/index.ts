export interface Store {
  id: string;
  name: string;
  createdAt: string;
}

export interface Table {
  id: string;
  storeId: string;
  tableNumber: number;
  createdAt: string;
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
  sortOrder: number;
}

export interface Menu {
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

export interface OrderItem {
  id: string;
  orderId: string;
  menuId: string;
  menuName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
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

export interface Payment {
  id: string;
  orderId: string;
  status: 'unpaid' | 'paid' | 'failed';
  updatedAt: string;
}

export interface Session {
  id: string;
  tableId: string;
  storeId: string;
  startedAt: string;
  completedAt: string | null;
  isActive: boolean;
}

export interface TableCardData {
  table: Table;
  orders: Order[];
  totalAmount: number;
  pendingCount: number;
  hasActiveSession: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  volume: number;
}

export interface OrderHistoryFilter {
  startDate: string;
  endDate: string;
  tableId: string | null;
  status: ('pending' | 'preparing' | 'completed')[];
}

export interface MenuFormData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  image: File | null;
}
