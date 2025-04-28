"use client";
import Register from "@/components/auth/auth.register";
import Login from "@/components/auth/auth.signin";
import { useState } from "react";
import SwitchTheme from "@/components/switchbtn/switch.btn";
import LocalSwitcher from "@/components/SwitchLangue/switcherLangue";
import Link from "next/link";

function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Register/>
        </div>
    );
}
export default LoginPage;