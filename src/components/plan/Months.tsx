// components/Months.tsx
"use client";
import { useMonthStore } from "@/store/planner/monthStore";
import { useToggleStore } from "@/store/toggleStore";
import { useEffect, useRef, useState } from "react";
import SelectMonth from "../select/SelectMonth";
import { Button } from "../ui/Button";
import LabelledInput from "../ui/LabelledInput";
import Weeks from "./Weeks";
import { ArrowDownAZ, ChevronDown, ChevronRight, Pen, Plus } from "lucide-react";

const Months = ({ yearid }: { yearid: string }) => {
    const { getMonth, monthMap, createMonth } = useMonthStore();
    const { toggleOpen, isOpen } = useToggleStore();
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [selectedMonth, setSelectedMonth] = useState<string>("");

    const monthRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getMonth(yearid);
    }, [yearid]);
    const months = monthMap[yearid];


    const handleMonthCreate = async () => {
        const title = monthRef.current?.value
        const description = descriptionRef.current?.value

        await createMonth(selectedMonth, description, yearid)

        if (monthRef.current) monthRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";
        setIsCreating(false)
    }
    return (
        <div className="ml-8 flex flex-col gap-2 p-2 rounded-b-xl">
            <div className="">
                {!isCreating ?
                    <div className=" w-full flex pr-12 gap-4    justify-end">

                        <Button onclick={() => { setIsCreating(true) }} variant="primary" size="sm" styles="cursor-pointer" startIcon={<Pen className="size-4" />} />

                        <Button variant="primary" size="sm" styles="cursor-pointer" startIcon={<Plus className="size-4" />} />

                    </div> : <div className='flex gap-2 items-center justify-center'>
                        <div className="flex gap-2  ">
                            <SelectMonth onChange={setSelectedMonth} value={selectedMonth} label="Select Month" />
                            <LabelledInput inputRef={descriptionRef} placeholder='description' type='text' />
                        </div>
                        <Button onclick={handleMonthCreate} variant='primary' size='sm' text='create' />
                    </div>
                }
            </div>

            {months?.map((item: any, index: number) => {
                const open = isOpen(item.id);
                return (
                    <div key={item.id} className="flex flex-col rounded-xl">
                        <div onClick={() => toggleOpen(item.id)}
                            className="cursor-pointer flex justify-between items-center bg-amber-800 rounded-xl p-2">
                            <div className="flex gap-2 items-center ">
                                <span>
                                    {
                                        open ? <ChevronDown /> : <ChevronRight />
                                    }
                                </span>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                            <div className="flex  gap-2 ">


                            </div>
                        </div>
                        <div>{open && <Weeks monthId={item.id} />}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Months;
