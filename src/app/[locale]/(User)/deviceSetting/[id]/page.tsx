"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Time from "@/components/settingcomponents/time";
import Mode from "@/components/settingcomponents/mode";
import Safe from "@/components/settingcomponents/safe";
import { Setting, Device, DeviceSetting } from "@/components/data/device";
import Link from "next/link";

function SettingMenu() {
  const { id } = useParams(); // Lấy id từ URL
  const [setting, Setset] = useState<Setting | null>(null);
  // const [deviceSetting, Setdvset] = useState<DeviceSetting | null>(null);
  const [device, Setdva] = useState<Device | null>(null);
  const [auto, setAuto] = useState<boolean>(false); // Lưu giá trị auto trong state
  const [valueStart, setValueStart] = useState<number>(0); // State cho valueStart
  const [valueEnd, setValueEnd] = useState<number>(0); // State cho valueEnd
  const [action,setActon] = useState<true|false>(false)
  const [sTime, setStartTime] = useState<Date | null>(null);
  const [eTime, setEndTime] = useState<Date | null>(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res1 = await fetch(`http://localhost:8000/api/v2/devices/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res1.ok) throw new Error("Lỗi khi fetch settings/device");

        const resdata = await res1.json();
        const firstItem = resdata.data;
        Setdva(firstItem);
        setAuto(firstItem.auto); // Cập nhật giá trị auto từ response
        setActon(firstItem.action)

        // Cập nhật valueStart và valueEnd từ deviceSetting nếu có
        if (firstItem.deviceSetting) {
          setValueStart(firstItem.deviceSetting.valueStart);
          setValueEnd(firstItem.deviceSetting.valueEnd);
        }

        console.log("Dữ liệu device:", firstItem);
      } catch (err) {
        console.error("Lỗi fetch device:", err);
      }
    };

    fetchSettings();
  }, [id, accessToken]);

  useEffect(() => {
    if (device?.settings?.[0]?.settingId) {
      const fetchSettingDetail = async () => {
        try {
          const res2 = await fetch(`http://localhost:8000/api/v2/settings/${device.settings?.[0].settingId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!res2.ok) throw new Error("Lỗi khi fetch setting detail");

          const detailData = await res2.json();
          Setset(detailData);
          setStartTime(detailData.timeStart);
          // setValueStart(detailData.devices[0].valueStart);
          // setValueEnd(detailData.devices[0].valueEnd);
          setEndTime(detailData.timeEnd);
          console.log("Dữ liệu setting:", detailData);
        } catch (err) {
          console.error("Lỗi fetch setting detail:", err);
        }
      };

      fetchSettingDetail();
    }
  }, [device, accessToken]);

  // useEffect(() => {
  //   if (setting?.timeStart || setting?.timeEnd) {
  //     setStartTime(new Date(setting.timeStart));
  //     setEndTime(new Date(setting.timeEnd));
  //   }
  // }, [setting]);

  const handleTimeChange = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
  };

  // Callback để thay đổi giá trị valueStart và valueEnd từ component con
  const handleValueChange = (newValueStart: number, newValueEnd: number) => {
    setValueStart(newValueStart);
    setValueEnd(newValueEnd);
  };

  // Hàm reset lại tất cả các giá trị
  const resetValues = () => {
    setValueStart(0); // Reset valueStart
    setValueEnd(0); // Reset valueEnd
    setAuto(false); // Reset auto
    setStartTime(null); // Reset start time
    setEndTime(null); // Reset end time
  };

  // Hàm hiển thị thông báo khi bấm Xác nhận
  const handleConfirm = () => {
    const message = `
      Xác nhận các giá trị:
      - Giá trị bắt đầu: ${valueStart}
      - Giá trị kết thúc: ${valueEnd}
      - Action: ${action}
      - Auto: ${auto ? "Bật" : "Tắt"}
      - Thời gian bắt đầu: ${sTime ? sTime.toLocaleString() : "Chưa chọn"}
      - Thời gian kết thúc: ${eTime ? eTime.toLocaleString() : "Chưa chọn"}
    `;
    alert(message);
  };

  return (
    <div>
      <Header />
      <div className="h-screen w-screen flex flex-col-reverse">
        <div className="bg-mau3 justify-end px-4 py-6 rounded-t-xl">
          <Mode auto={auto} setAuto={setAuto} />
  
          {/* Điều kiện render Time và Safe nếu device.auto === true */}
          {device?.auto === true ? (
            <>
              <Time device={{ startTime: sTime, endTime: eTime }} onTimeChange={handleTimeChange} />
              <Safe 
                device={{ valueStart, valueEnd }} 
                onValueChange={handleValueChange} 
              />
            </>
          ) : (
            /* Nếu device.auto không phải là true, hiển thị nút bật */
            <div className="flex justify-center my-5">
              <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px]">
                <h2
                  className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                  onClick={() => setActon(!action)} // Gọi hàm handleConfirm khi bấm Xác nhận
                >
                  Bật
                </h2>
              </div>
            </div>
            
          )}
          
          <div className="flex justify-evenly gap-3 px-3 py-3">
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px]">
              <Link href={'/'}>
                <h2 className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center">
                  Hủy Bỏ
                </h2>
              </Link>
            </div>
            <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px]">
              <h2
                className="font-josefin font-bold text-xl py-4 px-6 text-mau3 text-center"
                onClick={handleConfirm} // Gọi hàm handleConfirm khi bấm Xác nhận
              >
                Xác nhận
              </h2>
            </div>
          </div>
        </div>
        <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3"> Yolo Farm </h1>
      </div>
    </div>
  );
    
}

export default SettingMenu;
