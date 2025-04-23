"use client";
import { useSession } from "next-auth/react";
import MainHome from "./bodyHome/mainHome";
import Header from "../header/header";
import Loading from "../Loadingpage/loading";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/library/ThemeProvider";
import Navigate from "../navigate/navigate";

function CmpHome() {
  const { status } = useSession({
    required: false,
  });

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div >
          <Header/>
          <MainHome />
          <Navigate/>
        </div>
      )}
    </>
  );
}

export default CmpHome;
