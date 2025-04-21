"use client";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import SwitchTheme from "@/components/switchbtn/switch.btn";
import { useThemeContext } from "@/library/ThemeProvider";
import LocalSwitcher from "../SwitchLangue/switcherLangue";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";


async function fetchData(url: string, body: any) {
  // You can await here
  try {
    const response: AxiosResponse = await axios.post(url, {}, body);

    return response.data;
  } catch (error: any) {
    return {
      statusCode: error?.response?.data?.statusCode ?? 400,
      error: error?.response?.data?.error ?? "error",
      message: error?.response?.data?.message ?? "message",
    };
  }
}
type Callback = () => void;
function NavigateHome() {
  const { data: session, status, update } = useSession();
  //@ts-ignore
  const localActive = useLocale();
  let current = usePathname();
  const handleLogout = async () => {
    const response = await fetchData(
      "http://localhost:8000/api/v1/auth/logout",
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    ); //token
    //call api by token =>user

    if (response.error) {
      alert(response.message);
    } else {
      signOut();
    }
  };

  const Setting = ({ isShow = false }) => {
    return (
      <div className="relative  ml-2">
        <button
          className={`setting-button font-medium ${
            isShow ? "text-black" : "text-[#3D8D7A]"
          } dark:text-gray-200 px-4 py-2 rounded-md w-full `}
          onClick={() => {
            const settingMenu = document.querySelector(".setting-menu");
            //@ts-ignore
            settingMenu.classList.toggle("hidden");
          }}
        >
          Setting
        </button>
        <div className="setting-menu hidden  bg-white dark:bg-[#4b5563] dark:border shadow-lg  rounded-l-md rounded-b-md  fixed top-[80px] right-[1px] w-[180px] overflow-hidden">
          <h3 className="text-lg font-small dark:text-gray-200 border-b  px-3 py-[4px]  cursor-default">
            Setting Options
          </h3>
          <ul className=" ">
            <li className="text-lg py-[5px] flex justify-end items-end border-b pr-3">
              <SwitchTheme />
            </li>
            <li className="text-lg py-[4px] pl-4 border-b pr-3">
              <LocalSwitcher></LocalSwitcher>
            </li>

            <li className=" border-b text-lg w-full ">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="block w-full bg-[#cccccc98] text-center"
                >
                  Log out
                </button>
              ) : (
                <Link
                  href={`/${localActive}/auth/login`}
                  className="block w-full bg-[#cccccc65] hover:bg-[#cccccc48] dark:hover:bg-[#35323243] text-center py-1"
                >
                  Sign up
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <header>
      {/* <div className="flex z-50 items-center h-[80px] fixed top-0 left-0 right-0  bg-[#ffc289] dark:bg-[#9e9e9e]"> */}
      <div className="flex justify-between items-center h-[80px] fixed top-0 left-0 right-0 bg-[#FBFFE4] dark:bg-[#9e9e9e] z-50 px-4">
        {/* <div className="flex text-xl mr-8 items-center relative w-full sm:ml-auto md:text-2xl md:justify-end lg:text-3xl  "> */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-[#3D8D7A] dark:text-white">Yolo Farm</span>
        </div>
        
        <div className="flex-grow flex justify-center space-x-6 text-sm md:text-base lg:text-lg">
          <Link
            className="text-[#3D8D7A] font-medium sm:ml-3 md:ml-8  ml-2 dark:text-gray-200 mt-2"
            href={`/${localActive}`}
          >
            Trang chủ
          </Link>
          {/* <Link
            className="text-black dark:text-gray-200 font-medium sm:ml-3 md:ml-8  ml-2"
            href={`/${localActive}/menu`}
          >
            Menu
          </Link> */}
          <Link
            className="text-[#3D8D7A] dark:text-gray-200 font-medium sm:ml-3 md:ml-8  ml-2 mt-2"
            href={`/${localActive}/menu`}
          >
            Thiết bị
          </Link>
          <Link
            className="text-[#3D8D7A] dark:text-gray-200 font-medium sm:ml-3 md:ml-8  ml-2 mt-2"
            href={`/${localActive}/menu`}
          >
            Trạng thái
          </Link>
          <Link
            className="text-[#3D8D7A] dark:text-gray-200 font-medium sm:ml-3 md:ml-8  ml-2 mt-2"
            href={`/${localActive}/menu`}
          >
            Thông báo
          </Link>
          
        </div>
        
        <div className="ml-4">
          <Link
            className="text-[#3D8D7A] dark:text-gray-200 font-medium sm:ml-3 md:ml-8 ml-2 mt-2"
            href={`/${localActive}/profile`}
          >
            Hồ sơ
          </Link>
          {/*Tên + Avatar*/}
          {/* {session?.user && (
            <div className="flex items-center space-x-2">
              <img
                src={session.user.image || "/default-avatar.png"} // fallback nếu không có avatar
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-[#3D8D7A] dark:text-white hidden sm:block">
                {session.user.name || "User"}
              </span>
            </div>
          )} */}

            <Setting />
          </div>
      </div>
    </header>
  );
}

export default NavigateHome;
