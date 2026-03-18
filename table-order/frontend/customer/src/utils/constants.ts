export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
export const STORAGE_KEYS = {
  CREDENTIALS: 'table_order_credentials',
  TOKEN: 'table_order_token',
  CART: 'table_order_cart',
  TABLE: 'table_order_table',
  SESSION_ID: 'table_order_session_id',
} as const;
