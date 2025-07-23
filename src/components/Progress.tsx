import { useTaskStore } from '@/store/planner/taskStore';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CircularGauge from './ui/CircularGauge';
import Heatmap from './ui/HeatMap';

const Progress = () => {
    const { getAllTask, allTasks } = useTaskStore();
    const [completedTask, setCompletedTask] = useState<any[]>([]);
    const [percentage, setPercentage] = useState(0);

    // Fetch tasks on mount
    useEffect(() => {
        getAllTask();
    }, []);

    // When allTasks change, update completedTask and percentage
    useEffect(() => {
        const completed = allTasks[0]?.filter((item: any) => item?.isCompleted === true) || [];
        setCompletedTask(completed);

        if (allTasks[0]?.length) {
            const percent = (completed.length / allTasks[0].length) * 100;
            const rounded = parseFloat(percent.toFixed(2));
            setPercentage(rounded);
        }
    }, [allTasks]);


    const today = dayjs();
    const data: Record<string, number> = {};
    for (let i = 0; i < 365; i++) {
        const date = today.subtract(i, 'day').format('YYYY-MM-DD');
        data[date] = Math.floor(Math.random() * 6); // Simulated task count
    }

    return (
        <div className='gap-6 items-center flex flex-col px-8 py-4'>
            <CircularGauge percentage={percentage} label='Progress' />
            <Heatmap data={data} />
        </div>
    );
};

export default Progress;
