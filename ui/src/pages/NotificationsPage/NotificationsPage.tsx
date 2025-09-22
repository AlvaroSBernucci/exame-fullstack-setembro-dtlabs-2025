import { Grid, Typography } from '@mui/material';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import useAxios from '../../hooks/useAxios';
import type {
  NotificationConfigInterface,
  NotificiationInterface,
} from './NotificationsPage.types';

function NotificationsPage() {
  const { data: notificationConfigs } = useAxios<NotificationConfigInterface[]>(
    `api/v1/notification-config`
  );

  const { data: notifications } =
    useAxios<NotificiationInterface[]>(`api/v1/notifications`);

  return (
    <Grid my={5} mx={15}>
      <Typography variant="h1" fontSize={30} mb={2}>
        Notificações
      </Typography>
      <Typography fontSize={16} sx={{ color: '#65758b' }}>
        Configure alertas baseados em parâmetros de heartbeat dos dispositivos
      </Typography>
      <Grid container mt={3} spacing={3}>
        <Grid size="grow">
          <Typography variant="h2" fontSize={18} fontWeight={700} mb={2}>
            Regras Configuradas
          </Typography>
          {notificationConfigs &&
            notificationConfigs.map((config) => (
              <NotificationCard
                key={config.id}
                name={config.name}
                user={config.user}
                parameter={config.parameter}
                comparison={config.comparison}
                threshold={config.threshold}
                message={config.message}
                devices_name={config.devices_name}
                isNotification={false}
              />
            ))}
        </Grid>
        <Grid size="grow">
          <Typography variant="h2" fontSize={18} fontWeight={700} mb={2}>
            Notificações Recentes
          </Typography>
          {notifications &&
            [...notifications]
              .sort((a, b) => b.id - a.id)
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  name={notification.config_name}
                  parameter={notification.parameter}
                  comparison={notification.comparison}
                  threshold={notification.threshold}
                  user={notification.user}
                  message={notification.alert_text}
                  device_name={notification.device_name}
                  isNotification={true}
                />
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NotificationsPage;
