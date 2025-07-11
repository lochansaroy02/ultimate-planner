import { useTaskStore } from '@/store/planner/taskStore';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import LabelledInput from '../ui/LabelledInput';

const Tasks = ({ dayId }) => {

    const { getTask, taskMap, createTask } = useTaskStore();
    const [isCreating, setIsCreating] = useState<boolean>(false)




    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLInputElement>(null)

    const handleTaskCreate = async () => {
        const title = titleRef.current?.value;
        const desc = descRef.current?.value;
        createTask(title, desc, false, dayId)
        if (titleRef.current) titleRef.current.value = "";
        if (descRef.current) descRef.current.value = "";
        setIsCreating(false)
    }

    useEffect(() => {
        getTask(dayId)
    }, [])



    const tasks = taskMap[dayId];

    return (
        <div className='ml-8 flex flex-col gap-2 p-2 rounded-b-xl'>
            <div className="">
                {!isCreating ?
                    <div className=" w-full flex pr-12 gap-4    justify-end">
                        <Button onclick={() => {
                            setIsCreating(true)
                        }} variant="primary" size="sm" text="Create task" />
                        <Button variant="primary" size="sm" text="create Goal" />
                    </div> : <div className='flex gap-2 items-center justify-center'>
                        <div className="flex gap-2  ">
                            <LabelledInput inputRef={titleRef} placeholder='Enter task' type='text' />
                            <LabelledInput inputRef={descRef} placeholder='Enter description' type='text' />
                        </div>
                        <Button onclick={handleTaskCreate} variant='primary' size='sm' text='create ' />
                    </div>
                }
            </div>
            <div className='flex  flex-col gap-2 h-fit '>

                {tasks?.map((item: any, index: number) => {
                    return (
                        <div key={index} className="flex flex-col rounded-xl">
                            <div
                                className="cursor-pointer flex justify-between items-center bg-stone-800 rounded-xl p-2">
                                <div>
                                    <h1>{item?.title}</h1>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Tasks