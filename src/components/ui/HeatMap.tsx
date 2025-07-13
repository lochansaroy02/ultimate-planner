import React from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import isLeapYear from "dayjs/plugin/isLeapYear";
dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(isLeapYear);

type HeatmapProps = {
    data: Record<string, number>; // {"2025-01-01": 2, ...}
    maxCount?: number;
};

const Heatmap: React.FC<HeatmapProps> = ({ data, maxCount = 5 }) => {
    const today = dayjs();
    const startDate = dayjs().startOf("year").startOf("week");

    const generateDates = () => {
        const dates: string[] = [];
        let curr = startDate;

        while (curr.isBefore(today)) {
            dates.push(curr.format("YYYY-MM-DD"));
            curr = curr.add(1, "day");
        }

        return dates;
    };

    const getColor = (count: number) => {
        if (count === 0) return "bg-gray-200";
        if (count === 1) return "bg-green-100";
        if (count === 2) return "bg-green-300";
        if (count === 3) return "bg-green-500";
        if (count >= 4) return "bg-green-700";
        return "bg-gray-100";
    };

    const dates = generateDates();
    const weeks: string[][] = [];

    for (let i = 0; i < dates.length; i += 7) {
        weeks.push(dates.slice(i, i + 7));
    }

    return (
        <div className="flex gap-1  p-2 w-fit rounded-lg bg-neutral-800 shadow-md">
            {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => {
                        const count = data[day] || 0;
                        return (
                            <div
                                key={di}
                                className={`w-2 h-2 rounded-full ${getColor(count)} tooltip`}
                                title={`${day}: ${count} task${count !== 1 ? "s" : ""}`}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Heatmap;
