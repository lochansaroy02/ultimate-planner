import Weeks from './Weeks';

const Months = (item: any) => {
    return (
        <div className='ml-8'>
            <h1>{item.title}</h1>
            <h1>{item.description}</h1>
            <h1>{item.goal}</h1>
            <div>
                {
                    item.weeks.map((week: any, index: number) => (
                        <Weeks key={index} {...week} />
                    ))
                }
            </div>
        </div>
    )
}

export default Months
