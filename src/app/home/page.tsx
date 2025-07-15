"use client";

import Year from '@/components/plan/Year';
import Progress from '@/components/Progress';

const page = () => {

    return (
        <div className='mt-12  flex items-center    flex-col'>
            <div className='flex flex-col gap-4  justify-center items-center'>
                <h1 className='text-4xl'>Ultimate Planner</h1>
            </div>
            <div className='w-full  gap-4   mt-12  flex'>
                <div className='w-[60%] ml-8  '>
                    <Year />
                </div>
                <div className=' w-[40%] h-fit rounded-xl   shadow-lg  shadow-neutral-600 bg-neutral-800 mr-8 flex  justify-center'>
                    <Progress />
                </div>
            </div>
        </div >
    )
}

export default page