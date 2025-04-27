"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header/header";
import Navigate from "@/components/navigate/navigate";
import NofiCard from "@/components/nofiCard/nofi";
import { Notify } from "@/components/data/device";

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<Notify[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
        const handleDetailClick = async (id: string) => {
        console.log("Chi tiết thông báo với ID:", id);
    
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            console.error("No access token found");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8000/api/v1/notify/${id}`, {
                method: "PATCH", // Sử dụng phương thức PUT để cập nhật
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ read: true }), // Nội dung cập nhật
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            console.log(`Thông báo với ID ${id} đã được cập nhật trạng thái đọc.`);
            // Cập nhật lại danh sách thông báo trong state
            setNotifications((prevNotifications) =>
                prevNotifications.map((notify) =>
                    notify.id === id ? { ...notify, read: true } : notify
                )
            );
        } catch (err) {
            console.error("Error updating notification:", err);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            setError("No access token found");
            setLoading(false);
            return;
        }

        const fetchNotifications = async () => {
            try {
                // Fetch danh sách thông báo
                const notifyResponse = await fetch("http://localhost:8000/api/v1/notify", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!notifyResponse.ok) {
                    throw new Error(`HTTP error! status: ${notifyResponse.status}`);
                }

                const notifyData = await notifyResponse.json();
                setNotifications(notifyData.data || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching notifications:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div className="h-fit w-screen flex flex-col">
                <Header />
                <div className="py-10">
                    <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">Yolo Farm</h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <p>Loading notifications...</p>
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
    {notifications.length === 0 ? (
        <div className="text-center py-10">No notifications found</div>
    ) : (
        notifications.map((notify) => (
            <NofiCard
                key={notify.id}
                device={{
                    read: !notify.read ? true : false,
                    action: notify.message,
                    timenofication: new Date(notify.createdAt).toLocaleString(),
                }}
                onDetailClick={() => handleDetailClick(notify.id)} // Truyền hàm vào prop
            />
        ))
    )}
</div>
            <Navigate />
        </div>
    );
}