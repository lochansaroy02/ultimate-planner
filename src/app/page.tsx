"use client";

import { Button } from "@/components/ui/Button";
import { useTaskStore } from "@/store/planner/taskStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const page = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const router = useRouter();
  const { getAllTask, allTasks } = useTaskStore()
  useEffect(() => {
    getAllTask()
  }, [])
  return (
    <div className="flex items-center flex-col h-screen ">
      <div className="mt-24 flex flex-col gap-4   items-center ">
        <h1 className="text-4xl">Ultimate Planner</h1>
        <div className="flex gap-3">
          <Button onclick={() => {
            router.push("/home")
          }} variant="primary" size="md" text="Home" />
          <Button onclick={() => {
            router.push("/register")
          }} variant="primary" size="md" text="Register" />
        </div>
      </div>
      <div className="mt-8  w-1/2  ">
      </div>
    </div >
  )
}

export default page