"use client";

import { Button } from './ui/Button';

const Goals = ({ label, setIsActive, isActive }) => {



    return (
        <div>
            <div className='flex gap-4 p-2 '>
                <label htmlFor="">{label}</label>
                <input className='border-b border-neutral-700    px-4 py-2  focus:outline-0 focus:border-neutral-500 focus:border-b ' type="text" />
                <Button onclick={() => setIsActive(!isActive)} variant='primary' size='sm' text='create' />
            </div>
        </div>
    )
}

export default Goals