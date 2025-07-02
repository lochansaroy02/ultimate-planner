"use client";

import { useState } from 'react';

const page = () => {
    const [userName, setUserName] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    

    return (
        <div className=' flex items-center flex-col gap-4 justify-center h-screen'>
            <h1 className='text-xl'>Signup</h1>
            <div className='flex flex-col items-center gap-1 '>
                <input onChange={(e) => {
                    setUserName(e.target.value)
                }} className='border border-neutral-800 rounded-md' type="text" />
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} className='border border-neutral-800 rounded-md' type="password" />
                <button onClick={() => {
                    console.log(userName, password)
                }} className='bg-blue-500 rounded-md text-sm  px-2 py-1 text-neutral-200'>Signup</button>
            </div>
        </div>
    )
}

export default page