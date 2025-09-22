import type TelemetryInterface from '../../pages/DeviceDataPage/DeviceDataPage.types';
export default interface DeviceFilterProps {
  setData: React.Dispatch<
    React.SetStateAction<TelemetryInterface[] | undefined>
  >;
}
