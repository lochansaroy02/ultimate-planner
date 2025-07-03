import Year from '@/components/plan/Year'
import Accordian from '@/components/ui/accordian/Accordian'
import Child from '@/components/ui/accordian/Child'
import Parent from '@/components/ui/accordian/Parent'
import { Button } from '@/components/ui/Button'
import { plan } from '@/utils/schama'

const page = () => {
    return (
        <div className=' flex justify-center mt-24   items-center'>

            <div className='h-screen flex ml-12 mt-12 flex-col'>
                <h1 className='text-2xl'>Data</h1>
                <div className='bg-amber-500  '>
                    {
                        plan.map((item, index) => (
                            <div className='bg-red-700 ' key={index}>
                                <Parent >
                                    <div className='flex gap-2 item-center ' >
                                        <h1>{item.year.title}</h1>
                                        <Button variant='primary' size='sm' text='create' />
                                    </div>
                                </Parent>
                                <Child>
                                    <div>
                                        <Year {...item.year} />
                                    </div>
                                </Child>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page
