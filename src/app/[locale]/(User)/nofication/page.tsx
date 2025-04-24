import Navigate from "@/components/navigate/navigate";
import Header from "@/components/header/header";
import { device } from "@/components/data/device";
import NofiCard from "@/components/nofiCard/nofi";

export default function Nofication() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <h1 className="font-josefin font-black text-3xl text-center my-10 text-mau3">Yolo Farm</h1>
            <div className="flex-1 overflow-y-auto min-h-main-size gap-3 flex flex-col rounded-t-xl py-5 px-3 bg-mau3">
                {device.map((device) => (
                    <NofiCard key={device.id} device={device} />
                ))}
            </div>
            <Navigate />
        </div>
    );
}