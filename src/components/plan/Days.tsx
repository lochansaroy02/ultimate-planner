import { useDayStore } from "@/store/planner/dayStore"
import { useToggleStore } from "@/store/toggleStore"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/Button"
import LabelledInput from "../ui/LabelledInput"
import Tasks from "./Tasks"

const Days = ({ weekId }: { weekId: string }) => {

    const { getDay, dayMap, createDay } = useDayStore()
    const { toggleOpen, isOpen } = useToggleStore()

    const [isCreating, setIsCreating] = useState<boolean>(false)


    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getDay(weekId)
    }, [weekId])

    const days = dayMap[weekId];

    const handleDayCreate = async () => {
        const title = titleRef.current?.value;
        const desc = descriptionRef.current?.value;
        createDay(title, desc, weekId)
        if (titleRef.current) titleRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";
        setIsCreating(false)
    }

    return (
        <div className="ml-8 flex flex-col gap-2 p-2 rounded-b-xl">
            <div className="">
                {!isCreating ?
                    <div className=" w-full flex pr-12 gap-4    justify-end">
                        <Button onclick={() => {
                            setIsCreating(true)
                        }} variant="primary" size="sm" text="Create day" />
                        <Button variant="primary" size="sm" text="create Goal" />
                    </div> : <div className='flex gap-2 items-center justify-center'>
                        <div className="flex gap-2  ">
                            <LabelledInput inputRef={titleRef} placeholder='Enter week' type='text' />
                            <LabelledInput inputRef={descriptionRef} placeholder='Enter description' type='text' />
                        </div>
                        <Button onclick={handleDayCreate} variant='primary' size='sm' text='create ' />
                    </div>
                }
            </div>
            {days?.map((item: any, index: number) => {
                const open = isOpen(item.id);
                return (
                    <div key={item.id} className="flex flex-col rounded-xl">
                        <div onClick={() => toggleOpen(item.id)}
                            className="cursor-pointer flex justify-between items-center bg-cyan-800 rounded-xl p-2">
                            <div>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <h1>{item.id}</h1>
                            </div>
                            <div className="flex  gap-2 ">
                                <Button variant="primary" size="sm" text="create Goal" />
                                <Button variant="primary" size="sm" text="create Day" />

                            </div>
                        </div>
                        <div>{open && <Tasks dayId={item.id} />} </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Days
