"use client";

import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const Header = () => {
    const [token, setToken] = useState<string | null>("");
    const router = useRouter()
    const { isLoggedIn } = useUserStore()


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);
    return (
        <div className='bg-neutral-950 w-1/2  flex justify-center  border border-neutral-200   fixed h-10 rounded-2xl px-4 py-2  top-2 left-1/4'>

            <div className="flex items-center justify-between w-full ">
                <h1 className="text-sm ">
                    Ultimate Planner
                </h1>
                <Button onclick={() => {
                    if (token) {
                        router.push("/login")
                    } else {
                        router.push("/login")
                    }
                }} variant="primary" styles="rounded-2xl text-xs cursor-pointer" size="sm" text={token ? "logout" : "login"} />
            </div>
        </div>
    )
}

export default Header