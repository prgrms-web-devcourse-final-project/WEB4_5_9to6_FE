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

    const selectHandler = (date: Date | undefined) => {
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
                    `border-gray300 dark:border-gray800 text-gray1000 placeholder-gray500 dark:placeholder-gray700 h-[54px] w-full cursor-pointer rounded-[12px] border pl-4 duration-200 ease-in focus:outline-none dark:text-white ${className}`,
                    className,
                )}
            />

            {isOpen && (
                <div className="fixed inset-0 z-2 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="dark:bg-gray1000 z-2 mx-5 flex max-w-sm justify-center rounded-[24px] bg-white p-4">
                        <DayPicker
                            mode="single"
                            selected={new Date(value)}
                            onSelect={selectHandler}
                            captionLayout="dropdown"
                            fromYear={1960}
                            toYear={new Date().getFullYear()}
                            locale={ko}
                            navLayout="around"
                            classNames={{
                                selected:
                                    "bg-main400 text-white rounded-[10px]",
                                today: "text-main400 font-semibold",
                            }}
                            className="dark:font-light dark:text-white"
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
