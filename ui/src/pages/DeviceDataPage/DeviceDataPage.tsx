import { Grid, Typography } from '@mui/material';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeviceFilter from '../../components/DeviceFilter/DeviceFilter';
import TelemetryChart from '../../components/DeviceChart/DeviceChart';
import { useState } from 'react';
import type TelemetryInterface from './DeviceDataPage.types';

function DeviceDataPage() {
  const [telemetryData, setTelemetryData] = useState<
    TelemetryInterface[] | undefined
  >();

  return (
    <Grid my={5} mx={15}>
      <Typography variant="h1" fontSize={30} mb={2}>
        Análise de Dados dos Dispositivos
      </Typography>
      <Typography fontSize={16} sx={{ color: '#65758b' }}>
        Monitore o histórico de heartbeat e performance dos seus dispositivos
        IoT
      </Typography>
      <Grid mt={3}>
        <Grid container spacing={2} alignItems={'center'} mb={2}>
          <FontAwesomeIcon icon={faFilter} />
          <Typography variant="h3" fontSize={24}>
            Filtros de Análise
          </Typography>
        </Grid>
        <Typography fontSize={16} sx={{ color: '#65758b' }} mb={2}>
          Configure os parâmetros para análise dos dados históricos
        </Typography>
      </Grid>
      <DeviceFilter setData={setTelemetryData} />

      {telemetryData && <TelemetryChart data={telemetryData} />}
    </Grid>
  );
}

export default DeviceDataPage;
