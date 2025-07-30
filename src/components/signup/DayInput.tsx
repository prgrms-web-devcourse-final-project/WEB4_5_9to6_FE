import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";
import { useAnimationStore } from "@/stores/modalAnimationStore";

interface DayInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClose: () => void;
    isOpen: boolean;
    className?: string;
    value: string;
    setValue: (value: string) => void;
}

export default function DayInput({
    isOpen,
    onClose,
    value,
    setValue,
}: DayInputProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { animationClass, changeClass } = useAnimationStore();

    const selectHandler = (date: Date | undefined) => {
        if (!date) return;
        setValue(format(date, "yyyy-MM-dd"));
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            changeClass("animate-modalFadeIn");
        } else {
            changeClass("animate-modalFadeOut");
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [changeClass, isOpen]);

    const closeHandler = () => {
        changeClass("animate-modalFadeOut");
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
                    mode="single"
                    selected={new Date(value)}
                    onSelect={selectHandler}
                    captionLayout="dropdown"
                    fromYear={1960}
                    toYear={new Date().getFullYear()}
                    locale={ko}
                    navLayout="around"
                    classNames={{
                        selected: "bg-main400 text-white rounded-[10px]",
                        today: "text-main400 font-semibold",
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
