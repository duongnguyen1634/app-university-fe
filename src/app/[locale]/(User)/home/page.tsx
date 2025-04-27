"use client";
import { useSession } from "next-auth/react";
import Header from "../../../../components/header/header";
import Loading from "../../../../components/Loadingpage/loading";
import Navigate from "../../../../components/navigate/navigate";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Device} from "../../../../components/data/device";
import QuickNoti from "@/components/quicknotication/quicknoti";
import Card from "@/components/devicecrad/homeDeviceCard";
import Modal from "@/components/devicecrad/createDeviceCard";
import Image from 'next/image';



function CmpHome() {
  const { status, data: session } = useSession({ required: false });
  const accessToken = localStorage.getItem("access_token");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!accessToken ? (
        <div className="flex flex-col text-center justify-center bg-mau3 p-5 items-center h-screen w-screen gap-5">
          <h1 className="text-mau1 font-josefin text-3xl font-bold">HÃY ĐĂNG NHẬP ĐỂ SỬ DỤNG</h1>
          <div>
            <Link href="/login">
              <button className="ml-4 px-6 py-5 bg-mau1 text-white rounded-xl font-josefin text-2xl">
                Đi đến Login
              </button>
            </Link>
          </div>
        </div>
      ) : status === "loading" ? (
        <Loading />
      ) : (
        <div className="h-screen w-screen flex flex-col justify-between p-0">
          <Header/>
          <div className="flex flex-col bottom-0">
          <QuickNoti/>
          <Card/>
          </div>
          <Navigate />
        </div>
      )}
    </>
  );
}

export default CmpHome;
