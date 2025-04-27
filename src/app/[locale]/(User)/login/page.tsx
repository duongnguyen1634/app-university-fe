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
        <Login />
        </div>
    );
}
export default LoginPage;