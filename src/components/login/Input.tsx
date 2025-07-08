import { useState } from "react";

export default function Input({
    children,
    isPassword,
}: {
    children: React.ReactNode;
    isPassword?: boolean;
}) {
    const [value, setValue] = useState("");

    return (
        <>
            <div className="relative h-[62px] w-full rounded-[12px] border border-[var(--color-gray-300)]">
                <input
                    className="peer w-ful h-full pt-4 pl-4 text-[var(--color-gray1000)] transition-all duration-200 focus:outline-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type={isPassword ? "password" : "text"}
                />
                <label
                    className={`absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-gray500)] transition-all duration-200 peer-focus:top-5 peer-focus:text-xs ${value && "top-5 text-xs"}`}
                >
                    {children}
                </label>
            </div>
        </>
    );
}
