"use client";

import Plan from '@/components/plan/Plan';
import { usePlanStore } from '@/store/planner/planStore';
import { useEffect } from 'react';

const page = () => {
    const { getPlan, planData } = usePlanStore();

    useEffect(() => {
        getPlan("53f9a337-7f4f-4df5-b3e0-2606eaf0d04d")
    }, [])
    return (
        <div className='mt-24 flex justify-center '><Plan data={planData} /></div>
    )
}

export default page