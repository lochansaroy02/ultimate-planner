"use client";

import Year from '@/components/plan/Year';
import Progress from '@/components/Progress';
import { useUserStore } from '@/store/userStore';

const page = () => {

    const { userData } = useUserStore()


    return (
        <div className='mt-12  flex items-center    flex-col'>
            <div className='flex flex-col gap-4  justify-center items-center'>
            </div>
            <div className='mt-12 flex lg:flex-row w-full  flex-col items-center  justify-center gap-4 '>

                <div className=' w-[80%] lg:mx-8 lg:w-[60%]    '>
                    <Year />
                </div>
                <div className='mx-4 h-fit w-[80%] rounded-xl   bg-neutral-900 shadow-lg  flex justify-center lg:w-[40%] '>
                    <Progress />
                </div>
            </div>
        </div >
    )
}

export default page