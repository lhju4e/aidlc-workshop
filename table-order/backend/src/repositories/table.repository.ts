import pool from '../config/database';
import { Table } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const tableRepository = {
  async create(table: Omit<Table, 'createdAt'>, conn?: PoolConnection): Promise<void> {
    const db = conn || pool;
    await db.execute(
      'INSERT INTO tables_ (id, store_id, table_number, password_hash) VALUES (?, ?, ?, ?)',
      [table.id, table.storeId, table.tableNumber, table.passwordHash]
    );
  },

  async findByStoreAndNumber(storeId: string, tableNumber: number): Promise<Table | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, table_number AS tableNumber, password_hash AS passwordHash, created_at AS createdAt FROM tables_ WHERE store_id = ? AND table_number = ?',
      [storeId, tableNumber]
    );
    return rows.length ? (rows[0] as Table) : null;
  },

  async findByStore(storeId: string): Promise<Table[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, table_number AS tableNumber, created_at AS createdAt FROM tables_ WHERE store_id = ? ORDER BY table_number',
      [storeId]
    );
    return rows as Table[];
  },

  async findById(id: string): Promise<Table | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, table_number AS tableNumber, password_hash AS passwordHash, created_at AS createdAt FROM tables_ WHERE id = ?',
      [id]
    );
    return rows.length ? (rows[0] as Table) : null;
  },
};
