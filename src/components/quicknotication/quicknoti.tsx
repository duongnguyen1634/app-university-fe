import { useState, useEffect } from "react";
import { Notify } from "../data/device";

function QuickNoti() {
  const [notifications, setNotifications] = useState<Notify[]>([]);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem("AccessToken"); // Hoặc wherever bạn lưu accessToken

  useEffect(() => {
    const fetchDevie = async () => {
        try {
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) return;
  
          const res = await fetch(`http://localhost:8000/api/v1/notify`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
  
          if (!res.ok) throw new Error("Lỗi khi fetch setting detail");
  
          const data = await res.json();
          setNotifications(data.data)
          console.log(data.data)
        } catch (error) {
          console.error("Lỗi fetch device detail:", error);
        }
      };

      fetchDevie();
  }, [accessToken]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;
  
      const res = await fetch(`http://localhost:8000/api/v1/notify/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }), // Thêm body với thông tin cần cập nhật
      });
  
      // Nếu request thành công, cập nhật state notifications
      if (!res.ok) {
        throw new Error("Lỗi khi đánh dấu thông báo là đã đọc");
      }
  
      setNotifications((prev) =>
        prev.map((noti) =>
          noti.id === id ? { ...noti, read: true } : noti
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const DisplayCard = (noti: Notify) => {
    return (
      <div
        key={noti.id}
        onClick={() => handleMarkAsRead(noti.id)}
        className="bg-mau3 p-4 min-w-[15rem] h-25 flex flex-col rounded-3xl cursor-pointer hover:opacity-80 transition"
      >
        <h1 className="font-josefin text-lg font-bold">Thông báo</h1>
        <p className="font-dosis font-normal">
          {noti.message} <br />
          vào thời điểm {new Date(noti.createdAt).toLocaleTimeString()}
        </p>
      </div>
    );
  };

  return (
    <div className="no-scrollbar flex flex-row gap-4 overflow-x-auto p-4 flex-nowrap">
      {notifications.filter((noti) => !noti.read).length === 0 ? (
        <div className="py-10 flex justify-center m-auto">
          <h1 className="font-josefin font-black text-3xl text-center m-auto text-mau3">
            Yolo Farm
          </h1>
        </div>
      ) : (
        notifications
          .filter((noti) => !noti.read)
          .map((noti) => DisplayCard(noti))
      )}
    </div>
  );
}

export default QuickNoti;
