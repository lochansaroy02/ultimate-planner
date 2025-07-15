
"use client";

import { cn } from "@/utils/tailwind-merge";

export interface ButtonProps {
    variant: 'primary' | 'secondary' | 'tertiary';
    size: "sm" | "md" | "lg";
    text?: string;
    startIcon?: any;
    endIcon?: any;
    onclick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    styles?: string
}

const buttonVariants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-lg",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-lg",
    tertiary: "bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg",
}

const sizeVariants = {
    sm: "text-sm px-2 py-1 font-light ",
    md: "text-md px-4 py-2 font-medium",
    lg: "text-lg px-6 py-3 font-bold",
}
const defaultStyle = "flex items-center justify-center  ursor-pointer "

export const Button = (props: ButtonProps) => {
    return (
        <div className=" "> {
            <button
                className={cn(
                    buttonVariants[props.variant],
                    sizeVariants[props.size],
                    defaultStyle,
                    props.styles
                )}
                onClick={props.onclick}
            >
                {props.startIcon && <span className="">{props.startIcon}</span>}
                {props.text}
                {props.endIcon && <span className="">{props.endIcon}</span>}
            </button >
        }</div >
    )
}

// export const Card = () => {
//     return (
//         <div className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-lg font-bold">Card Title</h2>
//             <p className="text-gray-700">This is a card component.</p>
//         </div>
//     )
// }

