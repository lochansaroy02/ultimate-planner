"use client";
import { useYearStore } from "@/store/planner/yearStore";
import { useToggleStore } from "@/store/toggleStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import SelectYear from "../select/SelectYear";
import { Button } from "../ui/Button";
import LabelledInput from "../ui/LabelledInput";
import Months from "./Months";
import { Geist } from "next/font/google";



const Year = () => {
    const { getYear, yearData, createYear } = useYearStore();
    const { toggleOpen, isOpen } = useToggleStore();
    const { userData } = useUserStore();
    const [isCreating, setIsCreating] = useState(false)
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const handleCreateYear = () => {
        createYear(title, desc, userData?.userId)
        setTitle("")
        setDesc("")
        setIsCreating(false);
    }

    useEffect(() => {
        if (userData?.userId) {
            getYear(userData.userId);
        }
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
                    <div className="flex gap-2 ">
                        <SelectYear value={title} onChange={setTitle} label="Select Year" />
                        <LabelledInput onChange={(e) => {
                            setDesc(e.target.value)
                        }} lable='description' value={desc} placeholder='Enter year' type='text' />
                        <Button onclick={handleCreateYear} variant="primary" size="sm" text="create Year" />
                    </div>
                }
            </div>
            {
                yearData && yearData?.slice()?.reverse()?.map((item: any) => {
                    const open = isOpen(item?.id);
                    return (
                        <div key={item.id} className="flex flex-col rounded-xl">
                            <div
                                className="bg-neutral-700 p-2 justify-between flex rounded-xl cursor-pointer"
                                onClick={() => toggleOpen(item.id)}>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-lg">{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </div>
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
