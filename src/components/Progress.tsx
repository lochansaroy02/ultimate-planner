import React from 'react'
import CircularGauge from './ui/CircularGauge'
import dayjs from 'dayjs';
import Heatmap from './ui/HeatMap';


const generateSampleData = () => {
    const today = dayjs();
    const data: Record<string, number> = {};
    for (let i = 0; i < 365; i++) {
        const date = today.subtract(i, "day").format("YYYY-MM-DD");
        data[date] = Math.floor(Math.random() * 6); // 0 to 5 tasks per day
    }
    return data;
};
const Progress = () => {
    const sampleData = generateSampleData();

    return (
        <div className='w-[40%] mr-8 gap-6 items-center flex  flex-col px-8 py-4 '>
            <CircularGauge percentage={68} label='Progress' />
            <Heatmap data={sampleData} />
        </div>
    )
}

export default Progress