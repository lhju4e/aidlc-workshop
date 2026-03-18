import pool from '../config/database';
import { Menu } from '../models/types';
import { PoolConnection, RowDataPacket } from 'mysql2/promise';

export const menuRepository = {
  async create(menu: Omit<Menu, 'createdAt'>, conn?: PoolConnection): Promise<void> {
    const db = conn || pool;
    await db.execute(
      'INSERT INTO menus (id, store_id, category_id, name, price, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [menu.id, menu.storeId, menu.categoryId, menu.name, menu.price, menu.description, menu.imageUrl, menu.sortOrder]
    );
  },

  async findByStore(storeId: string, categoryId?: string): Promise<Menu[]> {
    let sql = 'SELECT id, store_id AS storeId, category_id AS categoryId, name, price, description, image_url AS imageUrl, sort_order AS sortOrder, created_at AS createdAt FROM menus WHERE store_id = ?';
    const params: unknown[] = [storeId];
    if (categoryId) {
      sql += ' AND category_id = ?';
      params.push(categoryId);
    }
    sql += ' ORDER BY sort_order';
    const [rows] = await pool.execute<RowDataPacket[]>(sql, params);
    return rows as Menu[];
  },

  async findById(id: string): Promise<Menu | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, store_id AS storeId, category_id AS categoryId, name, price, description, image_url AS imageUrl, sort_order AS sortOrder FROM menus WHERE id = ?',
      [id]
    );
    return rows.length ? (rows[0] as Menu) : null;
  },

  async update(id: string, data: Partial<Pick<Menu, 'name' | 'price' | 'description' | 'categoryId' | 'imageUrl'>>): Promise<void> {
    const fields: string[] = [];
    const values: unknown[] = [];
    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.price !== undefined) { fields.push('price = ?'); values.push(data.price); }
    if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }
    if (data.categoryId !== undefined) { fields.push('category_id = ?'); values.push(data.categoryId); }
    if (data.imageUrl !== undefined) { fields.push('image_url = ?'); values.push(data.imageUrl); }
    if (fields.length === 0) return;
    values.push(id);
    await pool.execute(`UPDATE menus SET ${fields.join(', ')} WHERE id = ?`, values);
  },

  async delete(id: string): Promise<void> {
    await pool.execute('DELETE FROM menus WHERE id = ?', [id]);
  },

  async bulkUpdateSortOrder(menuIds: string[]): Promise<void> {
    for (let i = 0; i < menuIds.length; i++) {
      await pool.execute('UPDATE menus SET sort_order = ? WHERE id = ?', [i, menuIds[i]]);
    }
  },
};
