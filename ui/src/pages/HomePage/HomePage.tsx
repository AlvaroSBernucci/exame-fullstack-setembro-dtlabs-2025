import useAxios from '../../hooks/useAxios';
import { Grid, Typography, Card } from '@mui/material';
import type { DeviceListInterface } from './HomePage.types';

function HomePage() {
  const { data: devices } = useAxios<DeviceListInterface[]>('api/v1/devices/');

  return (
    <Grid>
      <Typography component="h1">HOME PAGE</Typography>
      <Grid container spacing={2} m={2}>
        {devices &&
          devices.map((device) => (
            <Grid size={6}>
              <Card sx={{ backgroundColor: 'primary' }}>
                <Typography gutterBottom sx={{ color: 'black', fontSize: 16 }}>
                  Dispositivo: {device.name}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                  Uso do CPU:{' '}
                  {device.last_telemetry?.cpu_usage
                    ? `${device.last_telemetry.cpu_usage} %`
                    : ''}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                  Uso da memória:{' '}
                  {device.last_telemetry?.ram_usage
                    ? `${device.last_telemetry.ram_usage} %`
                    : ''}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                  Temperatura:{' '}
                  {device.last_telemetry?.temperature
                    ? `${device.last_telemetry.temperature} %`
                    : ''}{' '}
                  c°
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default HomePage;
