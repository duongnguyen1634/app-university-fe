"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toast } from "primereact/toast";
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

      // Save username and email
      if (data.data.user.name && data.data.user.email) {
        localStorage.setItem("username", data.data.user.name);
        localStorage.setItem("email", data.data.user.email);
      } else {
        console.error("Username or email is missing in the response");
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
    <div>
      <h1 className="text-4xl text-[#3D8D7A] font-josefin font-black text-start">
        Yolo Farm
      </h1>
      <h2 className="text-4xl text-[#3D8D7A] font-josefin font-black text-start">
        Welcome!
      </h2>
      <p className="text-black text-xl w-full mt-3 font-dosis">
        {t("title1")}
        <Link href="/auth/register" className="font-bold text-[#3D8D7A]">
          {t("title2")}
        </Link>
        {t("title3")}
      </p>
    </div>
  );

  const formInput = () => (
    <div>
      <div className="w-full gap-2 m-2">
        <label htmlFor="Username" className="text-lg font-josefin block mb-1">
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
      <div className="w-full gap-2 m-2">
        <label htmlFor="Password" className="text-lg block mb-1 font-josefin">
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
    </div>
  );

  const footerLogin = () => (
    <button
      className="p-2 block border-none rounded-[50px] mb-[10px] w-full mx-auto text-xl text-white font-josefin bg-[#3D8D7A] hover:opacity-70 mt-10"
      onClick={handleSubmit}
    >
      Login
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
          {footerLogin()}
        </div>
      </div>
    </div>
  );
}

export default Login;
