import api from '@/services/api';
import { authService } from '@/services/authService';

jest.mock('@/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('authService', () => {
  it('login should call POST /auth/admin/login', async () => {
    const mockResponse = { data: { store: { id: '1', name: 'Test', createdAt: '' }, token: 'tok' } };
    mockedApi.post.mockResolvedValueOnce(mockResponse);

    const result = await authService.login({ storeId: '1', username: 'admin', password: 'password' });
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/admin/login', { storeId: '1', username: 'admin', password: 'password' });
    expect(result.data.token).toBe('tok');
  });

  it('register should call POST /auth/register', async () => {
    const mockResponse = { data: { store: { id: '1', name: 'New', createdAt: '' }, token: 'tok' } };
    mockedApi.post.mockResolvedValueOnce(mockResponse);

    const result = await authService.register({ storeName: 'New', username: 'admin', password: 'password' });
    expect(mockedApi.post).toHaveBeenCalledWith('/auth/register', { storeName: 'New', username: 'admin', password: 'password' });
    expect(result.data.store.name).toBe('New');
  });
});
