import React from 'react'
interface ILablledInput {
    value?: string | number | readonly string[] | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    lable?: string,
    inputRef?: React.RefObject<HTMLInputElement | null>;
    placeholder: string,
    type: "text" | "password" | "file" | "checkbox"
}

const LabelledInput = ({ lable, value, placeholder, type, onChange, inputRef }: ILablledInput) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm'>{lable}</label>
            <input
                ref={inputRef} // ✅ add this line
                className='px-2 py-1 outline outline-neutral-600 text-md bg-neutral-800 focus:outline focus:outline-blue-400 rounded-md'
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default LabelledInput
