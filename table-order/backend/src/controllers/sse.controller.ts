import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sseService } from '../services/sse.service';

export const sseController = {
  connect(req: Request, res: Response) {
    const { storeId, tableId } = req.user!;
    const clientId = uuidv4();
    sseService.addClient(clientId, res, storeId, tableId);
  },
};
