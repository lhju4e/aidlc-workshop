export interface Store {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Admin {
  id: string;
  storeId: string;
  username: string;
  passwordHash: string;
  loginAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
}

export interface Table {
  id: string;
  storeId: string;
  tableNumber: number;
  passwordHash: string;
  createdAt: Date;
}

export interface Session {
  id: string;
  tableId: string;
  storeId: string;
  startedAt: Date;
  completedAt: Date | null;
  isActive: boolean;
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
  createdAt: Date;
}

export interface Order {
  id: string;
  storeId: string;
  tableId: string;
  sessionId: string;
  orderNumber: number;
  status: 'pending' | 'preparing' | 'completed';
  totalAmount: number;
  createdAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuId: string;
  menuName: string;
  quantity: number;
  unitPrice: number;
}

export interface Payment {
  id: string;
  orderId: string;
  status: 'unpaid' | 'paid' | 'failed';
  updatedAt: Date;
}

export interface CreateOrderInput {
  items: { menuId: string; quantity: number }[];
}

export interface JwtPayload {
  id: string;
  storeId: string;
  role: 'admin' | 'table';
  tableNumber?: number;
  tableId?: string;
}

export interface SSEClient {
  id: string;
  res: import('express').Response;
  storeId: string;
  tableId?: string;
}
