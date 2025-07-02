import Year from '@/components/plan/Year'
import { plan } from '@/utils/schama'
import React from 'react'

const page = () => {

    return (
        <div>
            <div className='h-screen flex ml-12  mt-24  flex-col'>
                <h1>Data</h1>
                <div>
                    {
                        plan.map((item, index) => (
                            <div key={index}>
                                <h1>{item.year.title}</h1>
                                <div>
                                    {
                                        item.year.months.map((item, index) => (
                                            <div className='ml-8' key={index}>
                                                <h1>{item.title}</h1>
                                                <h1>{item.descrition}</h1>
                                                <h1>{item.goal}</h1>
                                                <div>{
                                                    item.weeks.map((item, index) => (
                                                        <div key={index} className='ml-8'>
                                                            <h1>{item.title}</h1>
                                                            <h1>{item.description}</h1>
                                                            <h1>{item.goal}</h1>
                                                            <div>{
                                                                item.days.map((item, index) => (
                                                                    <div className='ml-8' key={index}>
                                                                        <h1>{item.title}</h1>
                                                                        <h1>{item.description}</h1>
                                                                        <h1>{item.goal}</h1>
                                                                    </div>
                                                                ))
                                                            }</div>
                                                        </div>
                                                    ))
                                                }</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page