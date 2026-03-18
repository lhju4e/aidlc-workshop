import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { storeRepository } from '../repositories/store.repository';
import { adminRepository } from '../repositories/admin.repository';
import { tableRepository } from '../repositories/table.repository';
import { AppError } from '../utils/AppError';
import { withTransaction } from '../utils/transaction';
import { JwtPayload } from '../models/types';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '16h' });
}

export const authService = {
  async registerStore(storeName: string, username: string, password: string) {
    if (password.length < 8) throw new AppError('Password must be at least 8 characters', 400);

    return withTransaction(async (conn) => {
      const storeId = uuidv4();
      const store = await storeRepository.create(storeId, storeName, conn);
      const adminId = uuidv4();
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      await adminRepository.create({ id: adminId, storeId, username, passwordHash, loginAttempts: 0, lockedUntil: null }, conn);
      const token = generateToken({ id: adminId, storeId, role: 'admin' });
      return { store, token };
    });
  },

  async loginAdmin(storeId: string, username: string, password: string) {
    const admin = await adminRepository.findByStoreAndUsername(storeId, username);
    if (!admin) throw new AppError('Invalid credentials', 401);

    if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
      throw new AppError('Account locked. Try again later', 403);
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      const attempts = admin.loginAttempts + 1;
      const lockedUntil = attempts >= MAX_LOGIN_ATTEMPTS ? new Date(Date.now() + LOCK_DURATION_MS) : null;
      await adminRepository.updateLoginAttempts(admin.id, attempts, lockedUntil);
      throw new AppError('Invalid credentials', 401);
    }

    await adminRepository.updateLoginAttempts(admin.id, 0, null);
    const token = generateToken({ id: admin.id, storeId, role: 'admin' });
    return { token, storeId };
  },

  async loginTable(storeId: string, tableNumber: number, password: string) {
    const table = await tableRepository.findByStoreAndNumber(storeId, tableNumber);
    if (!table) throw new AppError('Invalid credentials', 401);

    const valid = await bcrypt.compare(password, table.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);

    const token = generateToken({ id: table.id, storeId, role: 'table', tableNumber, tableId: table.id });
    return { token, table: { id: table.id, tableNumber: table.tableNumber } };
  },
};
