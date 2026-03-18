import { sseService } from '../sse.service';
import { Response } from 'express';

describe('SSEService', () => {
  const mockRes = () => {
    const res: Partial<Response> = {
      writeHead: jest.fn(),
      write: jest.fn().mockReturnValue(true),
      on: jest.fn(),
    };
    return res as Response;
  };

  beforeEach(() => {
    (sseService as any).clients = new Map();
  });

  test('addClient sends connected message and registers client', () => {
    const res = mockRes();
    sseService.addClient('c1', res, 'store1');
    expect(res.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({ 'Content-Type': 'text/event-stream' }));
    expect(res.write).toHaveBeenCalledWith(':connected\n\n');
  });

  test('broadcast sends event to matching clients only', () => {
    const res1 = mockRes();
    const res2 = mockRes();
    sseService.addClient('c1', res1, 'store1');
    sseService.addClient('c2', res2, 'store2');

    sseService.broadcast('newOrder', { id: '1' }, 'store1');

    expect(res1.write).toHaveBeenCalledWith(expect.stringContaining('event: newOrder'));
    expect(res2.write).not.toHaveBeenCalledWith(expect.stringContaining('event: newOrder'));
  });

  test('broadcast filters by tableId when provided', () => {
    const res1 = mockRes();
    const res2 = mockRes();
    sseService.addClient('c1', res1, 'store1', 'table1');
    sseService.addClient('c2', res2, 'store1', 'table2');

    sseService.broadcast('orderStatusChange', { id: '1' }, 'store1', 'table1');

    const calls1 = (res1.write as jest.Mock).mock.calls;
    const calls2 = (res2.write as jest.Mock).mock.calls;
    const hasEvent1 = calls1.some((c: string[]) => c[0].includes('orderStatusChange'));
    const hasEvent2 = calls2.some((c: string[]) => c[0].includes('orderStatusChange'));
    expect(hasEvent1).toBe(true);
    expect(hasEvent2).toBe(false);
  });
});
