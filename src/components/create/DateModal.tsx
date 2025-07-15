"use client";

import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function DateModal({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onClose,
    isOpen,
}: {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    onClose: () => void;
    isOpen: boolean;
}) {
    const selectedRange: DateRange = {
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
    };

    const selectHandler = (range: DateRange | undefined) => {
        if (!range) return;

        if (range.from) {
            setStartDate(format(range.from, "yyyy-MM-dd"));
        }
        if (range.to) {
            setEndDate(format(range.to, "yyyy-MM-dd"));
        }
    };

    const [isVisible, setIsVisible] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setAnimationClass("animate-modalFadeIn");
        } else {
            setAnimationClass("animate-modalFadeOut");
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const closeHandler = () => {
        setAnimationClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={closeHandler}
            />
            <div
                className={`${
                    animationClass
                } z-2 flex w-sm justify-center rounded-[24px] bg-white p-4`}
            >
                <DayPicker
                    mode="range"
                    selected={selectedRange}
                    onSelect={selectHandler}
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 30}
                    locale={ko}
                    navLayout="around"
                    disabled={{ before: new Date() }}
                    classNames={{
                        selected:
                            "bg-[var(--color-main400)] text-white rounded-[10px]",
                        today: "text-[var(--color-main400)] font-semibold",
                        range_middle: "bg-[var(--color-main400)] rounded-none",
                        range_start: "bg-[var(--color-main400)] rounded-l-full",
                        range_end: "bg-[var(--color-main400)] rounded-r-full",
                    }}
                    style={
                        {
                            "--rdp-accent-color": "var(--color-main400)",
                        } as React.CSSProperties
                    }
                />
            </div>
        </div>
    );
}
