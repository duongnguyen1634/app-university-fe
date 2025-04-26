"use client";
import { useSession } from "next-auth/react";
import Header from "../../../../components/header/header";
import Loading from "../../../../components/Loadingpage/loading";
import Navigate from "../../../../components/navigate/navigate";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Device} from "../../../../components/data/device";
// import QuickNoti from "@/components/quicknotication/quicknoti";
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
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold">Please login to access this page</h1>
          <div>
            <Link href="/login">
              <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go to Login
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
          <Card/>
            {/* <QuickNoti/> */}
            
          </div>
          <Navigate />
        </div>
      )}
    </>
  );
}

export default CmpHome;
