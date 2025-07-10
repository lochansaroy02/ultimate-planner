// components/Months.tsx
"use client";
import { useEffect } from "react";
import { useMonthStore } from "@/store/planner/monthStore";
import Weeks from "./Weeks";
import { useToggleStore } from "@/store/toggleStore";
import { Button } from "../ui/Button";

const Months = ({ yearid }: { yearid: string }) => {
    const { getMonth, monthMap } = useMonthStore();
    const { toggleOpen, isOpen } = useToggleStore();

    useEffect(() => {
        getMonth(yearid);
    }, [yearid]);

    const months = monthMap[yearid]; // ✅ Scoped by year

    return (
        <div className="ml-8 flex flex-col gap-2 p-2 rounded-b-xl">
            {months?.map((item: any, index: number) => {
                const open = isOpen(item.id);
                return (
                    <div key={item.id} className="flex flex-col rounded-xl">
                        <div onClick={() => toggleOpen(item.id)}
                            className="cursor-pointer flex justify-between items-center bg-amber-800 rounded-xl p-2">
                            <div>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                            <div className="flex  gap-2 ">
                                <Button variant="primary" size="sm" text="create Goal" />
                                <Button variant="primary" size="sm" text="create Week" />

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
