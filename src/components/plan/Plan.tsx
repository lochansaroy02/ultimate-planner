"use client";
import { useYearStore } from '@/store/planner/yearStore';
import { useRef, useState } from 'react';
import { Button } from '../ui/Button';
import LabelledInput from '../ui/LabelledInput';
import Year from './Year';

const Plan = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [year, setYear] = useState<string>("")
    const [yearDecription, setYearDescription] = useState<string>("")

    const { createYear } = useYearStore();
    return (

        <div className=" w-3/4 flex flex-col items-center   justify-center ">

            <div className='my-4 '>

                {isCreating ? <div className='flex gap-2 items-center justify-center flex-col'>
                    <div>
                        <LabelledInput onChange={(e) => {
                            setYear(e.target.value)
                        }} lable='Year' value={year} placeholder='Enter year' type='text' />
                        <LabelledInput onChange={(e) => {
                            setYearDescription(e.target.value)
                        }} lable='description' value={yearDecription} placeholder='Enter year' type='text' />
                    </div>
                    <Button onclick={() => {
                        createYear(year, yearDecription, "4a6c95a1-c94e-4fe6-affb-b7dbe48e46aa");
                        setIsCreating(false)
                    }} variant='primary' size='sm' text='create' />
                </div> :
                    <Button variant='secondary' size='sm' text='create Year' onclick={() => {
                        setIsCreating(true)

                    }} />}


            </div>
            <Year />
        </div>
    )
}

export default Plan