import React, { useRef } from "react";
import { Button } from "./Button";

interface InputProps {
    title: string;
    description: string;
    placeholder: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    buttonSize: "sm" | "md" | "lg";
    buttonVariant: "primary" | "secondary" | "tertiary";
    onclick: () => void;
    styles?: string;
}

const Input = (props: InputProps) => {
    return (
        <div className={`${props.styles} flex gap-2 items-center`}>
            <input
                ref={props.inputRef}
                className="bg-neutral-800 focus:outline focus:outline-blue-300 text-neutral-100 rounded-xl px-2 py-1"
                type="text"
                placeholder={props.placeholder}
            />
            <input
                ref={props.inputRef}
                className="bg-neutral-800 focus:outline focus:outline-blue-300 text-neutral-100 rounded-xl px-2 py-1"
                type="text"
                placeholder={props.placeholder}
            />
            <Button
                text={props.title}
                size={props.buttonSize}
                variant={props.buttonVariant}
                onclick={props.onclick}
            />
        </div>
    );
};

export default Input;
