"use client";
import Template from '@/components/Template';
import { Button } from '@/components/ui/Button';
import LabelledInput from '@/components/ui/LabelledInput';
import { useIsGoalStore } from '@/store/store';
import { useEffect, useState } from 'react';

const page = () => {
    const [year, setYear] = useState<String>("");
    const [yearDecription, setYearDescription] = useState<string>("");
    const [isDecription, setIsDescription] = useState<boolean>(false);


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

    const createYearFunction = async () => {
        const currentYear = now.getFullYear().toString();
        setYear(currentYear)
        setIsDescription(true)
        // try {
        //     const data = axios.post("", {
        //         currentYear,

        //     })

        // } catch (error) {

        // } finally {
        //     setIsDescription(true)
        // }
    }


    return (
        <div className='w-screen'>
            <div className='mt-18 flex items-center   mx-24  flex-col'>

                {!isYear ?
                    <div className=''>
                        <Button onclick={() => {
                            setIsYear(true)
                        }} variant='secondary' size='sm' text='Get Started' />
                    </div> : <div>
                        {isDecription ?
                            <div>
                                <h1>{year}</h1>
                                <p>{yearDecription}</p>
                            </div> :
                            <div className='flex gap-2 items-center  p-2  bg-cyan-300'>
                                <LabelledInput type='text' placeholder={`set Description for year : `} value={yearDecription} onChange={(e) => {
                                    setYearDescription(e.target.value)
                                }} />
                                <Button text='add' variant='primary' size='sm' onclick={createYearFunction} />
                            </div>
                        }

                    </div>
                }
            </div>

            <div className=' w-1/2 flex flex-col mt-2  items-start ml-12 ' >

                <div className='mt-2  w-full    ml-4 px-4'>
                    {
                        isYear && <Template isActive={createMonth} setIsActive={setCreateMonth} isGoal={isMonthGoal} setIsGoal={setIsMonthGoal} label={now.toLocaleString('default', { month: 'long' })} />
                    }
                </div>

                <div className='mt-2 pt-2 pl-16 w-full   '>
                    {
                        createMonth && <Template isActive={createWeek} setIsActive={setCreateWeek} isGoal={isWeekGoal} setIsGoal={setIsWeekGoal} label={`Week : ${week}`} />
                    }

                </div>
                <div className='mt-2  pt-2  w-full pl-20'>
                    {
                        createWeek && <Template isActive={createDay} setIsActive={setCreateDay} isGoal={isDayGoal} setIsGoal={setIsDayGoal} label={now.toLocaleString('default', { weekday: 'long' })} />
                    }
                </div>

            </div>
        </div >
    )
}

export default page