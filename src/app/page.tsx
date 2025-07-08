"use client";

import { Button } from "@/components/ui/Button";
import { usePlanStore } from "@/store/plannerStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {

  const router = useRouter();
  const { getPlan, createPlan, planData } = usePlanStore()
  console.log(planData);
  useEffect(() => {
    getPlan();
  }, [])
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