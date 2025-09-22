import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { DeviceListInterface } from '../../pages/HomePage/HomePage.types';
import useAxios from '../../hooks/useAxios';
import { api } from '../../utils/axios';
import type DeviceFilterProps from './DeviceFilter.types';

function DeviceFilter({ setData }: DeviceFilterProps) {
  const [device, setDevice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: devices } = useAxios<DeviceListInterface[]>(`api/v1/devices/`);

  useEffect(() => {
    const today = new Date();
    setEndDate(today.toISOString());
  }, []);

  const subtractHours = (date: string, hours: number) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() - hours);
    return newDate.toISOString();
  };

  const handleClick = async () => {
    const deviceParam = device === 'all' ? '' : device;
    try {
      const resp = await api.get(
        `/api/v1/telemetry/?device=${deviceParam}&start=${startDate}&end=${endDate}`
      );

      console.log(resp.data);
      setData(resp.data);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="device-label">Dispositivo</InputLabel>
          <Select
            labelId="device-label"
            label="Dispositivo"
            value={device}
            onChange={(e) => setDevice(e.target.value as string)}
          >
            <MenuItem value="all">
              <em>Todos os dispositivos</em>
            </MenuItem>
            {devices &&
              devices.map((device) => (
                <MenuItem value={device.uuid}>
                  <em>{device.name}</em>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="device-label">Período</InputLabel>
          <Select
            labelId="period-label"
            label="Período"
            onChange={(e) =>
              setStartDate(subtractHours(endDate, e.target.value as number))
            }
          >
            <MenuItem value={2}>
              <em>Últimas 2 Horas</em>
            </MenuItem>
            <MenuItem value={4}>
              <em>Últimas 4 Horas</em>
            </MenuItem>
            <MenuItem value={12}>
              <em>Últimas 12 Horas</em>
            </MenuItem>
            <MenuItem value={24}>
              <em>Últimas 24 Horas</em>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <Button
          variant="contained"
          sx={{ width: '100%', height: '100%' }}
          onClick={handleClick}
        >
          Atualizar Análise
        </Button>
      </Grid>
    </Grid>
  );
}

export default DeviceFilter;
