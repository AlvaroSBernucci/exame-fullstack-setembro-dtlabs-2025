import type { DeviceInterface } from '../../pages/DevicesRegisterPage/DevicesRegisterPage.types';

export interface NewRuleFormProps {
  devices: DeviceInterface[];
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (signal: AbortSignal) => Promise<void>;
}

export interface CreateRuleInterface {
  name: string;
  message: string;
  devices: string[];
  parameter: string;
  comparison: string;
  threshold: number;
}
