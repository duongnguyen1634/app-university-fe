"use client";
import { useParams } from "next/navigation";
import Mode from "@/components/settingcomponents/mode";
import { device } from "@/components/data/device";
import Time from "@/components/settingcomponents/time";
import Safe from "@/components/settingcomponents/safe";
import Header from "@/components/header/header";

function SettingMenu() {
    const { id } = useParams(); // Lấy id từ URL
    const selectedDevice = device.find((d) => d.id === parseInt(typeof id === "string" ? id : "0")); // Tìm thiết bị theo id

    if (!selectedDevice) {
        return <div>Thiết bị không tồn tại</div>; // Hiển thị thông báo nếu không tìm thấy thiết bị
    }

    return (
        <>
            <Header/>
            <div className="h-screen w-screen flex flex-col-reverse">
                <div className="bg-mau3 justify-end px-4 py-6 rounded-t-xl">
                    <Mode device={{ mode: selectedDevice.mode }} />
                    <Time device={{ startTime: selectedDevice.starttime, endTime: selectedDevice.endtime }} />
                    <Safe device={{ maxValue: selectedDevice.endvalue, minValue: selectedDevice.startvalue }} />
                    <div className="flex justify-evenly gap-3 px-3 py-3">
                        <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px]">
                            <h2 className="font-josefin font-bold text-xl py-4 px-6  text-mau3 text-center" onClick={() => alert("Huyr Bor")}>Hủy Bỏ</h2>
                        </div>
                        <div className="bg-mau1 w-fit h-fit rounded-lg min-w-[135px]">
                            <h2 className="font-josefin font-bold text-xl py-4 px-6  text-mau3 text-center" onClick={() => alert("Xác nhận")}>Xác nhận</h2>
                        </div>
                    </div>
                </div>
                <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3"> Yolo Farm </h1>
            </div>
        </>
        
        
    );
}

export default SettingMenu;
