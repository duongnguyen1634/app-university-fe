"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Time from "@/components/settingcomponents/time";
import Safe from "@/components/settingcomponents/safe";
import Mode from "@/components/settingcomponents/mode";
import { Setting } from "@/components/data/device";
import Link from "next/link";

function SettingMenu() {
  const { id } = useParams(); 
  const [allSetting, setAllSetting] = useState<Setting[] | null>(null);
  const [cruSetting, setCruSetting] = useState<Setting | null>(null);
  const [valueStart, setValueStart] = useState<number>(0);
  const [valueEnd, setValueEnd] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false);
  const [sTime, setStartTime] = useState<Date | null>(null);
  const [eTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    const fetchSettingDetail = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) return;

        const res = await fetch(`http://localhost:8000/api/v1/settings/device/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Lỗi khi fetch setting detail");

        const data = await res.json();
        setAllSetting(data.data);

        const now = new Date();
        const currentSetting = data.data.find((setting: Setting) => {
          const startTime = new Date(setting.timeStart);
          const endTime = new Date(setting.timeEnd);
          return startTime <= now && now <= endTime;
        }) || data.data[0];

        setCruSetting(currentSetting);
      } catch (error) {
        console.error("Lỗi fetch setting detail:", error);
      }
    };

    fetchSettingDetail();
  }, [id]);

  // Khi cruSetting thay đổi, cập nhật các giá trị
  useEffect(() => {
    if (cruSetting?.devices && cruSetting.devices.length > 0) {
      const device = cruSetting.devices[0];
      setValueStart(device.valueStart);
      setValueEnd(device.valueEnd);
      setStartTime(new Date(cruSetting.timeStart));
      setEndTime(new Date(cruSetting.timeEnd));
    }
  }, [cruSetting]);

  const handleTimeChange = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleValueChange = (newValueStart: number, newValueEnd: number) => {
    setValueStart(newValueStart);
    setValueEnd(newValueEnd);
  };

  const handleSelectSetting = (setting: Setting) => {
    setCruSetting(setting);
  };

  const handleConfirm = () => {
    const message = `
      Xác nhận các giá trị:
      - Giá trị bắt đầu: ${valueStart}
      - Giá trị kết thúc: ${valueEnd}
      - Action: ${action}
      - Thời gian bắt đầu: ${sTime ? sTime.toLocaleString() : "Chưa chọn"}
      - Thời gian kết thúc: ${eTime ? eTime.toLocaleString() : "Chưa chọn"}
    `;
    alert(message);
  };

  return (
    <div>
      <Header />
      <div className="h-screen w-screen flex flex-col-reverse">
        <div className="bg-mau3 justify-end px-4 py-6 rounded-t-xl space-y-4">
          
          {/* Nếu allSetting tồn tại mới render Mode */}
          {allSetting && (
            <Mode 
              settings={allSetting} 
              selectedSetting={cruSetting} 
              onSelect={handleSelectSetting} 
            />
          )}

          <Time device={{ startTime: sTime, endTime: eTime }} onTimeChange={handleTimeChange} />
          <Safe device={{ valueStart, valueEnd }} onValueChange={handleValueChange} />

          <div className="flex justify-evenly gap-3 px-3 py-3">
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px]">
              <Link href={'/'}>
                <h2 className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center">
                  Hủy Bỏ
                </h2>
              </Link>
            </div>
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px] cursor-pointer">
              <h2
                className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                onClick={handleConfirm}
              >
                Xác nhận
              </h2>
            </div>
          </div>
        </div>

        <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">
          Yolo Farm
        </h1>
      </div>
    </div>
  );
}

export default SettingMenu;
