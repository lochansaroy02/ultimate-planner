"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const page = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const router = useRouter();
  return (
    <div className="flex items-center flex-col h-screen ">
      <div className="mt-24 flex flex-col gap-4   items-center ">
        <h1 className="text-4xl">Ultimate Planner</h1>
        <div className="flex gap-3">
          <Button onclick={() => {
            router.push("/home")
          }} variant="primary" size="md" text="Home" />
        </div>
      </div>
    </div >
  )
}

export default page