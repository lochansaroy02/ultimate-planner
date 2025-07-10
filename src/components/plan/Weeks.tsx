// components/Weeks.tsx
"use client";
import { useWeekStore } from "@/store/planner/weekStore";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import { useToggleStore } from "@/store/toggleStore";
import Days from "./Days";

const Weeks = ({ monthId }: { monthId: string }) => {
    const { getWeek, weekMap } = useWeekStore();
    const { toggleOpen, isOpen } = useToggleStore()

    useEffect(() => {
        getWeek(monthId);
    }, [monthId]);

    const weeks = weekMap[monthId];

    return (
        <div className="ml-8 flex flex-col gap-2 p-2">
            {weeks?.map((item: any) => {
                const open = isOpen(item.id)
                return (
                    <div
                        key={item.id}
                        className="cursor-default"
                    >
                        <div onClick={() => toggleOpen(item.id)}
                            className="cursor-pointer flex justify-between items-center bg-purple-800 rounded-xl p-2">
                            <div>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                            <div className="flex  gap-2 ">
                                <Button variant="primary" size="sm" text="create Goal" />
                                <Button variant="primary" size="sm" text="create Week" />
                            </div>
                        </div>
                        <div>{open && <Days weekId={item.id} />}</div>

                    </div>
                )
            }
            )}
        </div>
    );
};

export default Weeks;
