"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import QuickNoti from "@/components/quicknotication/quicknoti";
import Card from "./deviceCard/homeDeviceCard";
function MainHome() {
  const { data: session } = useSession();
  const { status } = useSession({
    required: false,
  });
  const t = useTranslations("HomePage");
  //@ts-ignore
  //sd ->session



  return (
    <div className="flex flex-col ">
    <QuickNoti/>
    <Card/>
    </div>
    
  );
}

export default MainHome;
