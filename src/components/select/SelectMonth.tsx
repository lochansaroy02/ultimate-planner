import React from "react";

interface MonthSelectorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

const SelectMonth: React.FC<MonthSelectorProps> = ({ value, onChange, label }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option className="bg-neutral-800 text-neutral-100" value="">Select Month</option>
                {months.map((month) => (
                    <option className="bg-neutral-800 text-neutral-100" key={month.value} value={month.label}>
                        {month.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectMonth;
