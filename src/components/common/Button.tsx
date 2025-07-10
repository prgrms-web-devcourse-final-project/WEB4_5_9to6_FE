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
                            ? "cursor-default bg-[var(--color-gray200)] text-[var(--color-gray500)]"
                            : color === "black"
                              ? "cursor-pointer bg-[var(--color-gray1000)] text-white hover:bg-[var(--color-gray900)]"
                              : color === "primary"
                                ? "cursor-pointer bg-[var(--color-main500)] text-white hover:bg-[var(--color-main600)]"
                                : color === "yellow"
                                  ? "cursor-pointer bg-[#F9E95A] text-[#191919] hover:bg-[#EFDE3E]"
                                  : color === "white"
                                    ? "cursor-pointer border border-[var(--color-gray300)] text-[#191919] hover:bg-[var(--color-gray100)]"
                                    : "cursor-pointer bg-[var(--color-gray200)] text-[var(--color-gray1000)] hover:bg-[var(--color-gray300)]"
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
