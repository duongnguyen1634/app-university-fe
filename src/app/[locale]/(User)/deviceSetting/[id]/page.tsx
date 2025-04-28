"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Time from "@/components/settingcomponents/time";
import Safe from "@/components/settingcomponents/safe";
import Mode from "@/components/settingcomponents/mode";
import { Setting,Device } from "@/components/data/device";
import Link from "next/link";
import { useRouter } from "next/navigation";


function SettingMenu() {
  const { id } = useParams(); 
  const [allSetting, setAllSetting] = useState<Setting[] | null>(null);
  const [cruSetting, setCruSetting] = useState<Setting | null>(null);
  const [valueStart, setValueStart] = useState<number>(0);
  const [valueEnd, setValueEnd] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false);
  const [sTime, setStartTime] = useState<Date | null>(null);
  const [eTime, setEndTime] = useState<Date | null>(null);
  const [Device, setDevice] = useState<Device | null>(null);
  const router = useRouter();


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

  useEffect(()=>{
    const fetchDevie = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) return;

        const res = await fetch(`http://localhost:8000/api/v1/devices/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Lỗi khi fetch setting detail");

        const data = await res.json();
        setDevice(data.data);
        setAction(data.data.action)
        console.log(data.data)
      } catch (error) {
        console.error("Lỗi fetch device detail:", error);
      }
    };
    fetchDevie();
  },[id])

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

  const handleConfirm = async () => {
    if (!cruSetting || !sTime || !eTime) {
      alert("Thiếu thông tin để xác nhận.");
      return;
    }
  
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Không tìm thấy access token.");
      return;
    }
  
    const payload = {
      settingId: cruSetting.id,
      timeStart: sTime.toISOString(),
      timeEnd: eTime.toISOString(),
      status: action ? "Active" : "Inactive", // Bạn có thể tùy chỉnh nếu status là boolean
      devices: [{
        DeviceSettingId: cruSetting?.devices?.[0].DeviceSettingId,
        deviceId: cruSetting?.devices?.[0].deviceId,
        settingId: cruSetting?.devices?.[0].settingId,
        valueStart: valueStart,
        valueEnd: valueEnd,
      }],
    };
  
    try {
      const res = await fetch(`http://localhost:8000/api/v1/settings`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Lỗi khi cập nhật setting");
      }
  
      alert("Cập nhật thành công!");
      router.push("/");
    } catch (error) {
      console.error("Lỗi cập nhật setting:", error);
      alert("Cập nhật thất bại!");
    }
  };

  const handleDelete = async () => {
    if (!cruSetting || !sTime || !eTime) {
      alert("Thiếu thông tin để xác nhận.");
      return;
    }
  
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Không tìm thấy access token.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/v1/settings/${cruSetting.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        throw new Error("Lỗi khi xóa setting");
      }
  
      alert("xóa thành công!");
      router.push("/");
    } catch (error) {
      console.error("Lỗi xóa setting:", error);
      alert("xóa thất bại!");
    }
  };

  const handleOnOrOff = async () => {
    if (action == true) {
      setAction(false)
    }else{
      setAction(true)
    }
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Không tìm thấy access token.");
      return;
    }
    
    const payload = {
      "action": action
    };

    try {
      const res = await fetch(`http://localhost:8000/api/v1/devices/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Lỗi Bat/Tat");
      }
  
      alert("Bat/Tat thành công!");
    } catch (error) {
      console.error("Lỗi Bat/Tat", error);
      alert("Bat/Tat thất bại!");
    }
  };

  const handleCreate = async () => {
    if (!cruSetting || !sTime || !eTime) {
      alert("Thiếu thông tin để tạo.");
      return;
    }
  
    // Kiểm tra trùng thời gian
    const overlap = allSetting?.some(existing => {
      const existingStart = new Date(existing.timeStart);
      const existingEnd = new Date(existing.timeEnd);
  
      // Nếu khoảng thời gian mới [sTime, eTime] đè lên khoảng cũ [existingStart, existingEnd]
      return (sTime < existingEnd) && (eTime > existingStart);
    });
  
    if (overlap) {
      alert("Khoảng thời gian đã bị trùng với một cài đặt khác!");
      return;
    }
  
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Không tìm thấy access token.");
      return;
    }
  
    const payload = {
      timeStart: sTime.toISOString(),
      timeEnd: eTime.toISOString(),
      status: action ? "Active" : "Inactive",
      devices: [{
        deviceId: cruSetting?.devices?.[0].deviceId,
        valueStart: valueStart,
        valueEnd: valueEnd,
      }],
    };
  
    try {
      const res = await fetch(`http://localhost:8000/api/v1/settings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Lỗi khi tạo setting");
      }
  
      alert("Tạo thành công!");
      router.push("/");
    } catch (error) {
      console.error("Lỗi tạo setting:", error);
      alert("Tạo thất bại!");
    }
  };
  
  const handlCancel =() => {
      router.push("/");
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
          {Device?.type === "B" && (
            <div className="flex justify-center">
              <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[162px] cursor-pointer">
                <h2
                  className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                  onClick={handleOnOrOff}
                >
                  {action ? "Tắt" : "Bật"}
                </h2>
              </div>
            </div>
          )}
          <div className="flex justify-evenly gap-3 px-3 py-3 flex-wrap ">
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[162px]">
                <h2 className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                  onClick={handlCancel}
                >
                  Hủy Bỏ
                </h2>
            </div>
            <div className="bg-red-800 w-fit h-fit rounded-lg min-w-[162px] cursor-pointer">
              <h2
                className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                onClick={handleDelete}
              >
                Xóa Cài Đặt
              </h2>
            </div>
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[162px]  cursor-pointer">
              <h2
                className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                onClick={handleCreate}
              >
                Tạo Cài Đặt
              </h2>
            </div>
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[162px] cursor-pointer">
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
