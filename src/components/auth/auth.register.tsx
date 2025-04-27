"use client";
import axios, { AxiosResponse } from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "../../../public/image/greenhouse1.jpg";
import { useTranslations } from "next-intl";

async function fetchData(url: string, body: any) {
  try {
    const response: AxiosResponse = await axios.post(url, body);
    return response.data;
  } catch (error: any) {
    return {
      statusCode: error?.response?.data?.statusCode ?? 400,
      error: error?.response?.data?.error ?? "error",
      message: error?.response?.data?.message ?? "message",
    };
  }
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameDisplay, setNameDisplay] = useState("");
  const [phone, setPhone] = useState("");

  const [confirmpassword, setConfirmpassword] = useState("");

  const [errUser, setErrUser] = useState("");
  const [errpass, setErrpass] = useState("");
  const [errconfirmpass, setErrConfirmPass] = useState("");
  const [errNameDisplay, setErrNameDisplay] = useState("");
  const [errPhone, setErrPhone] = useState("");

  const router = useRouter();
  const toast = useRef(null);
  const t = useTranslations("RegisterPage");

  const showError = (Message: string) => {
    //@ts-ignore
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: Message,
      life: 3000,
    });
  };

  const handleSubmit = async () => {
    if (!username) return setErrUser("Email is required");
    if (!password) return setErrpass("Password is required");
    if (password !== confirmpassword) return setErrConfirmPass("Passwords do not match");
    if (!nameDisplay) return setErrNameDisplay("Name is required");
    if (!phone) return setErrPhone("Phone is required");

    const response = await fetchData("http://localhost:8000/api/v1/users", {
      email: username,
      password,
      name: nameDisplay,
      phone,
    });

    if (response.error) {
      showError(response.message);
    } else {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (!res?.error) {
        setUsername("");
        setPassword("");
        router.push("/");
      } else {
        showError(res?.error);
      }
    }
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <Toast ref={toast} position="bottom-right" />
      </div>
      <div className="relative dark:bg-gray-600 overflow-hidden pb-10 shadow-lg bg-white rounded-md flex justify-center items-center">
        <div className="w-full max-w-xl px-5">
          <h1 className="text-4xl font-bold text-center text-[#3D8D7A] dark:text-white mb-3">Yolo Farm</h1>
          <h2 className="text-2xl font-semibold text-center dark:text-white mb-2">Welcome!</h2>
          <p className="text-center text-sm mb-5 dark:text-white">
            {t("title1")}
            <Link href="/login" className="text-[#3D8D7A] font-bold ml-1 dark:text-[#FBFFE4]">{t("title2")}</Link>
          </p>

          {/* Email */}
          <label className="block text-sm font-medium mb-1 text-white dark:text-white">Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrUser("");
            }}
            className="w-full mb-2 px-3 py-2 border rounded"
            placeholder="Enter email"
          />
          <span className="text-sm text-red-500">{errUser}</span>

          {/* Name */}
          <label className="block mt-3 text-sm font-medium mb-1 text-white dark:text-white">Name</label>
          <input
            type="text"
            value={nameDisplay}
            onChange={(e) => {
              setNameDisplay(e.target.value);
              setErrNameDisplay("");
            }}
            className="w-full mb-2 px-3 py-2 border rounded"
            placeholder="Enter full name"
          />
          <span className="text-sm text-red-500">{errNameDisplay}</span>

          {/* Phone */}
          <label className="block mt-3 text-sm font-medium mb-1 text-white dark:text-white">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrPhone("");
            }}
            className="w-full mb-2 px-3 py-2 border rounded"
            placeholder="Enter phone number"
          />
          <span className="text-sm text-red-500">{errPhone}</span>

          {/* Password */}
          <label className="block mt-3 text-sm font-medium mb-1 text-white dark:text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrpass("");
            }}
            className="w-full mb-2 px-3 py-2 border rounded"
            placeholder="Enter password"
          />
          <span className="text-sm text-red-500">{errpass}</span>

          {/* Confirm Password */}
          <label className="block mt-3 text-sm font-medium mb-1 text-white dark:text-white">Confirm Password</label>
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
              setErrConfirmPass("");
            }}
            className="w-full mb-2 px-3 py-2 border rounded"
            placeholder="Confirm password"
          />
          <span className="text-sm text-red-500">{errconfirmpass}</span>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#3D8D7A] hover:opacity-90 text-white dark:text-black dark:bg-[#FBFFE4] font-bold py-2 rounded-full"
          >
            Register
          </button>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="hidden lg:block w-[50%]">
          <Image src={logo} alt="Register" className="object-cover rounded-xl m-10" />
        </div>
      </div>
    </div>
  );
}

export default Register;
