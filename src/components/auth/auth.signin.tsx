"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Toast } from "primereact/toast";
import logo from "../../../public/image/greenhouse2.jpg";

import { useTranslations } from "next-intl";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errUser, setErrUser] = useState("");
  const [errpass, setErrpass] = useState("");
  const router = useRouter();
  const toast = useRef(null);
  const t = useTranslations("LoginPage");

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
    if (!username || !password) {
      showError("Please complete your username and password");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        showError(data.message || "Login failed");
        return;
      }
  
      // Save tokens
      localStorage.setItem("access_token", data.data.token.access_token);
      localStorage.setItem("refresh_token", data.data.token.refresh_token);
  
      console.log("Login successful", data);
  
      setUsername("");
      setPassword("");
      router.push("/");
    } catch (error) {
      console.error(error);
      showError("Something went wrong. Please try again.");
    }
  };

  const headertitle = () => (
    <div className="pl-5 pt-0 h-[160px] sm:pl-3 sm:mb-0 sm:h-[240px] sm:pt-6 lg:h-[165px] lg:pt-3 xl:mb-4 xl:ml-0 xl:h-[180px] 2xl:pt-4 2xl:mb-5">
      <h1 className="font-josefin font-extrabold text-4xl m-4 text-[#3D8D7A] text-start ml-4 sm:ml-3 sm:text-4xl lg:ml-0 lg:text-3xl 2xl:mb-2 dark:text-[#FBFFE4]">
        Yolo Farm
      </h1>
      <h2 className="text-4xl lg:text-3xl text-[#3D8D7A] font-black text-start ml-4 sm:ml-3 sm:mt-2 lg:ml-0 lg:mt-0 dark:text-white">
        Welcome!
      </h2>
      <p className="text-black text-xl sm:text-lg w-[380px] dark:sm:text-white sm:text-black sm:w-[300px] ml-4 sm:ml-3 mt-3 h-[40px] block sm:mt-5 lg:mt-0 xl:mt-2 lg:ml-0 dark:text-white">
        {t("title1")}
        <Link href="/auth/register" className="font-bold dark:text-[#FBFFE4] pl-1 pr-1">
          {t("title2")}
        </Link>
        {t("title3")}
      </p>
    </div>
  );

  const formInput = () => (
    <div className="lg:mt-3 xl:mt-8">
      <div className="xl:mt-7 ml-3 w-full pl-7 pr-14 sm:px-0">
        <label htmlFor="Username" className="text-lg sm:text-base font-semibold block mb-1 xl:text-base dark:text-white">
          Email
        </label>
        <input
          type="text"
          id="Username"
          placeholder="Enter Email..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={username}
          autoFocus
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              setErrUser("");
            } else {
              setErrUser("Username is required");
            }
            setUsername(e.target.value);
          }}
        />
        <span className="text-red-500 mt-1 block">{errUser}</span>
      </div>
      <div className="sm:mt-4 lg:mt-3 ml-3 w-full xl:mt-[6px] pl-7 pr-14 sm:px-0">
        <label htmlFor="Password" className="text-lg sm:text-base dark:text-white block mb-1 font-semibold xl:text-base">
          Password
        </label>
        <input
          type="password"
          id="Password"
          placeholder="Enter Password..."
          className="border w-full px-2 py-1 focus:outline-none rounded-md"
          value={password}
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              setErrpass("");
            } else {
              setErrpass("Password is required");
            }
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <span className="text-red-500 mt-1 block">{errpass}</span>
      </div>
      <h2 className="w-[85%] sm:w-full text-xl sm:text-lg text-end text-black sm:text-gray-500 ml-4 mt-[10px] hover:text-blue-500 cursor-pointer dark:text-white">
        {t("forget")}
      </h2>
    </div>
  );

  const footerLogin = () => (
    <>
      <button
        className="block border-none rounded-[50px] mb-[10px] w-[60%] mx-auto text-xl text-white font-semibold bg-[#3D8D7A] hover:opacity-70 mt-10 dark:bg-[#FBFFE4] dark:text-black"
        onClick={handleSubmit}
      >
        Login
      </button>
    </>
  );

  const imgright = () => (
    <Image src={logo} className="xl:object-cover rounded-xl mt-20" alt="" />
  );

  return (
    <div className="flex justify-center items-center h-screen bg-mau1">
      <div className="card flex justify-content-center" style={{ height: "30px !important" }}>
        <Toast ref={toast} position="bottom-right" />
      </div>
      <div className="relative dark:bg-gray-600 bg-white overflow-hidden  px-10 shadow-lg rounded-md flex justify-center items-center ">
        <div>
          {headertitle()}
          {formInput()}
          {footerLogin()}
        </div>
        <div className="mx-10 my-10 dark:bg-gray-600 overflow-hidden hidden lg:block w-[50%]">
          {imgright()}
        </div>
      </div>
    </div>
  );
}

export default Login;
