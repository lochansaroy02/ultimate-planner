"use client";

import Plan from '@/components/plan/Plan';
import Progress from '@/components/Progress';
import CircularGauge from '@/components/ui/CircularGauge';
import { useYearStore } from '@/store/planner/yearStore';
import { useIsGoalStore } from '@/store/store';
import { useEffect, useState } from 'react';

const page = () => {

    const [thisYear, setThisYear] = useState<String>("");
    const [yearDecription, setYearDescription] = useState<string>("");
    const [monthDecription, setMonthDescription] = useState<string>("");
    const [weekDecription, setWeekDescription] = useState<string>("");
    const [dayDecription, setDayDescription] = useState<string>("");


    const [month, setMonth] = useState<String>("");
    const [week, setWeek] = useState<String>("");

    const [isYear, setIsYear] = useState<boolean>(false)
    const [createMonth, setCreateMonth] = useState<boolean>(false)
    const [createWeek, setCreateWeek] = useState<boolean>(false)
    const [createDay, setCreateDay] = useState<boolean>(false)

    const [isYearGoal, setIsYearGoal] = useState<boolean>(false)
    const [isMonthGoal, setIsMonthGoal] = useState<boolean>(false)
    const [isWeekGoal, setIsWeekGoal] = useState<boolean>(false)
    const [isDayGoal, setIsDayGoal] = useState<boolean>(false)


    const { isGoal, setIsGoal } = useIsGoalStore();
    const { yearData, getYear, createYear, isDescription } = useYearStore();

    const now = new Date();

    const getWeekOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

        const week = Math.ceil((date.getDate() + dayOfWeek) / 7);
        setWeek(week.toString())
    };

    const getDates = () => {
        const currentYear = now.getFullYear();
        const month = now.toLocaleString('default', { month: 'long' });
        setMonth(month)

    }


    useEffect(() => {
        getDates();
        getWeekOfMonth(now);
    }, [])
    return (
        <div className='mt-18  flex items-center     flex-col'>
            <h1>Planner</h1>
            <div className='w-full flex'>
                <div className='w-[60%] '>
                    <Plan />
                </div>

                <Progress />

            </div>
        </div >
    )
}

export default page