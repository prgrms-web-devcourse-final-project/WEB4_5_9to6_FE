"use client";

import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useStudyStore } from "@/stores/studyStore";

export default function DateModal({
    onClose,
    isOpen,
    isEdit,
}: {
    onClose: () => void;
    isOpen: boolean;
    isEdit?: boolean;
}) {
    const startDate = useStudyStore((state) => state.studyData.startDate);
    const endDate = useStudyStore((state) => state.studyData.endDate);
    const today = new Date();
    const [editEndDate] = useState(() =>
        endDate ? new Date(endDate) : new Date(),
    );

    const selectedRange: DateRange = {
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
    };

    const selectHandler = (range: DateRange | undefined) => {
        if (!range || !range.to) return;

        if (isEdit) {
            useStudyStore
                .getState()
                .setData("endDate", format(range.to, "yyyy-MM-dd"));
        } else {
            if (range.from) {
                useStudyStore
                    .getState()
                    .setData("startDate", format(range.from, "yyyy-MM-dd"));
            }
            if (range.to) {
                useStudyStore
                    .getState()
                    .setData("endDate", format(range.to, "yyyy-MM-dd"));
            }
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
                } dark:bg-gray1000 z-2 mx-5 flex max-w-sm justify-center rounded-[24px] bg-white p-4`}
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
                    disabled={(date) => {
                        if (date < today) return true;
                        if (isEdit && date < editEndDate) return true;

                        return false;
                    }}
                    classNames={{
                        selected: "bg-main400 text-white rounded-[10px]",
                        today: "text-main400 font-semibold",
                        range_middle: "bg-main400 rounded-none",
                        range_start: "bg-main400 rounded-l-full",
                        range_end: "bg-main400 rounded-r-full",
                    }}
                    className="dark:font-light dark:text-white"
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
