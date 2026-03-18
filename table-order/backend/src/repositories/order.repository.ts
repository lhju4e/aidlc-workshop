import pool from '../config/database';
import { Order, OrderItem } from '../models/types';
import { PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const orderRepository = {
  async getNextOrderNumber(storeId: string, conn: PoolConnection): Promise<number> {
    const [rows] = await conn.execute<RowDataPacket[]>(
      'SELECT COALESCE(MAX(order_number), 0) + 1 AS next FROM orders WHERE store_id = ?',
      [storeId]
    );
    return (rows[0] as { next: number }).next;
  },

  async create(order: Omit<Order, 'createdAt' | 'items'>, conn: PoolConnection): Promise<void> {
    await conn.execute(
      'INSERT INTO orders (id, store_id, table_id, session_id, order_number, status, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [order.id, order.storeId, order.tableId, order.sessionId, order.orderNumber, order.status, order.totalAmount]
    );
  },

  async createItems(items: OrderItem[], conn: PoolConnection): Promise<void> {
    for (const item of items) {
      await conn.execute(
        'INSERT INTO order_items (id, order_id, menu_id, menu_name, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?)',
        [item.id, item.orderId, item.menuId, item.menuName, item.quantity, item.unitPrice]
      );
    }
  },

  async findBySession(sessionId: string): Promise<Order[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, table_id AS tableId, session_id AS sessionId, order_number AS orderNumber, status, total_amount AS totalAmount, created_at AS createdAt FROM orders WHERE session_id = ? ORDER BY created_at',
      [sessionId]
    );
    return rows as Order[];
  },

  async findActiveByStore(storeId: string): Promise<Order[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT o.id, o.store_id AS storeId, o.table_id AS tableId, o.session_id AS sessionId, o.order_number AS orderNumber, o.status, o.total_amount AS totalAmount, o.created_at AS createdAt FROM orders o JOIN sessions s ON o.session_id = s.id WHERE o.store_id = ? AND s.is_active = TRUE ORDER BY o.created_at',
      [storeId]
    );
    return rows as Order[];
  },

  async findPendingAndPreparingByStore(storeId: string): Promise<Order[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT o.id, o.store_id AS storeId, o.table_id AS tableId, o.session_id AS sessionId, o.order_number AS orderNumber, o.status, o.total_amount AS totalAmount, o.created_at AS createdAt FROM orders o JOIN sessions s ON o.session_id = s.id WHERE o.store_id = ? AND s.is_active = TRUE AND o.status IN ('pending','preparing') ORDER BY o.created_at",
      [storeId]
    );
    return rows as Order[];
  },

  async findItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, order_id AS orderId, menu_id AS menuId, menu_name AS menuName, quantity, unit_price AS unitPrice FROM order_items WHERE order_id = ?',
      [orderId]
    );
    return rows as OrderItem[];
  },

  async findById(id: string): Promise<Order | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, table_id AS tableId, session_id AS sessionId, order_number AS orderNumber, status, total_amount AS totalAmount, created_at AS createdAt FROM orders WHERE id = ?',
      [id]
    );
    return rows.length ? (rows[0] as Order) : null;
  },

  async updateStatus(id: string, status: string): Promise<void> {
    await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  },

  async delete(id: string): Promise<void> {
    await pool.execute('DELETE FROM orders WHERE id = ?', [id]);
  },

  async findHistoryByTable(tableId: string, startDate?: string, endDate?: string): Promise<Order[]> {
    let sql = 'SELECT o.id, o.store_id AS storeId, o.table_id AS tableId, o.session_id AS sessionId, o.order_number AS orderNumber, o.status, o.total_amount AS totalAmount, o.created_at AS createdAt FROM orders o JOIN sessions s ON o.session_id = s.id WHERE o.table_id = ? AND s.is_active = FALSE';
    const params: unknown[] = [tableId];
    if (startDate) { sql += ' AND o.created_at >= ?'; params.push(startDate); }
    if (endDate) { sql += ' AND o.created_at <= ?'; params.push(endDate); }
    sql += ' ORDER BY o.created_at DESC';
    const [rows] = await pool.execute<RowDataPacket[]>(sql, params);
    return rows as Order[];
  },
};
