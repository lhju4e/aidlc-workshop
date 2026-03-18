import api from '@/services/api';
import { orderService } from '@/services/orderService';

jest.mock('@/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('orderService', () => {
  it('getOrders should call GET /orders with params', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] });
    await orderService.getOrders({ storeId: 's1' });
    expect(mockedApi.get).toHaveBeenCalledWith('/orders', { params: { storeId: 's1' } });
  });

  it('updateStatus should call PATCH', async () => {
    mockedApi.patch.mockResolvedValueOnce({ data: {} });
    await orderService.updateStatus('o1', 'preparing');
    expect(mockedApi.patch).toHaveBeenCalledWith('/orders/o1/status', { status: 'preparing' });
  });

  it('deleteOrder should call DELETE', async () => {
    mockedApi.delete.mockResolvedValueOnce({ data: {} });
    await orderService.deleteOrder('o1');
    expect(mockedApi.delete).toHaveBeenCalledWith('/orders/o1');
  });
});
