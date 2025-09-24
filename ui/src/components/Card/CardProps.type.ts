export interface DeviceCardProps {
  id: string;
  name: string;
  location: string;
  sn: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
  telemetry?: TelemetryCardProps;
  home?: boolean;
  onUpdate?: (signal: AbortSignal) => Promise<void>;
}

interface TelemetryCardProps {
  id: number;
  cpu_usage: number;
  ram_usage: number;
  temperature: number;
}
