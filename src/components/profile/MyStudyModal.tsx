"use client";

import { useProfileStore } from "@/stores/memberStore";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import { useMyStudyModalStore } from "@/stores/myStudyModalStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import MyStudyItem from "./MyStudyItem";

export default function MyStudyModal() {
    const [isVisible, setIsVisible] = useState(false);
    const { isOpen, closeModal, studyIndex, changeIndex } =
        useMyStudyModalStore();
    const { animationClass, changeClass } = useAnimationStore();
    const { data } = useProfileStore();

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
                    {data?.userStudies.map((v, i) => (
                        <MyStudyItem
                            key={i}
                            closeHandler={() => {
                                changeIndex(i);
                                closeHandler();
                            }}
                            title={v.title}
                            selected={studyIndex === i}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
