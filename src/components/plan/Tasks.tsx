import { useTaskStore } from '@/store/planner/taskStore';
import { useEffect } from 'react';

const Tasks = ({ dayId }) => {

    const { getTask, taskMap } = useTaskStore();

    useEffect(() => {
        getTask(dayId)
    }, [])

    const tasks = taskMap[dayId];
    return (
        <div className='ml-8 flex flex-col gap-2 p-2 rounded-b-xl'>

            {tasks?.map((item: any, index: number) => {
                return (
                    <div key={item.id} className="flex flex-col rounded-xl">
                        <div
                            className="cursor-pointer flex justify-between items-center bg-stone-800 rounded-xl p-2">
                            <div>
                                <h1>{item.title}</h1>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Tasks