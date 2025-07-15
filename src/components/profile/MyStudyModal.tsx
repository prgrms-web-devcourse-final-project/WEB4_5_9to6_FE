"use client";

import { useAnimationStore } from "@/stores/modalAnimationStore";
import { useMyStudyModalStore } from "@/stores/myStudyModalStore";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MyStudyModal() {
    const { isOpen, closeModal } = useMyStudyModalStore();
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
    }, [isOpen, changeClass]);

    const closeHandler = () => {
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            closeModal();
        }, 200);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
                <div
                    className={`${animationClass} text-gray1000 mx-[10px] mb-10 flex w-full flex-col rounded-3xl bg-white pb-5`}
                >
                    <div className="mx-5 flex h-16 items-center justify-between">
                        <h3>스터디 선택</h3>
                        <X
                            size={20}
                            onClick={closeHandler}
                            className="cursor-pointer"
                        />
                    </div>
                    <div
                        onClick={closeHandler}
                        className="hover:bg-gray200 flex h-11 cursor-pointer items-center justify-between px-5"
                    >
                        <h6 className="">수코딩 강의로 배우는 프론트엔드</h6>
                        <Check size={20} className="text-main500" />
                    </div>
                    <div
                        onClick={closeHandler}
                        className="hover:bg-gray200 flex h-11 cursor-pointer items-center justify-between px-5"
                    >
                        <h6 className="">영어 마스터 스터디</h6>
                        <Check size={20} className="text-white" />
                    </div>
                    <div
                        onClick={closeHandler}
                        className="hover:bg-gray200 flex h-11 cursor-pointer items-center justify-between px-5"
                    >
                        <h6 className="">죽음의 서바이벌</h6>
                        <Check size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </>
    );
}
