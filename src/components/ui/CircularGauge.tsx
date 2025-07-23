import React from "react";

type CircularGaugeProps = {
    percentage: number; // 0 to 100
    size?: number; // size in px
    strokeWidth?: number; // thickness of the ring
    label?: string;
};

const CircularGauge: React.FC<CircularGaugeProps> = ({
    percentage,
    size = 150,
    strokeWidth = 12,
    label = "Progress",
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center  justify-center">
            <svg width={size} height={size} className="rotate-[-90deg] relative *:">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb" // gray-200
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
                        <stop offset="100%" stopColor="#9333ea" /> {/* purple-600 */}
                    </linearGradient>
                </defs>

            </svg>
            <div className="absolute  ">
                <p className="text-2xl lg:text-4xl font-bold text-white drop-shadow-lg">{percentage}%</p>
            </div>

            <p className="text-sm lg:text-lg mt-2 text-gray-300">{label}</p>
        </div>
    );
};

export default CircularGauge;
