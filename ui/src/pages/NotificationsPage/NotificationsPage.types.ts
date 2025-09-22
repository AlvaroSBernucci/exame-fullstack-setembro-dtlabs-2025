export interface NotificationConfigInterface {
  id: number;
  name: string;
  user: number;
  parameter: string;
  comparison: string;
  threshold: number;
  message: string;
  devices_name?: string[];
}

export interface NotificiationInterface {
  id: number;
  user: number;
  comparison: string;
  device_name?: string;
  config_name: string;
  alert_text: string;
  parameter: string;
  threshold: number;
}
