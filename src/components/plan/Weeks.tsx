// components/Weeks.tsx
"use client";
import { useWeekStore } from "@/store/planner/weekStore";
import { useToggleStore } from "@/store/toggleStore";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import LabelledInput from "../ui/LabelledInput";
import Days from "./Days";
import { ChevronDown, ChevronRight, Pen, Plus } from "lucide-react";
import { motion } from "motion/react";

const Weeks = ({ monthId }: { monthId: string }) => {
    const { getWeek, weekMap, createWeek } = useWeekStore();
    const { toggleOpen, isOpen } = useToggleStore()
    const [isCreating, setIsCreating] = useState<Boolean>(false);


    const weekRef = useRef<HTMLInputElement>(null)
    const weekDescRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getWeek(monthId);
    }, [monthId]);

    const weeks = weekMap[monthId];
    const handleWeekCreate = async () => {
        const title = weekRef.current?.value;
        const desc = weekDescRef.current?.value;
        createWeek(title, desc, monthId)
        if (weekRef.current) weekRef.current.value = "";
        if (weekDescRef.current) weekDescRef.current.value = "";
        setIsCreating(false)
    }

    return (
        <div className="ml-8 flex flex-col gap-2 p-2">

            <div className="">
                {!isCreating ?
                    <div className=" w-full flex pr-12 gap-4    justify-end">
                        <Button onclick={() => { setIsCreating(true) }} variant="primary" size="sm" styles="cursor-pointer" startIcon={<Pen className="size-4" />} />
                        <Button variant="primary" size="sm" styles="cursor-pointer" startIcon={<Plus className="size-4" />} />
                    </div> : <div className='flex gap-2 items-center justify-center'>
                        <div className="flex gap-2  items-center ">
                            <LabelledInput inputRef={weekRef} placeholder='Enter week' type='text' />
                            <LabelledInput inputRef={weekDescRef} placeholder='Enter description' type='text' />
                        </div>
                        <Button onclick={handleWeekCreate} variant='primary' size='sm' text='create ' />
                    </div>
                }
            </div>
            {weeks?.map((item: any, index: number) => {
                const open = isOpen(item.id)
                return (
                    <div
                        key={item.id}
                        className="cursor-default"
                    >
                        <motion.div onClick={() => toggleOpen(item.id)}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 * index / 2 }}
                            className="cursor-pointer flex gap-4  items-center bg-purple-800 rounded-xl p-2">
                            <span>
                                {
                                    open ? <ChevronDown /> : <ChevronRight />
                                }
                            </span>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </motion.div>
                        <div>{open && <Days weekId={item.id} />}</div>

                    </div>
                )
            }
            )}
        </div>
    );
};

export default Weeks;
