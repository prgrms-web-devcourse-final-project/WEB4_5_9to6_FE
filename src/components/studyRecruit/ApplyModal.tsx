"use-client";
import { studyApply } from "@/api/studies";
import { fetchSurvApply } from "@/api/studyList";
import { useAuthStore } from "@/stores/authStore";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import { useSurvivalStore } from "@/stores/survivalStore";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyModal({
    isOpen,
    onClose,
    onApply,
    showTextArea = true,
    className,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
    showTextArea?: boolean;
    className?: string;
    children?: React.ReactNode;
}) {
    const [applyMent, setApplyMent] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const { animationClass, changeClass } = useAnimationStore();
    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : null;
    const myId = useAuthStore((state) => state.myInfo);
    const suvivalInfo = useSurvivalStore();

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

    const applyMutation = useMutation({
        mutationFn: () => {
            if (studyId === null) throw new Error("잘못된 스터디 ID");
            return studyApply(studyId, applyMent);
        },
        onSuccess: (data) => {
            console.log("신청 성공", data);
            onClose();
            onApply();
        },
        onError: (error) => {
            console.error("신청 실패", error);
        },
    });

    const survivalApply = useMutation({
        mutationFn: () => {
            if (studyId === null) throw new Error("잘못된 스터디 ID");
            return fetchSurvApply(studyId, myId?.id ?? 0);
        },
        onSuccess: (data) => {
            console.log("서바이벌 신청 성공", data);
            onClose();
            onApply();
        },
        onError: (error) => {
            console.error("서바이벌 신청 실패", error);
        },
    });
    const closeHandler = () => {
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 200);
    };

    const applyHandler = () => {
        if (suvivalInfo.study?.studyType === "SURVIVAL") {
            survivalApply.mutate();
        } else {
            applyMutation.mutate();
        }
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/30">
                <div
                    className={`${animationClass} ${className} absolute z-50 flex flex-col rounded-[24px] bg-white px-6 pt-2 pb-5`}
                >
                    <div className="flex h-[65px] w-full items-center justify-between">
                        <h3 className="text-[var(--color-gray1000)]">
                            스터디 신청
                        </h3>
                        <X
                            onClick={closeHandler}
                            className="h-6 w-6 cursor-pointer text-[#161616]"
                        />
                    </div>
                    {children}
                    {showTextArea && (
                        <>
                            <p className="b2 text-[var(--color-gray1000)]">
                                하고싶은 말
                            </p>
                            <div className="mt-2 h-[162px] w-full rounded-[12px] border border-[var(--color-gray300)] p-4">
                                <textarea
                                    value={applyMent}
                                    placeholder="스터디에 참여하고 싶은 이유를 함께 적어주세요. (50자 이내)"
                                    onChange={(e) =>
                                        setApplyMent(e.target.value)
                                    }
                                    className="b2 h-full w-full resize-none text-[var(--color-gray500)] outline-none"
                                />
                            </div>
                        </>
                    )}
                    <div className="mt-10 flex w-full items-center gap-2">
                        <button
                            onClick={closeHandler}
                            className="flex h-[50px] w-[112px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--color-gray200)] transition-all duration-200 ease-in-out hover:bg-[var(--color-gray300)]"
                        >
                            <h5 className="text-[var(--color-gray1000)]">
                                취소
                            </h5>
                        </button>
                        <button
                            onClick={applyHandler}
                            className="flex h-[50px] w-[180px] cursor-pointer items-center justify-center rounded-[12px] bg-[var(--color-main500)] transition-all duration-200 ease-in-out hover:bg-[var(--color-main600)]"
                        >
                            <h5 className="text-[var(--color-white)]">
                                신청하기
                            </h5>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
