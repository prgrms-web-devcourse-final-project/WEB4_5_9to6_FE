import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: boolean;
    errorMsg?: string;
}

export default function Input({
    error,
    errorMsg,
    className = "",
    ...props
}: InputProps) {
    return (
        <>
            <div className="flex flex-col gap-1">
                <input
                    className={twMerge(
                        `h-[54px] w-full rounded-[12px] border border-[var(--color-gray-300)] pl-4 text-[var(--color-gray1000)] placeholder-[var(--color-gray500)] duration-200 ease-in-out focus:outline-none ${error && "ring-1 ring-[#FF394A]"}`,
                        className,
                    )}
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
            </div>
        </>
    );
}
