import pool from '../config/database';
import { Admin } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const adminRepository = {
  async create(admin: Omit<Admin, 'createdAt'>, conn?: PoolConnection): Promise<void> {
    const db = conn || pool;
    await db.execute(
      'INSERT INTO admins (id, store_id, username, password_hash, login_attempts) VALUES (?, ?, ?, ?, 0)',
      [admin.id, admin.storeId, admin.username, admin.passwordHash]
    );
  },

  async findByStoreAndUsername(storeId: string, username: string): Promise<Admin | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, username, password_hash AS passwordHash, login_attempts AS loginAttempts, locked_until AS lockedUntil, created_at AS createdAt FROM admins WHERE store_id = ? AND username = ?',
      [storeId, username]
    );
    return rows.length ? (rows[0] as Admin) : null;
  },

  async updateLoginAttempts(id: string, attempts: number, lockedUntil: Date | null): Promise<void> {
    await pool.execute('UPDATE admins SET login_attempts = ?, locked_until = ? WHERE id = ?', [attempts, lockedUntil, id]);
  },
};
