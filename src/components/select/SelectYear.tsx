import React from "react";

interface YearSelectorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const months = [
    { value: "01", label: "2025" },
    { value: "02", label: "2026" },
];

const SelectYear: React.FC<YearSelectorProps> = ({ value, onChange, label }) => {
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

export default SelectYear;
