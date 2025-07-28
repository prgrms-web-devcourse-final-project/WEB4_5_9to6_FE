import React from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    error?: boolean;
    errorMsg?: string;
    label?: string;
}

export default function TextArea({
    error,
    errorMsg,
    className = "",
    label,
    ...props
}: TextAreaProps) {
    return (
        <>
            <div className="relative flex flex-col gap-1">
                {label && (
                    <label className="h6 text-gray1000 duration-200 ease-in dark:text-white">
                        {label}
                    </label>
                )}
                <textarea
                    className={twMerge(
                        `text-gray1000 placeholder-gray500 dark:placeholder-gray700 dark:border-gray800 h-[159px] w-full resize-none overflow-hidden rounded-[12px] border border-gray-300 p-4 duration-200 ease-in-out focus:outline-none dark:text-white ${error && "border-[#FF394A] dark:border-[#FF394A]"}`,
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
