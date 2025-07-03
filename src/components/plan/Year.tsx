import Months from "./Months"

const Year = (item: any) => {
    return (
        <div>
            <div>
                {
                    item.months.map((month: any, index: number) => (
                        <Months key={index} {...month} />
                    ))
                }
            </div>
        </div>
    )
}

export default Year
