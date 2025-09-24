import useAxios from '../../hooks/useAxios';
import BasicCard from '../../components/Card/Card';
import { Grid, Typography } from '@mui/material';
import type { DeviceListInterface } from './HomePage.types';

function HomePage() {
  const { data: devices } = useAxios<DeviceListInterface[]>(`api/v1/devices/`);

  return (
    <Grid mx={20} my={5}>
      <Typography component="h1" fontWeight={700} fontSize={30}>
        Dispositivos
      </Typography>
      <Grid container spacing={2} m={2}>
        {devices &&
          devices.map((device) => (
            <Grid size={4}>
              <BasicCard
                key={device?.id}
                name={device.name}
                location={device.location}
                sn={device.sn}
                description={device.description}
                telemetry={device.last_telemetry}
                updated_at={device.updated_at}
                id={device.uuid}
                home={true}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default HomePage;
