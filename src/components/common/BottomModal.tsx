"use client";

import { useAnimationStore } from "@/stores/modalAnimationStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface BottomModalProps {
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
    height: string;
    isOpen: boolean;
}
export default function BottomModal({
    onClose,
    title,
    children,
    height,
    isOpen,
}: BottomModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { animationClass, changeClass } = useAnimationStore();

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
        <>
            <div
                className={`fixed inset-0 z-50 bg-[#000000]/30 duration-200 dark:bg-[#000000]/50 ${animationClass === "animate-modalFadeIn" ? "opacity-100" : "opacity-0"}`}
                onClick={closeHandler}
            ></div>
            <div
                className={`${
                    animationClass
                } fixed right-[10px] bottom-5 left-[10px] z-50 flex flex-col rounded-3xl bg-[#FFFFFF] py-5 dark:bg-[#222222]`}
                style={{ height: `${height}px` }}
            >
                <div className="flex items-center justify-between">
                    <h3 className="ml-5 text-[var(--color-gray1000)] dark:text-white">
                        {title}
                    </h3>
                    <X
                        className="mr-5 h-6 w-6 cursor-pointer text-[#161616] dark:text-white"
                        onClick={closeHandler}
                    />
                </div>
                {children}
            </div>
        </>
    );
}
