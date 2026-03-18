import pool from '../config/database';
import { Session } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const sessionRepository = {
  async create(session: Pick<Session, 'id' | 'tableId' | 'storeId'>, conn?: PoolConnection): Promise<void> {
    const db = conn || pool;
    await db.execute('INSERT INTO sessions (id, table_id, store_id) VALUES (?, ?, ?)', [session.id, session.tableId, session.storeId]);
  },

  async findActiveByTable(tableId: string): Promise<Session | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, table_id AS tableId, store_id AS storeId, started_at AS startedAt, completed_at AS completedAt, is_active AS isActive FROM sessions WHERE table_id = ? AND is_active = TRUE',
      [tableId]
    );
    return rows.length ? (rows[0] as Session) : null;
  },

  async complete(id: string, conn?: PoolConnection): Promise<void> {
    const db = conn || pool;
    await db.execute('UPDATE sessions SET is_active = FALSE, completed_at = NOW() WHERE id = ?', [id]);
  },
};
