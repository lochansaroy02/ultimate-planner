import { useDayStore } from "@/store/planner/dayStore"
import { useToggleStore } from "@/store/toggleStore"
import { useEffect } from "react"
import { Button } from "../ui/Button"
import Tasks from "./Tasks"

const Days = ({ weekId }: { weekId: string }) => {

    const { getDay, dayMap } = useDayStore()
    const { toggleOpen, isOpen } = useToggleStore()

    useEffect(() => {
        getDay(weekId)
    }, [weekId])

    const days = dayMap[weekId];

    return (
        <div className="ml-8 flex flex-col gap-2 p-2 rounded-b-xl">
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
