"use client";

import { useWinnerModalStore } from "@/stores/winnerModalStore";
import { useEffect, useState } from "react";
// import trophy from "../../assets/images/trophy.png";
// import Image from "next/image";
import Button from "../common/Button";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function WinnerModal() {
    const { isOpen, closeModal } = useWinnerModalStore();
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
            <div
                onClick={closeHandler}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
                <div
                    className={`${animationClass} mx-5 flex w-full flex-col rounded-3xl bg-white p-8`}
                >
                    <div className="flex flex-col items-center justify-between">
                        <p className="text-main400 mb-5 text-[28px] font-bold">
                            +2,500P
                        </p>
                        <DotLottieReact
                            src="https://lottie.host/711210fb-9240-4a0f-b624-6668baac5430/Z7uh4wOSJ6.lottie"
                            autoplay
                        />
                        <h4 className="text-gray1000">축하드립니다!</h4>
                        <h4 className="text-gray1000 mb-12">
                            당신은 스터디계의
                            <span className="text-main400"> 배틀로얄</span> 승자
                        </h4>
                        <Button
                            onClick={closeHandler}
                            className="bg-gray200 hover:bg-gray300 text-gray1000 h-12.5 w-40"
                        >
                            닫기
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
