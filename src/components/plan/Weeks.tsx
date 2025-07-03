import React from 'react'
import Days from './Days'

const Weeks = (item: any) => {
    return (
        <div className='ml-8'>
            <h1>{item.title}</h1>
            <h1>{item.description}</h1>
            <h1>{item.goal}</h1>
            <div>
                {
                    item.days.map((day: any, index: number) => (
                        <Days key={index} {...day} />
                    ))
                }
            </div>
        </div>
    )
}

export default Weeks
