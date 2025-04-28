import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Device, DeviceSetting, Setting } from "../data/device";

function DisplayCard({ device }: { device: Device }) {
  const [tile, changetile] = useState(device.name);
  const [id, changeid] = useState(device.id);
  const [mode, changemode] = useState(device.auto);
  const [vale, changevale] = useState(device.data?.[0].value);
  const [deviceSetting, changeDeviceSetting] = useState<Setting | null>(null);
  const [type, changeType] = useState<string | null>(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    changetile(device.name);
    changeid(device.id);
    changemode(device.auto);
    changevale(device.data?.[0].value); // cập nhật lại value
  }, [device]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    const fetchDeviceSetting = () => {
      fetch(`http://localhost:8000/api/v2/settings/device/${device.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => {
          const now = new Date();
          const validSetting = data.data.find((setting: Setting) => {
            const start = new Date(setting.timeStart);
            const end = new Date(setting.timeEnd);
            return start < now && end > now;
          });
  
          const fallback = data.data?.[0];
          const selectedSetting = validSetting || fallback;
  
          if (selectedSetting) {
            changeDeviceSetting(selectedSetting);
          }
        })
        .catch((err) => {
          console.error("Lỗi:", err);
        });
    };
  
    fetchDeviceSetting(); // Gọi ngay khi component mount
    interval = setInterval(fetchDeviceSetting, 5000); // Gọi lại mỗi 5s
  
    return () => clearInterval(interval); // Dọn dẹp khi unmount
  }, [device.id, accessToken]);
  

  return (
    <div className="my-3 mx-2 justify-evenly flex gap-3 p-3 bg-mau1 border-mau2 rounded-3xl border-4">
      <div className="flex flex-col gap-2 justify-evenly w-full text-center w-fit px-1 py-5 m-2">
        <h2 className="font-josefin font-bold text-xl text-mau3">{tile}</h2>
        <h2 className="font-josefin font-bold text-8xl text-mau3">{vale}</h2>
      </div>
      <div className="flex flex-col justify-center w-full gap-2">
        <div className="flex flex-col gap-1 justify-evenly px-3 text-center">
            <>
              <p className="font-dosis font-light text-xl text-mau3">Thời gian</p>
              <p className="font-dosis font-light text-xl text-mau3">
                <span>{deviceSetting?.timeStart ? new Date(deviceSetting?.timeStart).toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' }) : "N/A"}</span>  
                <span> - </span>
                <span>{deviceSetting?.timeEnd ? new Date(deviceSetting?.timeEnd).toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' }) : "N/A"}</span>
              </p>
              <p className="font-dosis font-light text-xl text-mau3">Giá trị</p>
              <p className="font-dosis font-light text-xl text-mau3">
                {deviceSetting?.devices?.[0]?.valueStart} - {deviceSetting?.devices?.[0]?.valueEnd}
              </p>
            </>
        </div>
        <Link
          href={`/deviceSetting/${id}`}
          className="flex m-auto w-fit py-3 gap-3 rounded-2xl px-5 bg-mau3"
        >
          <Image alt="Setting" src={"/icon/Setting.svg"} width={24} height={24} />
          <p className="font-josefin font-bold text-xl text-mau1">Cài đặt</p>
        </Link>
      </div>
    </div>
  );
}

function Card() {
  const accessToken = localStorage.getItem("access_token");
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchDevices = () => {
      if (accessToken) {
        fetch("http://localhost:8000/api/v1/devices/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
          .then((data) => {
            setDevices(data.data); // cập nhật state
            //console.log("Device card:", data)
          })
          .catch((err) => {
            console.error("Lỗi khi gọi API devices:", err);
          });
      }
    };

    fetchDevices(); // gọi lần đầu ngay khi mount

    interval = setInterval(fetchDevices, 5000); // gọi lại mỗi 5 giây

    return () => clearInterval(interval); // clear khi component unmount
  }, [accessToken]);

  return (
    <div className="bg-mau3 w-full h-full rounded-t-xl flex flex-col">
      {devices && devices.length > 0 ? (
        devices.map((device) => <DisplayCard key={device.id} device={device} />)
      ) : (
        <p>Không có thiết bị</p>
      )}
    </div>
  );
}

export default Card;
