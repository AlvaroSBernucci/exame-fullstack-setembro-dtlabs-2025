export interface DeviceValuesInterface {
  name: string;
  location: string;
  description?: string;
}
export interface NewDeviceFormProps {
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}
