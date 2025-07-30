"use client";

import { axiosInstance } from "@/api";
import Button from "@/components/common/Button";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExitModal({
    isOpen,
    onClose,
    studyId,
    currentWeek,
    myMember,
}: {
    isOpen: boolean;
    onClose: () => void;
    studyId: number;
    currentWeek: number;
    myMember?: StudyMember;
}) {
    const router = useRouter();
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

    const giveUpHandler = async () => {
        const studyMemberId = myMember?.studyMemberId;
        try {
            if (!studyId || !studyMemberId) {
                throw new Error("필요한 정보가 없습니다.");
            }

            if (!myMember) {
                throw new Error("스터디 멤버를 찾을 수 없습니다.");
            }

            await axiosInstance.post(
                `quiz/${studyId}/weeks/${currentWeek}/results`,
                {
                    studyMemberId,
                    survived: false,
                },
            );
            console.log("퀴즈 중단하기");
            router.push("/");
        } catch (err) {
            console.error("중단 처리 실패", err);
        }
    };

    const closeHandler = () => {
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!isVisible) return null;

    return (
        <>
            {isOpen && (
                <div>
                    <div
                        onClick={closeHandler}
                        className={`dark:border-1-gray-200 fixed inset-0 z-40 bg-black/30 duration-200 dark:bg-[#222] ${animationClass === "animate-modalFadeIn" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                    <div
                        className={`${animationClass} fixed inset-0 z-100 flex items-center justify-center p-10`}
                    >
                        <div className="z-30 flex w-full max-w-sm flex-col items-center justify-center rounded-2xl bg-white p-7 dark:bg-[#222222]">
                            <Image
                                src="/icons/Warning.png"
                                alt="warning icon"
                                width={120}
                                height={120}
                                priority
                                style={{
                                    width: "auto",
                                    height: "auto",
                                    marginTop: "4px",
                                }}
                            />
                            <h2 className="h2 mt-6">퀴즈를 종료하시겠어요?</h2>
                            <h5 className="h5 mt-3">
                                지금 나가면 미응시로 처리되어 탈락하게 됩니다.
                            </h5>
                            <div className="mt-12 flex w-full items-center justify-between gap-4">
                                <Button
                                    onClick={closeHandler}
                                    className="h-12.5 bg-[var(--color-gray200)] text-black hover:bg-[var(--color-gray300)]"
                                >
                                    계속하기
                                </Button>
                                <Button
                                    onClick={giveUpHandler}
                                    className="h-12.5 bg-[var(--color-main500)] hover:bg-[var(--color-main600)]"
                                >
                                    중단하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
