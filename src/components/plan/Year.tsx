"use client";
import { useEffect } from "react";
import { useYearStore } from "@/store/planner/yearStore";
import { useMonthStore } from "@/store/planner/monthStore";
import { useToggleStore } from "@/store/toggleStore";
import Months from "./Months";
import { Button } from "../ui/Button";

const Year = () => {
    const { getYear, yearData } = useYearStore();
    const { toggleOpen, isOpen } = useToggleStore();

    useEffect(() => {
        getYear("4a6c95a1-c94e-4fe6-affb-b7dbe48e46aa"); // update with real user ID
    }, []);

    return (
        <div className="flex flex-col w-full gap-4">
            {yearData?.years?.map((item: any) => {
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
                                <Button variant="primary" size="sm" text="create Goal" />
                                <Button variant="primary" size="sm" text="Create month" />
                            </div>
                        </div>
                        {open && <Months yearid={item.id} />}
                    </div>
                );
            })}
        </div>
    );
};

export default Year;
