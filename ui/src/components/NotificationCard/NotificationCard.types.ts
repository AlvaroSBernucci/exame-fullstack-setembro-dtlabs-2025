export default interface NotificationCardInterface {
  user: number;
  name: string;
  parameter: string;
  comparison: string;
  threshold: number;
  message: string;
  devices_name?: string[];
  device_name?: string;
  isNotification: boolean;
}
