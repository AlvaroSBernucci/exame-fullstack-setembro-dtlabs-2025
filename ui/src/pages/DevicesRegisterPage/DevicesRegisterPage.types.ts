export interface DeviceInterface {
  id: number;
  uuid: string;
  name: string;
  location: string;
  sn: string;
  created_at: string;
  updated_at: string;
  description?: string;
  last_telemetry?: TelemetryInterface;
}

interface TelemetryInterface {
  id: number;
  cpu_usage: number;
  ram_usage: number;
  temperature: number;
}

export interface NewDeviceInterface {
  name: string;
  location: string;
  sn: number;
  description?: string;
}
