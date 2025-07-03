"use client";

import { useIsOpenStore } from '@/store/accordianStore';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Child from './Child';

const Parent = ({ children }) => {
    const { isOpen, toggleIsOpen } = useIsOpenStore();

    return (
        <div className='flex flex-col items-center  w-screen mt-10 text-white'>

            {/* Header */}
            <div
                onClick={toggleIsOpen}
                className=' rounded-xl px-4 py-3 bg-neutral-800 flex items-center gap-4 cursor-pointer transition hover:bg-neutral-700'>
                <span>
                    {isOpen ? <ArrowDown /> : <ArrowRight />}
                </span>
                {children}
            </div>
        </div>
    )
}

export default Parent
