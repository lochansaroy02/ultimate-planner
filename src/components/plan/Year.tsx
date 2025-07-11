"use client";
import { useEffect, useRef, useState } from "react";
import { useYearStore } from "@/store/planner/yearStore";
import { useMonthStore } from "@/store/planner/monthStore";
import { useToggleStore } from "@/store/toggleStore";
import Months from "./Months";
import { Button } from "../ui/Button";

const Year = () => {
    const { getYear, yearData } = useYearStore();
    const { toggleOpen, isOpen } = useToggleStore();

    const [isCreating, setIsCreating] = useState(false)


    useEffect(() => {
        getYear("4a6c95a1-c94e-4fe6-affb-b7dbe48e46aa"); // update with real user ID
    }, []);
    const ref = useRef(null)

    return (
        <div className="flex flex-col mt-4  w-full gap-4">
            {yearData.slice().reverse()?.map((item: any) => {
                const open = isOpen(item.id);
                return (
                    <div key={item.id} className="flex flex-col rounded-xl">


                        <div
                            className="bg-emerald-700 p-2  justify-between flex rounded-xl cursor-pointer"
                            onClick={() => toggleOpen(item.id)}>
                            <div>
                                <h1 className="text-2xl">{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                            <div className="flex items-center  gap-2 ">
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
