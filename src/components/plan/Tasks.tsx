"use client";
import { useTaskStore } from '@/store/planner/taskStore';
import { CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import LabelledInput from '../ui/LabelledInput';

const Tasks = ({ dayId }: { dayId: string }) => {
    const { getTask, taskMap, createTask, updateTask } = useTaskStore();
    const [isCreating, setIsCreating] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getTask(dayId);
    }, [dayId]);

    const handleTaskCreate = async () => {
        const title = titleRef.current?.value;
        const desc = descRef.current?.value;

        if (title) {
            await createTask(title, desc || '', false, dayId);
            if (titleRef.current) titleRef.current.value = '';
            if (descRef.current) descRef.current.value = '';
            setIsCreating(false);
        }
    };

    const handleToggleComplete = async (taskId: string) => {
        await updateTask(taskId, dayId); // Now uses backend truth
    };

    const tasks = taskMap[dayId] || [];

    return (
        <div className="ml-8 flex flex-col gap-4 p-4 rounded-b-xl">
            {/* Task Creation Section */}
            {!isCreating ? (
                <div className="flex justify-end gap-4">
                    <Button
                        onclick={() => setIsCreating(true)}
                        variant="primary"
                        size="sm"
                        text="Create Task"
                    />
                    <Button variant="primary" size="sm" text="Create Goal" />
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <LabelledInput inputRef={titleRef} placeholder="Enter task" type="text" />
                    <LabelledInput inputRef={descRef} placeholder="Enter description" type="text" />
                    <Button onclick={handleTaskCreate} variant="primary" size="sm" text="Create" />
                </div>
            )}

            {/* Task List */}
            <div className="flex flex-col gap-2">
                {tasks && tasks.map((task: any) => (
                    <div key={task?.id} className="rounded-xl bg-cyan-800  p-3 shadow flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <CheckCircle
                                className={`cursor-pointer size-5 transition-colors duration-300 ${task?.isCompleted ? 'text-green-500' : 'text-gray-400'
                                    }`}
                                onClick={() => handleToggleComplete(task?.id)}
                            />
                            <div>
                                <h1
                                    className={`text-base ${task?.isCompleted ? 'line-through text-gray-400' : 'text-neutral-100'
                                        }`}
                                >
                                    {task?.title}
                                </h1>
                                {task?.description && (
                                    <p className="text-sm text-gray-500">{task?.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
