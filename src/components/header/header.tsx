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
import { Avatar } from 'primereact/avatar';  
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
function Header() {

    const [userName, changeName] = useState('Thinh')
    const [userPic, changePic] = useState('https://i.pinimg.com/736x/d6/c4/2e/d6c42efdf2446dd05a722c6e8c325297.jpg');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [login, changeUi] = useState(true);

    // const UserIcon = (login : boolean) => {
    //   if (login) {
    //     return(
    //       <Link href={"/login"} className="contents"><img src= {userPic} width={40}height={40}/></Link>
    //     )
    //   } else{
    //     <Link href={"/login"} className="contents"><img src= {userPic} width={40}height={40}/></Link>
    //   }
    // }
 
    useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        setIsLoggedIn(true);
    }
    },[]);

  return (
    <header className="sticky top-0 left-0 w-full">
      <div className=' bg-mau3 flex flex-wrap justify-between px-5 py-2 rounded-b-2xl relative' >
        <div className='flex justify-center flex-col'>
          <h1 className="font-josefinsan font-extrabold text-15 text-mau1">
            <Link href={"/"}>Yolo<br/>Farm</Link>
          </h1>               
        </div>                    
        <div className="flex flex-wrap flex-row gap-3">
                    <div className="text-right flex flex-col justify-evenly font">
                        <p className="text-mau1 text-15 font-bold font-dosis">
                            {isLoggedIn ? "Welcome back!" : "Guest"}
                        </p>
                        <p className="text-mau1 text-12 font-extralight font-dosis">
                            {isLoggedIn ? "Hello!" : "Please log in"}
                        </p>
                    </div>
                       
                {/* <div className='flex flex-wrap flex-row gap-3'>
                    <div className=' text-right flex flex-col justify-evenly font'>
                        <p className='text-mau1 text-15 font-bold font-dosis'>{userName}</p>
                        <p className='text-mau1 text-12 font-extralight font-dosis '>Heloo!</p>
                    </div > */}
    
                    <div className="flex flex-col justify-center items-center">
                      <div className=" border-2 border-mau1 rounded-2xl object-cover">
                      <Link href={isLoggedIn ? "/profile" : "login"} className="contents"><img src= {userPic} width={40}height={40}className="rounded-2xl object-cover"/></Link>
                      </div>
                    </div>
                </div>
            </div>

    </header>
  );

}

export default Header;
