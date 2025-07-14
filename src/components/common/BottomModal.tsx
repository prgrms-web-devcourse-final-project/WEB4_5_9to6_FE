"use client";

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
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setAnimationClass("animate-modalFadeIn");
        } else {
            setAnimationClass("animate-modalFadeOut");
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const closeHandler = () => {
        setAnimationClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-[#000000]/30">
                <div
                    className={`${
                        animationClass
                    } absolute right-[10px] bottom-5 left-[10px] z-50 flex flex-col rounded-3xl bg-[#FFFFFF] py-5`}
                    style={{ height: `${height}px` }}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="ml-5 text-[var(--color-gray1000)]">
                            {title}
                        </h3>
                        <X
                            className="mr-5 h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={closeHandler}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
