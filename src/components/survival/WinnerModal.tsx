"use client";

import { useWinnerModalStore } from "@/stores/winnerModalStore";
import { useEffect, useState } from "react";
import trophy from "../../assets/images/trophy.png";
import Image from "next/image";
import Button from "../common/Button";

export default function WinnerModal() {
    const { isOpen, closeModal } = useWinnerModalStore();
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
            closeModal();
        }, 300);
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
                        <Image
                            src={trophy}
                            alt="트로피"
                            className="mb-8 h-35 w-35 transition-all duration-200 hover:brightness-120"
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
