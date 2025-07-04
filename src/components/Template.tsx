"use client";

import Goals from './Goals';
import { Button } from './ui/Button';

interface TemplateProps {
    isGoal?: boolean,
    isActive?: boolean,
    setIsActive: (value: boolean) => void,
    setIsGoal: (value: boolean) => void,
    label: String
}



const Template = (props: TemplateProps) => {


    return (
        <div className='  w-full  '>
            <div className='flex justify-between border border-green-300 p-2 rounded-xl ' >
                <h1 className='text-white'>{props.label}</h1>
                <div className='flex gap-2 items-center'>
                    <Button onclick={() => {
                        props.setIsActive(!props.isActive);
                    }} text='create' variant='secondary' size='sm' />
                    <Button onclick={() => {
                        props.setIsGoal(!props.isGoal);
                    }} text='Goal' variant='secondary' size='sm' />
                </div>
            </div>
            <div className='flex gap-2 ml-2'>
                {props.isGoal && <Goals isActive={props.isGoal} setIsActive={props.setIsGoal} label={`goals for ${props.label}`} />}
            </div>

        </div>
    )
}

export default Template