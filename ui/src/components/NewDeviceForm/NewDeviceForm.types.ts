export interface DeviceValuesInterface {
  name: string;
  location: string;
  description?: string;
}
export interface NewDeviceFormProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
