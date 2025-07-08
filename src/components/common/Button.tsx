import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "black" | "primary" | "yellow" | "white";
    icon?: string;
}

export default function Button({
    color = "black",
    icon,
    children,
    ...props
}: ButtonProps) {
    return (
        <>
            <button
                className={`h5 h-[50px] w-full cursor-pointer rounded-[12px] transition-all duration-200 ease-in-out ${
                    color === "black"
                        ? "bg-[var(--color-gray1000)] text-white hover:bg-[var(--color-gray900)]"
                        : color === "primary"
                          ? "bg-[var(--color-main500)] text-white hover:bg-[var(--color-main600)]"
                          : color === "yellow"
                            ? "bg-[#F9E95A] text-[#191919] hover:bg-[#EFDE3E]"
                            : "border border-[var(--color-gray300)] text-[#191919] hover:bg-[var(--color-gray100)]"
                }`}
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
