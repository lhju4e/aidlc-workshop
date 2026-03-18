jest.mock('../../repositories/store.repository');
jest.mock('../../repositories/admin.repository');
jest.mock('../../repositories/table.repository');
jest.mock('../../utils/transaction', () => ({ withTransaction: jest.fn((fn: any) => fn({} as any)) }));
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

import { authService } from '../auth.service';
import { adminRepository } from '../../repositories/admin.repository';
import bcrypt from 'bcrypt';

describe('AuthService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('loginAdmin throws on invalid credentials', async () => {
    (adminRepository.findByStoreAndUsername as jest.Mock).mockResolvedValue(null);
    await expect(authService.loginAdmin('store1', 'user', 'pass')).rejects.toThrow('Invalid credentials');
  });

  test('loginAdmin throws when account is locked', async () => {
    (adminRepository.findByStoreAndUsername as jest.Mock).mockResolvedValue({
      id: 'a1', storeId: 's1', username: 'user', passwordHash: 'hash',
      loginAttempts: 5, lockedUntil: new Date(Date.now() + 60000),
    });
    await expect(authService.loginAdmin('s1', 'user', 'wrong')).rejects.toThrow('Account locked');
  });

  test('loginAdmin increments attempts on wrong password', async () => {
    (adminRepository.findByStoreAndUsername as jest.Mock).mockResolvedValue({
      id: 'a1', storeId: 's1', username: 'user', passwordHash: 'hash',
      loginAttempts: 3, lockedUntil: null,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(authService.loginAdmin('s1', 'user', 'wrong')).rejects.toThrow('Invalid credentials');
    expect(adminRepository.updateLoginAttempts).toHaveBeenCalledWith('a1', 4, null);
  });

  test('loginAdmin locks account after 5 failed attempts', async () => {
    (adminRepository.findByStoreAndUsername as jest.Mock).mockResolvedValue({
      id: 'a1', storeId: 's1', username: 'user', passwordHash: 'hash',
      loginAttempts: 4, lockedUntil: null,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(authService.loginAdmin('s1', 'user', 'wrong')).rejects.toThrow('Invalid credentials');
    expect(adminRepository.updateLoginAttempts).toHaveBeenCalledWith('a1', 5, expect.any(Date));
  });

  test('registerStore throws if password too short', async () => {
    await expect(authService.registerStore('Store', 'admin', 'short')).rejects.toThrow('Password must be at least 8 characters');
  });
});
