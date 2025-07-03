const Days = (item: any) => {
    return (
        <div className='ml-8'>
            <h1>{item.title}</h1>
            <h1>{item.description}</h1>
            <h1>{item.goal}</h1>
        </div>
    )
}

export default Days
