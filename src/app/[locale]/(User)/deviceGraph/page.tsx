"use client";
import Graph from "@/components/graphCard/graph";
import Navigate from "@/components/navigate/navigate";
import Header from "@/components/header/header";
import { useState, useEffect } from "react";
import { Device } from "@/components/data/device";

export default function DeviceGraph() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            setError("No access token found");
            setLoading(false);
            return;
        }

        let interval: NodeJS.Timeout;

        const fetchDevices = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/devices/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                
                console.log("Response status:", response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDevices(data.data || []); // Đảm bảo luôn là mảng
                setError(null);
            } catch (err) {
                console.error("Error fetching devices:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch devices");
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
        interval = setInterval(fetchDevices, 5000);

        return () => {
            if (interval) clearInterval(interval);
        };
    }, []);

    if (loading) {
        return (
            <div className="h-fit w-screen flex flex-col">
                <Header />
                <div className="py-10">
                    <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">Yolo Farm</h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <p>Loading devices...</p>
                </div>
                <Navigate />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-fit w-screen flex flex-col">
                <Header />
                <div className="py-10">
                    <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">Yolo Farm</h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">Error: {error}</p>
                </div>
                <Navigate />
            </div>
        );
    }

    return (
        <div className="h-fit w-screen flex flex-col">
            <Header />
            <div className="py-10">
                <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">Yolo Farm</h1>
            </div>
            <div className="bg-mau3 rounded-t-xl py-4 px-3 flex flex-col gap-4">
                {devices.length === 0 ? (
                    <div className="text-center py-10">No devices found</div>
                ) : (
                    devices.map((device) => (
                        <Graph 
                            key={device.id}
                            id={device.id}
                            name={device.name}
                            data={device.data || []} // Đảm bảo luôn truyền mảng
                        />
                    ))
                )}
            </div>
            <Navigate />
        </div>
    );
}