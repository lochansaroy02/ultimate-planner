"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const page = () => {

  const router = useRouter();
  return (
    <div className="flex items-center flex-col h-screen ">
      <div className="mt-24 flex flex-col gap-4   items-center ">
        <h1 className="text-4xl">Ultimate Planner</h1>
        <div className="flex gap-3">
          <Button onclick={() => {
            router.push("/signup")
          }} variant="primary" size="md" text="SignIn" />
          <Button onclick={() => {
            router.push("/main")
          }} variant="primary" size="md" text="main" />
        </div>
      </div>
    </div >
  )
}

export default page