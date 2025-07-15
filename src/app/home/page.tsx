"use client";

import Year from '@/components/plan/Year';
import Progress from '@/components/Progress';
import { useYearStore } from '@/store/planner/yearStore';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const page = () => {

    return (
        <div className='mt-12  flex items-center    flex-col'>
            <div className='flex flex-col gap-4  justify-center items-center'>
                <h1 className='text-4xl'>Ultimate Planner</h1>
            </div>
            <div className='w-full  mt-12  flex'>
                <div className='w-[60%] '>
                    <Year />
                </div>
                <Progress />
            </div>
        </div >
    )
}

export default page