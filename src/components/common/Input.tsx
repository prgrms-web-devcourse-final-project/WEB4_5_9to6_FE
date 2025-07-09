import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMsg?: string;
}

export default function Input({ error, errorMsg, ...props }: InputProps) {
    return (
        <>
            <input
                className={`h-[54px] w-full rounded-[12px] border border-[var(--color-gray-300)] pl-4 text-[var(--color-gray1000)] placeholder-[var(--color-gray500)] duration-200 ease-in-out focus:outline-none ${error && "ring-1 ring-[#FF394A]"}`}
                {...props}
            />
            <label
                className={`h6 pl-2 text-[#FF394A] transition-all duration-200 ease-in-out ${
                    error
                        ? "max-h-[40px] translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-2 opacity-0"
                }`}
            >
                {errorMsg}
            </label>
        </>
    );
}
