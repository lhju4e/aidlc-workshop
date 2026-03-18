import { useEffect, useRef } from 'react';
import { API_BASE_URL } from '../utils/constants';
import type { OrderSSEEvent } from '../types';

export function useSSE(
  params: { storeId?: string; tableId?: string } | null,
  onEvent: (event: OrderSSEEvent) => void,
) {
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    if (!params?.storeId) return;
    const query = new URLSearchParams();
    query.set('storeId', params.storeId);
    if (params.tableId) query.set('tableId', params.tableId);

    const es = new EventSource(`${API_BASE_URL}/sse/orders?${query}`);
    es.onmessage = (e) => {
      try {
        onEventRef.current(JSON.parse(e.data));
      } catch { /* ignore parse errors */ }
    };
    return () => es.close();
  }, [params?.storeId, params?.tableId]);
}
