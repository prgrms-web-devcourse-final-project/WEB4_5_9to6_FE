import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "black" | "primary" | "yellow" | "white" | "gray";
    icon?: string;
}

export default function Button({
    color = "black",
    icon,
    children,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <>
            <button
                className={`h5 h-[50px] w-full rounded-[12px] transition-all duration-200 ease-in-out ${
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
                } `}
                {...props}
            >
                <div className="flex items-center justify-center gap-2">
                    {icon && <img src={icon} />}
                    {children}
                </div>
            </button>
        </>
    );
}
