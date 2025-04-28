"use client";
import axios, { AxiosResponse } from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
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
        // Tự động chuyển qua trang login
        router.push("/auth/login");
      } else {
        showError(res?.error);
      }
    }
  };

  const headertitle = () => (
    <div>
      <h1 className="text-4xl text-[#3D8D7A] font-josefin font-black text-start">
        Yolo Farm
      </h1>
      <h2 className="text-4xl text-[#3D8D7A] font-josefin font-black text-start">
        Welcome!
      </h2>
      <p className="text-black text-xl w-full mt-3 font-dosis">
        {t("title1")}
        <Link href="/login" className="font-bold text-[#3D8D7A]">
          {t("title2")}
        </Link>
      </p>
    </div>
  );

  const formInput = () => (
    <div className="w-full gap-2 m-2">
      {/* Email */}
      <div>
        <label htmlFor="Email" className="text-lg font-josefin block mb-1">
          Email
        </label>
        <input
          type="email"
          id="Email"
          placeholder="Enter Email..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={username}
          onChange={(e) => {
            setErrUser(e.target.value.length !== 0 ? "" : "Email is required");
            setUsername(e.target.value);
          }}
        />
        <span className="text-red-500 mt-1 block">{errUser}</span>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="Name" className="text-lg font-josefin block mb-1">
          Name
        </label>
        <input
          type="text"
          id="Name"
          placeholder="Enter full name..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={nameDisplay}
          onChange={(e) => {
            setErrNameDisplay(e.target.value.length !== 0 ? "" : "Name is required");
            setNameDisplay(e.target.value);
          }}
        />
        <span className="text-red-500 mt-1 block">{errNameDisplay}</span>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="Phone" className="text-lg font-josefin block mb-1">
          Phone
        </label>
        <input
          type="text"
          id="Phone"
          placeholder="Enter phone number..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={phone}
          onChange={(e) => {
            setErrPhone(e.target.value.length !== 0 ? "" : "Phone is required");
            setPhone(e.target.value);
          }}
        />
        <span className="text-red-500 mt-1 block">{errPhone}</span>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="Password" className="text-lg font-josefin block mb-1">
          Password
        </label>
        <input
          type="password"
          id="Password"
          placeholder="Enter Password..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={password}
          onChange={(e) => {
            setErrpass(e.target.value.length !== 0 ? "" : "Password is required");
            setPassword(e.target.value);
          }}
        />
        <span className="text-red-500 mt-1 block">{errpass}</span>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="ConfirmPassword" className="text-lg font-josefin block mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm Password..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={confirmpassword}
          onChange={(e) => {
            setErrConfirmPass(e.target.value !== password ? "Passwords do not match" : "");
            setConfirmpassword(e.target.value);
          }}
        />
        <span className="text-red-500 mt-1 block">{errconfirmpass}</span>
      </div>
    </div>
  );

  const footerRegister = () => (
    <button
      onClick={handleSubmit}
      className="p-2 block border-none rounded-[50px] mb-[10px] w-full mx-auto text-xl text-white font-josefin bg-[#3D8D7A] hover:opacity-70 mt-10"
    >
      Register
    </button>
  );

  return (
    <div className="flex justify-center items-center h-screen bg-mau1 m-5">
      <div className="card flex justify-content-center">
        <Toast ref={toast} position="bottom-right" />
      </div>
      <div className="relative bg-white overflow-hidden px-5 shadow-lg rounded-md flex justify-center items-center w-full max-w-[500px]">
        <div className="m-2 w-full gap-2">
          {headertitle()}
          {formInput()}
          {footerRegister()}
        </div>
      </div>
    </div>
  );
}

export default Register;
