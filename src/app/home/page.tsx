"use client";
import { Button } from '@/components/ui/Button';
import { usePlanStore, useYearStore } from '@/store/plannerStore';
import { useIsGoalStore } from '@/store/store';
import { useEffect, useState } from 'react';

const page = () => {

    const { createPlan, isLoading } = usePlanStore()
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

    const getYearData = async () => {
        const yearData = await getYear()
        console.log(yearData);
    }

    useEffect(() => {
        getYearData()
    }, [])

    const handleYearSubmit = async () => {
        await createYear(yearDecription)
    }

    return (
        <div className='w-screen'>


            <div className='mt-18 flex items-center   mx-24  flex-col'>
                <h1>Planner </h1>

                <Button size='sm' variant='primary' text={!isLoading ? "create" : "Loading..."} onclick={() => {
                    createPlan()
                }} />



                {/* {!isYear ?
                    <div className=''>
                        <Button onclick={() => {
                            setIsYear(true)
                        }} variant='secondary' size='sm' text='Get Started' />
                    </div> : <div>
                        {isDescription ?
                            <div>
                                <h1>{thisYear}</h1>
                                <p>{yearDecription}</p>
                            </div> :
                            <div className='flex gap-2 items-center  p-2 '>
                                <LabelledInput type='text' placeholder={`set Description for year : `} value={yearDecription} onChange={(e) => {
                                    setYearDescription(e.target.value)
                                }} />
                                <Button text='add' variant='primary' size='sm' onclick={handleYearSubmit} />
                            </div>
                        }

                    </div>
                } */}
            </div>

            {/* <div className=' w-1/2 flex flex-col mt-2  items-start ml-12 ' >
                {
                    <div className='mt-2  w-full    ml-4 px-4'>
                        {
                            isYear && <Template description={yearDecription} isActive={createMonth} setIsActive={setCreateMonth} isGoal={isMonthGoal} setIsGoal={setIsMonthGoal} title={thisYear} />
                        }
                    </div>
                }
                <div className='mt-2  w-full    ml-4 px-4'>
                    {
                        isYear && <Template description={monthDecription} isActive={createMonth} setIsActive={setCreateMonth} isGoal={isMonthGoal} setIsGoal={setIsMonthGoal} title={now.toLocaleString('default', { month: 'long' })} />
                    }
                </div>

                <div className='mt-2 pt-2 pl-16 w-full   '>
                    {
                        createMonth && <Template description={weekDecription} isActive={createWeek} setIsActive={setCreateWeek} isGoal={isWeekGoal} setIsGoal={setIsWeekGoal} title={`Week : ${week}`} />
                    }
                </div>
                <div className='mt-2  pt-2  w-full pl-20'>
                    {
                        createWeek && <Template description={dayDecription} isActive={createDay} setIsActive={setCreateDay} isGoal={isDayGoal} setIsGoal={setIsDayGoal} title={now.toLocaleString('default', { weekday: 'long' })} />
                    }
                </div>
            </div> */}
        </div >
    )
}

export default page