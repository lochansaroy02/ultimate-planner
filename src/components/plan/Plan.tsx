"use client";
import { useYearStore } from '@/store/planner/yearStore';
import { useEffect } from 'react';
import Year from './Year';

const Plan = ({ data }) => {




    return (

        <div className=" w-3/4 flex   justify-center ">
            <Year />
        </div>
    )
}

export default Plan