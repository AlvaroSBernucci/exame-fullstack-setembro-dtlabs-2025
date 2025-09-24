import { Grid, Typography, Button, Dialog } from '@mui/material';
import { useState } from 'react';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import useAxios from '../../hooks/useAxios';
import NewRuleForm from '../../components/NewRuleForm/NewRuleForm';
import type { NotificationConfigInterface } from './NotificationsPage.types';
import { useNotificationsWS } from '../../hooks/useNotificationsWS';
import type { DeviceListInterface } from '../HomePage/HomePage.types';

function NotificationsPage() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { data: devices } = useAxios<DeviceListInterface[]>(`api/v1/devices/`);

  const { data: notificationConfigs, fetchData } = useAxios<
    NotificationConfigInterface[]
  >(`api/v1/notification-config`);

  const notifications = useNotificationsWS(
    'ws://localhost:8000/ws/notifications/'
  );

  return (
    <Grid my={5} mx={15}>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid>
          <Typography variant="h1" fontSize={30} mb={2}>
            Notificações
          </Typography>
          <Typography fontSize={16} sx={{ color: '#65758b' }}>
            Configure alertas baseados em parâmetros de heartbeat dos
            dispositivos
          </Typography>
        </Grid>
        <Button onClick={() => setOpenConfirm(true)} variant="contained">
          Nova Regra
        </Button>
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <NewRuleForm
            setOpenConfirm={setOpenConfirm}
            devices={devices || []}
            fetchData={fetchData}
          />
        </Dialog>
      </Grid>
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
              .map((notification, index) => (
                <NotificationCard
                  key={index}
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
