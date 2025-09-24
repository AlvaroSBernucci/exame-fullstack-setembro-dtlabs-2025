import { useEffect, useState } from 'react';
import type { NotificiationInterface } from '../pages/NotificationsPage/NotificationsPage.types';

export function useNotificationsWS(url: string) {
  const [notifications, setNotifications] = useState<NotificiationInterface[]>(
    []
  );

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.addEventListener('open', () => console.log('WS conectado'));

    ws.addEventListener('message', (event) => {
      const data: NotificiationInterface = JSON.parse(event.data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => ws.close();
  }, [url]);

  return notifications;
}
