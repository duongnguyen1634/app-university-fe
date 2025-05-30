"use client";
import Navigate from "@/components/navigate/navigate";
import NavigateHome from "@/components/header/header";
import Image from "next/image";
import { useState, useEffect } from "react";
import avatarDefault from "../../../../../public/image/avt.jpg";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"view" | "edit">("view");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [canSave, setCanSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (!storedName || !storedEmail) {
        setError("Không tìm thấy thông tin người dùng. Vui lòng.");
        setLoading(false);
        return;
    }

    setName(storedName);
    setEmail(storedEmail);
    setLoading(false);
}, []);

  useEffect(() => {
    // Kiểm tra nếu tên không rỗng và khác với giá trị ban đầu
    const storedName = localStorage.getItem("username");
    if (name.trim() !== "" && name !== storedName) {
        setCanSave(true);
    } else {
        setCanSave(false);
    }
  }, [name]);

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem("User Id"); // Lấy userId từ localStorage
    if (!userId) {
        console.error("User ID not found");
        setError("Không tìm thấy User ID. Vui lòng đăng nhập lại.");
        return;
    }

    try {
        //console.log("handleSaveChanges called with User ID:", userId); // In ra dòng kiểm tra

        const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
            method: "PATCH", // Sử dụng phương thức PUT để cập nhật thông tin
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Thêm access token nếu cần
            },
            body: JSON.stringify({
                name, // Tên mới
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);

        // Cập nhật lại state và localStorage với thông tin mới
        setName(result.data.name); 
        //setEmail(result.data.email);
        localStorage.setItem("username", result.data.name); // Cập nhật localStorage
        //localStorage.setItem("email", result.data.email); // Cập nhật localStorage

        // Hiển thị thông báo thành công
        alert("Thay đổi thành công");
        setCanSave(false); // Vô hiệu hóa nút sau khi lưu
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Lỗi: Không thể thay đổi thông tin");
    }
};

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleLogout = () => {
    // Xóa tất cả thông tin khỏi localStorage
    localStorage.clear();

  
    // Chuyển hướng người dùng đến trang login
    router.push("/auth/login")  // Hoặc bạn có thể dùng router.push("/auth/login") nếu đang sử dụng Next.js.
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
                    <strong>Họ và tên:</strong> {name}
                  </p>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <p>
                    <strong>Authentication:</strong>{" "}
                    **************
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
            <button
              className={`py-4 px-6 rounded-xl text-lg font-semibold bg-red-800 text-mau3`}
              
              onClick={() => handleLogout()}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </main>
      <Navigate/>       
    </div>
  );
}
