export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    phone: string;
    refreshToken?: string | null;
    notifications?: Notify[];
    devices?: Device[];
    settings?: Setting[];
  }
  
  export interface Notify {
    id: string;
    message: string;
    read: boolean;
    userId: string;
    createdAt: Date;
    user?: User;
  }
  
  export interface Device {
    id: string;
    name: string;
    userId: string;
    type: string;
    action: boolean;
    auto: boolean;
    data?: DeviceData[];
    settings?: DeviceSetting[];
    user?: User;
  }
  
  export interface DeviceData {
    id: string;
    deviceId: string;
    value: number;
    time: Date;
    action: boolean;
    device?: Device;
  }
  
  export interface Setting {
    id: string;
    timeStart: Date;
    timeEnd: Date;
    status: string;
    userId: string;
    devices?: DeviceSetting[];
    user?: User;
  }
  
  export interface DeviceSetting {
    DeviceSettingId: string;
    deviceId: string;
    settingId: string;
    valueStart: number;
    valueEnd: number;
    device?: Device;
    setting?: Setting;
  }
  