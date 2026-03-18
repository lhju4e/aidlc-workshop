import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, authorize } from '../auth';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  const mockReq = (headers: Record<string, string> = {}) => ({ headers, user: undefined } as unknown as Request);
  const mockRes = () => ({} as Response);
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => jest.clearAllMocks());

  test('authenticate throws without Authorization header', () => {
    expect(() => authenticate(mockReq(), mockRes(), mockNext)).toThrow('Authentication required');
  });

  test('authenticate throws with invalid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error(); });
    expect(() => authenticate(mockReq({ authorization: 'Bearer bad' }), mockRes(), mockNext)).toThrow('Invalid token');
  });

  test('authenticate sets req.user on valid token', () => {
    const payload = { id: 'a1', storeId: 's1', role: 'admin' };
    (jwt.verify as jest.Mock).mockReturnValue(payload);
    const req = mockReq({ authorization: 'Bearer valid' });
    authenticate(req, mockRes(), mockNext);
    expect(req.user).toEqual(payload);
    expect(mockNext).toHaveBeenCalled();
  });

  test('authorize rejects unauthorized role', () => {
    const req = mockReq();
    req.user = { id: 'a1', storeId: 's1', role: 'table' } as any;
    expect(() => authorize('admin')(req, mockRes(), mockNext)).toThrow('Forbidden');
  });

  test('authorize allows authorized role', () => {
    const req = mockReq();
    req.user = { id: 'a1', storeId: 's1', role: 'admin' } as any;
    authorize('admin')(req, mockRes(), mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
