import useAxios from '../../hooks/useAxios';
import NewDeviceForm from '../../components/NewDeviceForm/NewDeviceForm';
import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { Grid, Typography, Button, Dialog } from '@mui/material';
import type { DeviceInterface } from './DevicesRegisterPage.types';

function DevicesRegisterPage() {
  const { data: devices, fetchData } =
    useAxios<DeviceInterface[]>('api/v1/devices/');

  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    console.log(devices);
  }, [devices]);
  return (
    <Grid>
      <Typography variant="h1" fontSize={24}>
        Gerenciamento de Dispositivos
      </Typography>
      <Button onClick={() => setOpenConfirm(true)}>
        Adicionar Dispositivo
      </Button>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <NewDeviceForm onClose={setOpenConfirm} />
      </Dialog>

      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center', width: '100%' }}
      >
        {devices &&
          devices.map((device) => (
            <Card
              key={device?.id}
              name={device.name}
              location={device.location}
              sn={device.sn}
              description={device.description}
              telemetry={device.last_telemetry}
              updated_at={device.updated_at}
              id={device.uuid}
              onUpdate={fetchData}
            />
          ))}
      </Grid>
    </Grid>
  );
}

export default DevicesRegisterPage;
