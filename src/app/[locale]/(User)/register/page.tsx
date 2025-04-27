"use client";
import Register from "@/components/auth/auth.register";
import Login from "@/components/auth/auth.signin";
import { useState } from "react";
import SwitchTheme from "@/components/switchbtn/switch.btn";
import LocalSwitcher from "@/components/SwitchLangue/switcherLangue";
import Link from "next/link";

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    
    const handleToggle = () => {
        setIsLogin(!isLogin);
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen">
        {isLogin ? <Register/> : <Login/>}
        <div className="absolute top-[100px] right-4 bg-mau3 rounded-md p-2 shadow-lg">
            <Link href="/login">
            <button
            className=" hover:underline"
            onClick={handleToggle}>
                Đăng nhap
            </button>
            </Link>
            
        </div>
        
        <div className="absolute top-[15px] right-4">
          <SwitchTheme />
        </div>
        <div className="absolute top-[55px] right-4">
          <LocalSwitcher />
        </div>
        </div>
    );
}
export default LoginPage;