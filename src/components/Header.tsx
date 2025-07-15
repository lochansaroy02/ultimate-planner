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
        <div className='bg-neutral-950 w-1/2  flex justify-center items-center border border-neutral-200   fixed h-10 rounded-2xl px-4 py-2  top-2 left-1/4'>
            <h1 className="text-sm ">
                <Button onclick={() => {
                    if (token) {
                        router.push("/login")
                    } else {
                        router.push("/login")
                    }
                }} variant="primary" size="sm" text={token ? "logout" : "login"} />
            </h1>
        </div>
    )
}

export default Header