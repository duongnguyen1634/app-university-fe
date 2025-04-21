"use client";
import { useSession } from "next-auth/react";
import MainHome from "./bodyHome/mainHome";
import NavigateHome from "../header/header";
import Loading from "../Loadingpage/loading";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/library/ThemeProvider";

function CmpHome() {
  const { status } = useSession({
    required: false,
  });

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div>
          <NavigateHome />
          <MainHome />
          <Footer/>
        </div>
      )}
    </>
  );
}

export default CmpHome;
