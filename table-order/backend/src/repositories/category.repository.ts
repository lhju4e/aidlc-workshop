import pool from '../config/database';
import { Category } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const categoryRepository = {
  async create(category: Category, conn?: PoolConnection): Promise<void> {
    const db = conn || pool;
    await db.execute('INSERT INTO categories (id, store_id, name, sort_order) VALUES (?, ?, ?, ?)', [category.id, category.storeId, category.name, category.sortOrder]);
  },

  async findByStore(storeId: string): Promise<Category[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, name, sort_order AS sortOrder FROM categories WHERE store_id = ? ORDER BY sort_order',
      [storeId]
    );
    return rows as Category[];
  },

  async findById(id: string): Promise<Category | null> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT id, store_id AS storeId, name, sort_order AS sortOrder FROM categories WHERE id = ?', [id]);
    return rows.length ? (rows[0] as Category) : null;
  },
};
