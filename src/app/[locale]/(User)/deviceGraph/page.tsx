"use client";
import Graph from "@/components/graphCard/graph";
import Navigate from "@/components/navigate/navigate";
import Header from "@/components/header/header";
import { device } from "@/components/data/device";

export default function DeviceGraph() {
    return (
        <div className="h-fit w-screen flex flex-col">
            <Header />

            <div className="py-10">
                <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">Yolo Farm</h1>
            </div>

            <div className="bg-mau3 rounded-t-xl py-4 px-3 flex flex-col gap-4">
                {device.map((d) => (
                    <Graph key={d.id} id={d.id} value={d.value} name={d.name} />
                ))}
            </div>

            <Navigate />
        </div>
    );
}