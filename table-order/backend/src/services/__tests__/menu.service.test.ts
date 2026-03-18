jest.mock('../../repositories/menu.repository');
jest.mock('../../repositories/category.repository');
jest.mock('../file.service');

import { menuService } from '../menu.service';
import { menuRepository } from '../../repositories/menu.repository';
import { categoryRepository } from '../../repositories/category.repository';

describe('MenuService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('createMenu throws on invalid category', async () => {
    (categoryRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(menuService.createMenu('s1', { name: 'Test', price: 1000, categoryId: 'bad' })).rejects.toThrow('Invalid category');
  });

  test('createMenu throws on negative price', async () => {
    (categoryRepository.findById as jest.Mock).mockResolvedValue({ id: 'c1', storeId: 's1' });
    await expect(menuService.createMenu('s1', { name: 'Test', price: -1, categoryId: 'c1' })).rejects.toThrow('Price must be >= 0');
  });

  test('deleteMenu throws if not found', async () => {
    (menuRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(menuService.deleteMenu('m1', 's1')).rejects.toThrow('Menu not found');
  });
});
