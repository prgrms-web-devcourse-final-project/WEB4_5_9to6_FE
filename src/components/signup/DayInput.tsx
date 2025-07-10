import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

interface DayInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    value: string;
    setValue: (value: string) => void;
}

export default function DayInput({
    className,
    value,
    setValue,
    placeholder,
}: DayInputProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;
        setValue(format(date, "yyyy-MM-dd"));
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                readOnly
                placeholder={placeholder}
                onClick={() => setIsOpen((prev) => !prev)}
                className={twMerge(
                    `h-[54px] w-full cursor-pointer rounded-[12px] border border-[var(--color-gray-300)] pl-4 text-[var(--color-gray1000)] placeholder-[var(--color-gray500)] focus:outline-none ${className}`,
                    className,
                )}
            />

            {isOpen && (
                <div className="fixed inset-0 z-2 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="z-2 flex w-sm justify-center rounded-[12px] bg-white p-4">
                        <DayPicker
                            mode="single"
                            selected={new Date(value)}
                            onSelect={handleSelect}
                            captionLayout="dropdown"
                            fromYear={1960}
                            toYear={new Date().getFullYear()}
                            locale={ko}
                            navLayout="around"
                            classNames={{
                                selected:
                                    "bg-[var(--color-main400)] text-white rounded-[10px]",
                                today: "text-[var(--color-main400)] font-semibold",
                            }}
                            style={
                                {
                                    "--rdp-accent-color":
                                        "var(--color-main400)",
                                } as React.CSSProperties
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
