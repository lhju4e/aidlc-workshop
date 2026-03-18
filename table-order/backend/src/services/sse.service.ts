import { Response } from 'express';
import { SSEClient } from '../models/types';

class SSEService {
  private clients = new Map<string, SSEClient>();

  addClient(id: string, res: Response, storeId: string, tableId?: string): void {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(':connected\n\n');
    this.clients.set(id, { id, res, storeId, tableId });

    const heartbeat = setInterval(() => res.write(':keepalive\n\n'), 30000);
    res.on('close', () => {
      clearInterval(heartbeat);
      this.clients.delete(id);
    });
  }

  broadcast(event: string, data: unknown, storeId: string, tableId?: string): void {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach((client) => {
      if (client.storeId !== storeId) return;
      if (tableId && client.tableId && client.tableId !== tableId) return;
      client.res.write(payload);
    });
  }
}

export const sseService = new SSEService();
