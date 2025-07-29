import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "black" | "primary" | "yellow" | "white" | "gray";
    icon?: string;
    className?: string;
}

export default function Button({
    color = "black",
    icon,
    children,
    disabled,
    className,
    ...props
}: ButtonProps) {
    return (
        <>
            <button
                className={twMerge(
                    `h5 h-[50px] w-full rounded-[12px] transition-all duration-200 ease-in-out ${
                        disabled
                            ? "bg-gray200 dark:bg-gray900 text-gray500 dark:text-gray600 cursor-default"
                            : color === "black"
                              ? "bg-gray1000 hover:bg-gray900 dark:bg-main400 dark:hover:bg-main500 cursor-pointer text-white"
                              : color === "primary"
                                ? "bg-main500 hover:bg-main600 dark:bg-main400 dark:hover:bg-main500 cursor-pointer text-white"
                                : color === "yellow"
                                  ? "cursor-pointer bg-[#F9E95A] text-[#191919] hover:bg-[#EFDE3E]"
                                  : color === "white"
                                    ? "border-gray300 hover:bg-gray100 cursor-pointer border bg-white text-[#191919]"
                                    : "bg-gray200 dark:bg-gray900 dark:text-gray600 text-gray1000 hover:bg-gray300 cursor-pointer"
                    } `,
                    className,
                )}
                {...props}
            >
                <div className="flex items-center justify-center gap-2">
                    {icon && <img src={icon} alt="아이콘" />}
                    {children}
                </div>
            </button>
        </>
    );
}
