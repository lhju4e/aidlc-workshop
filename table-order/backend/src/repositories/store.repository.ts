import pool from '../config/database';
import { Store } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const storeRepository = {
  async create(id: string, name: string, conn?: PoolConnection): Promise<Store> {
    const db = conn || pool;
    await db.execute('INSERT INTO stores (id, name) VALUES (?, ?)', [id, name]);
    return { id, name, createdAt: new Date() };
  },

  async findById(id: string): Promise<Store | null> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM stores WHERE id = ?', [id]);
    return rows.length ? (rows[0] as Store) : null;
  },
};
