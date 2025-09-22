import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type NotificationCardInterface from './NotificationCard.types';
import { Grid } from '@mui/material';
import { DEVICE_PARAMETER, COMPARISON_CHOICES } from '../../utils/enums';
import type {
  DeviceParameterKey,
  DeviceComparisonKey,
} from '../../utils/enums';

function NotificationCard({
  id,
  name,
  user,
  parameter,
  comparison,
  message,
  threshold,
  devices_name,
  device_name,
  isNotification,
}: NotificationCardInterface) {
  if (isNotification)
    return (
      <Card
        sx={{
          minWidth: 275,
          border: '1px solid #e4cd04ff',
          marginBottom: '10px',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 16, fontWeight: '700' }}
          >
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} my={2}>
            {message}
          </Typography>
        </CardContent>

        <CardContent sx={{ paddingY: '0' }}>
          <Grid container spacing={2}>
            <Typography
              fontSize={14}
              sx={{ color: '#878d94ff', fontWeight: '700' }}
            >
              Dispositivo:
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', fontWeight: '500', fontSize: 14 }}
            >
              {device_name}
            </Typography>
          </Grid>
        </CardContent>
        <CardContent sx={{ paddingY: '0' }}>
          <Grid container spacing={2}>
            <Typography
              fontSize={14}
              sx={{ color: '#878d94ff', fontWeight: '700' }}
            >
              Condição:
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
              {DEVICE_PARAMETER[parameter as DeviceParameterKey]}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
              {COMPARISON_CHOICES[comparison as DeviceComparisonKey]}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
              {threshold}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    );

  return (
    <Card
      sx={{
        minWidth: 275,
        border: '1px solid #86b1f7ff',
        marginBottom: '10px',
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontSize: 16, fontWeight: '700' }}
        >
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} my={2}>
          {message}
        </Typography>
      </CardContent>

      <CardContent sx={{ paddingY: '0' }}>
        <Grid container spacing={2}>
          <Typography
            fontSize={14}
            sx={{ color: '#878d94ff', fontWeight: '700' }}
          >
            Dispositivos:
          </Typography>
          {devices_name &&
            devices_name.map((device) => (
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: '500',
                  fontSize: 14,
                }}
              >
                {device}
              </Typography>
            ))}
        </Grid>
      </CardContent>
      <CardContent sx={{ paddingY: '0' }}>
        <Grid container spacing={2}>
          <Typography
            fontSize={14}
            sx={{ color: '#878d94ff', fontWeight: '700' }}
          >
            Condição:
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
            {DEVICE_PARAMETER[parameter as DeviceParameterKey]}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
            {COMPARISON_CHOICES[comparison as DeviceComparisonKey]}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
            {threshold}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default NotificationCard;
