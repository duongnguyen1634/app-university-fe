"use client";

import NavigateHome from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import avatarDefault from "../../../../../public/image/avatar.jpg";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"view" | "edit">("view");
  const [name, setName] = useState(session?.user.name ?? "");
  const [email] = useState(session?.user.email ?? "");
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (session?.user) {
      // Kiểm tra xem có thay đổi gì trong tên không và tên không rỗng
      if (name !== session.user.name && name.trim() !== "") {
        setCanSave(true);
      } else {
        setCanSave(false);
      }
    }
  }, [name, session]);

  if (status === "loading") {
    return <p>Đang tải...</p>;
  }

  if (!session) {
    return <p>Bạn cần đăng nhập để truy cập trang này.</p>;
  }

  // Hàm lưu thay đổi (Giả sử bạn sẽ gửi dữ liệu lên API)
  const handleSaveChanges = () => {
    console.log("Lưu thay đổi:", { name });
    // Gửi thông tin mới lên API ở đây
  };

  return (
    <div className="bg-[#3A8A7D] min-h-screen flex flex-col">
      <NavigateHome />

      <main className="flex-1 flex justify-center items-center px-4 py-20 pt-40">
        <div className="bg-[#F6F8E3] rounded-3xl p-10 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold text-[#3A8A7D] mb-10">
            Thông tin người dùng
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-10 justify-between">
            {/* Avatar */}
            <div className="border-[10px] border-[#3A8A7D] rounded-3xl p-1">
              <Image
                src={avatarDefault}
                alt="User Avatar"
                width={220}
                height={220}
                className="rounded-2xl object-cover"
              />
            </div>

            {/* Thông tin: hiển thị hoặc chỉnh sửa inline */}
            <div className="text-[#3A8A7D] text-lg space-y-4 w-full max-w-md">
              {activeTab === "view" ? (
                <>
                  <p>
                    <strong>Họ và tên:</strong> {session.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {session.user.email}
                  </p>
                  <p>
                    <strong>Authentication:</strong>{" "}
                    ******************************
                  </p>
                </>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-[#3A8A7D] focus:outline-none"
                      required
                    />
                    {/* Hiển thị thông báo lỗi nếu tên trống */}
                    {name.trim() === "" && (
                      <p className="text-red-500 text-sm">Tên là bắt buộc</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full px-4 py-2 rounded-xl bg-gray-200 border-none text-gray-500 focus:outline-none"
                    />
                  </div>
                  {/* Nút lưu thay đổi chỉ khi có thay đổi trong tên và tên không trống */}
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    disabled={!canSave}
                    className={`${
                      canSave
                        ? "bg-[#3A8A7D] text-white"
                        : "bg-gray-400 text-gray-200"
                    } py-3 px-6 rounded-xl mt-4 text-lg font-semibold hover:opacity-90 disabled:opacity-60`}
                  >
                    Lưu thay đổi
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              className={`py-4 px-6 rounded-xl text-lg font-semibold ${
                activeTab === "edit"
                  ? "bg-[#C3E5B5] text-[#3A8A7D]"
                  : "bg-[#3A8A7D] text-white"
              } hover:opacity-90`}
              onClick={() => setActiveTab("edit")}
            >
              Chỉnh sửa thông tin
            </button>
            <button
              className={`py-4 px-6 rounded-xl text-lg font-semibold ${
                activeTab === "view"
                  ? "bg-[#C3E5B5] text-[#3A8A7D]"
                  : "bg-[#3A8A7D] text-white"
              } hover:opacity-90`}
              onClick={() => setActiveTab("view")}
            >
              Hiện thông tin
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
