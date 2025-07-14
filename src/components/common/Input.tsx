import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: boolean;
    errorMsg?: string;
    label?: string;
    icon?: React.ReactNode;
}

export default function Input({
    error,
    errorMsg,
    className = "",
    label,
    icon,
    ...props
}: InputProps) {
    return (
        <>
            <div className="relative flex flex-col gap-1">
                {label && (
                    <label className="h6 text-[var(--color-gray1000)]">
                        {label}
                    </label>
                )}
                <input
                    className={twMerge(
                        `h-[54px] w-full rounded-[12px] border border-[var(--color-gray-300)] px-4 text-[var(--color-gray1000)] placeholder-[var(--color-gray500)] duration-200 ease-in-out focus:outline-none ${error && "ring-1 ring-[#FF394A]"} ${icon && "pr-10"}`,
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
                {icon && (
                    <div
                        className={`absolute top-[27px] right-3 -translate-y-1/2 cursor-pointer text-[var(--color-gray500)] ${label && "top-[53px]"}`}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </>
    );
}
