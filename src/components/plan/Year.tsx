"use client";
import { useYearStore } from "@/store/planner/yearStore";
import { useToggleStore } from "@/store/toggleStore";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Pen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import SelectYear from "../select/SelectYear";
import { Button } from "../ui/Button";
import LabelledInput from "../ui/LabelledInput";
import Months from "./Months";


const Year = () => {
    const { getYear, yearData, createYear } = useYearStore();
    const { toggleOpen, isOpen } = useToggleStore();
    const { userData, loadUserFromToken } = useUserStore();
    const [isCreating, setIsCreating] = useState(false)
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const [isMonthCreating, setIsMonthCreating] = useState<boolean>(false)
    const handleCreateYear = () => {

        userData && createYear(title, desc, userData?.userId)
        setTitle("")
        setDesc("")
        setIsCreating(false);
    }

    useEffect(() => {
        loadUserFromToken()
    }, [])

    useEffect(() => {
        userData?.userId && getYear(userData?.userId);
    }, [userData]);


    return (
        <div className="flex flex-col mt-4   w-full gap-4">
            <div className="flex flex-col">

                {!isCreating ?
                    <div className="  flex justify-end pr-8 ">
                        <Button onclick={() => {
                            setIsCreating(true)
                        }} variant="primary" size="sm" text="create Year" />
                    </div>
                    :
                    <div className="flex lg:flex-row flex-col gap-2 items-center ">
                        <SelectYear value={title} onChange={setTitle} label="Select Year" />
                        <LabelledInput onChange={(e) => {
                            setDesc(e.target.value)
                        }} lable='description' value={desc} placeholder='Enter year' type='text' />
                        <Button onclick={handleCreateYear} variant="primary" size="sm" text="create Year" />
                    </div>
                }
            </div>
            {
                yearData && yearData?.slice()?.reverse()?.map((item: any, index: number) => {
                    const open = isOpen(item?.id);
                    return (
                        <div key={item.id} className="flex flex-col rounded-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 * index / 2 }}
                                className="bg-neutral-700 p-2 justify-between flex rounded-xl cursor-pointer"
                                onClick={() => toggleOpen(item.id)}>
                                <div className="flex items-center w-full   justify-between gap-4">
                                    <div className="flex items-center  gap-2 ">
                                        <span>
                                            {
                                                open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />
                                            }
                                        </span>
                                        <div className="flex items-center gap-4 ">
                                            <h1 className="text-lg">{item?.title}</h1>
                                            <p>{item?.description}</p>
                                        </div>
                                    </div>
                                    {
                                        <div className=" pr-12 gap-4  flex   justify-end">
                                            <Button onclick={() => {
                                            }} variant="primary" size="sm" styles="cursor-pointer" startIcon={<Pen className="size-4" />} />
                                            <Button variant="primary" size="sm" styles="cursor-pointer" startIcon={<Plus className="size-4" />} />
                                        </div>
                                    }
                                </div>
                            </motion.div>


                            <div className="ml-8">

                            </div>
                            {
                                open &&
                                <Months yearid={item.id} />}
                        </div>
                    );
                })}
        </div>
    );
};

export default Year;
