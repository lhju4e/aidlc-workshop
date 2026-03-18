'use client';

import { useEffect, useRef } from 'react';

type SSEHandlers = Record<string, (data: unknown) => void>;

export function useSSE(url: string, handlers: SSEHandlers) {
  const retryRef = useRef(0);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    function connect() {
      const token = localStorage.getItem('token');
      const separator = url.includes('?') ? '&' : '?';
      const es = new EventSource(`${url}${separator}token=${token}`);
      esRef.current = es;

      Object.entries(handlers).forEach(([event, handler]) => {
        es.addEventListener(event, (e: MessageEvent) => {
          handler(JSON.parse(e.data));
          retryRef.current = 0;
        });
      });

      es.onerror = () => {
        es.close();
        if (retryRef.current < 5) {
          retryRef.current++;
          setTimeout(connect, 3000);
        }
      };
    }

    connect();
    return () => esRef.current?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
}
