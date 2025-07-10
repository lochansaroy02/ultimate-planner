// components/Weeks.tsx
"use client";
import { useWeekStore } from "@/store/planner/weekStore";
import { useEffect } from "react";
import { Button } from "../ui/Button";

const Weeks = ({ monthId }: { monthId: string }) => {
    const { getWeek, weekMap } = useWeekStore();

    useEffect(() => {
        getWeek(monthId);
    }, [monthId]);

    const weeks = weekMap[monthId];

    return (
        <div className="ml-8 flex flex-col gap-2 p-2">
            {weeks?.map((item: any) => (
                <div
                    key={item.id}
                    className="bg-purple-600 flex items-center justify-between p-2 rounded text-white cursor-default"
                >
                    <div>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                    </div>
                    <div className="flex  gap-2 ">
                        <Button variant="primary" size="sm" text="create Goal" />
                        <Button variant="primary" size="sm" text="create Week" />

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Weeks;
