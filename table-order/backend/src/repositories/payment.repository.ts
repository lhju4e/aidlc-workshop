import pool from '../config/database';
import { Payment } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const paymentRepository = {
  async create(payment: Pick<Payment, 'id' | 'orderId' | 'status'>, conn: PoolConnection): Promise<void> {
    await conn.execute('INSERT INTO payments (id, order_id, status) VALUES (?, ?, ?)', [payment.id, payment.orderId, payment.status]);
  },

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, order_id AS orderId, status, updated_at AS updatedAt FROM payments WHERE order_id = ?',
      [orderId]
    );
    return rows.length ? (rows[0] as Payment) : null;
  },

  async findBySession(sessionId: string): Promise<Payment[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT p.id, p.order_id AS orderId, p.status, p.updated_at AS updatedAt FROM payments p JOIN orders o ON p.order_id = o.id WHERE o.session_id = ?',
      [sessionId]
    );
    return rows as Payment[];
  },

  async findByStore(storeId: string, status?: string): Promise<(Payment & { tableId: string })[]> {
    let sql = 'SELECT p.id, p.order_id AS orderId, p.status, p.updated_at AS updatedAt, o.table_id AS tableId FROM payments p JOIN orders o ON p.order_id = o.id JOIN sessions s ON o.session_id = s.id WHERE o.store_id = ? AND s.is_active = TRUE';
    const params: unknown[] = [storeId];
    if (status) { sql += ' AND p.status = ?'; params.push(status); }
    const [rows] = await pool.execute<RowDataPacket[]>(sql, params);
    return rows as (Payment & { tableId: string })[];
  },

  async updateStatus(orderId: string, status: string): Promise<void> {
    await pool.execute('UPDATE payments SET status = ? WHERE order_id = ?', [status, orderId]);
  },

  async countUnpaidBySession(sessionId: string): Promise<{ count: number; total: number }> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT COUNT(*) AS count, COALESCE(SUM(o.total_amount), 0) AS total FROM payments p JOIN orders o ON p.order_id = o.id WHERE o.session_id = ? AND p.status = 'unpaid'",
      [sessionId]
    );
    const row = rows[0] as { count: number; total: number };
    return { count: row.count, total: row.total };
  },
};
