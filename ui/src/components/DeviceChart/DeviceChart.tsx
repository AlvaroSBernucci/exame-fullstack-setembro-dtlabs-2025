import { LineChart } from '@mui/x-charts/LineChart';
import type TelemetryInterface from '../../pages/DeviceDataPage/DeviceDataPage.types';

interface TelemetryChartInterface {
  data: TelemetryInterface[];
}

export default function TelemetryChart({ data }: TelemetryChartInterface) {
  const timestamps = Array.from(new Set(data.map((d) => d.created_at)))
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  const devices = Array.from(new Set(data.map((d) => d.device_name)));

  const series = devices.flatMap((device) => {
    const deviceData = data.filter((d) => d.device_name === device);

    const cpuSeries = {
      label: `CPU (${device})`,
      data: timestamps.map((time) => {
        const item = deviceData.find(
          (d) => new Date(d.created_at).getTime() === time.getTime()
        );
        return item ? Number(item.cpu_usage) : null;
      }),
      showMark: true,
    };

    const ramSeries = {
      label: `RAM (${device})`,
      data: timestamps.map((time) => {
        const item = deviceData.find(
          (d) => new Date(d.created_at).getTime() === time.getTime()
        );
        return item ? Number(item.ram_usage) : null;
      }),
      showMark: true,
    };

    const tempSeries = {
      label: `Temp (${device})`,
      data: timestamps.map((time) => {
        const item = deviceData.find(
          (d) => new Date(d.created_at).getTime() === time.getTime()
        );
        return item ? Number(item.temperature) : null;
      }),
      showMark: true,
    };

    return [cpuSeries, ramSeries, tempSeries];
  });

  return (
    <LineChart
      height={400}
      xAxis={[
        {
          data: timestamps,
          scaleType: 'time',
          valueFormatter: (date) =>
            new Date(date).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
        },
      ]}
      yAxis={[
        {
          min: 0,
          max: 100,
          tickInterval: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          label: '%',
        },
      ]}
      series={series}
    />
  );
}
