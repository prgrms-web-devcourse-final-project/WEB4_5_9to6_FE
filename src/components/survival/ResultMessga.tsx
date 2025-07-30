"use client";

import Image from "next/image";
import Button from "../common/Button";
import { useParams, useRouter } from "next/navigation";
import { useQuizResult } from "@/stores/quizStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSurvivalStore } from "@/stores/survivalStore";
import { useWinnerModalStore } from "@/stores/winnerModalStore";

export default function ResultMessage() {
    const score = useQuizResult((state) => state.score);
    const isSurvived = score >= 3;
    const router = useRouter();
    const params = useParams();
    const studyId = params.studyId;
    const { study } = useSurvivalStore();
    const { openModal } = useWinnerModalStore();

    // 승리 모달 조건
    const winnerModal = () => {
        if (!study?.startDate) return;

        const start = new Date(study.startDate);
        if (isNaN(start.getTime())) {
            console.error(study.startDate);
            return;
        }

        const today = new Date();
        const diffDays = Math.floor(
            (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );
        const currentWeek = Math.floor(diffDays / 7) + 1;

        if (currentWeek === 4) {
            openModal(currentWeek);
        }
    };

    return (
        <>
            <div className="text-center">
                <h5 className="h5 mb-3 text-[var(--color-main400)]">
                    서바이벌 Quiz
                </h5>
                {isSurvived ? (
                    <h1 className="h1 mb-9.5 dark:text-white">결과</h1>
                ) : (
                    <h1 className="h1 mb-9.5 dark:text-white">탈락</h1>
                )}
                <hr className="mb-9.5 text-[var(--color-gray200)] dark:text-[var(--color-gray800)]" />
            </div>
            <div className="animate-slideFadeDown flex flex-col items-center justify-center text-center">
                <h3 className="h3 mb-10 dark:text-white">
                    총 5문제 중 {score}문제를 맞췄어요!
                </h3>
                {isSurvived ? (
                    <div className="relative w-full">
                        <DotLottieReact
                            src="https://lottie.host/bb7e10dd-08e1-4c7c-9cef-3b2df68b979c/c3d3wpoXAr.lottie"
                            autoplay
                            loop
                        />
                        <Image
                            src="/icons/thumb-up.svg"
                            alt="thumbup"
                            width={120}
                            height={120}
                            priority
                            className="animate-bounceShort absolute top-1/2 left-1/2 z-20 -translate-x-2/3 -translate-y-1/2 -rotate-15"
                        />
                    </div>
                ) : (
                    <div className="animate-rotate">
                        <Image
                            src="/icons/Dizzy-Face.png"
                            alt="thumbup"
                            width={120}
                            height={120}
                            priority
                        />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)] dark:border-t-[var(--color-gray800)]">
                {isSurvived ? (
                    <Button
                        onClick={() => {
                            router.push(`/survival-study/${studyId}`);
                            winnerModal();
                        }}
                        className="mx-5 my-5 bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]"
                    >
                        스터디 홀으로
                    </Button>
                ) : (
                    <Button
                        onClick={() => router.push("/")}
                        className="mx-5 my-5 bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]"
                    >
                        홈으로
                    </Button>
                )}
            </div>
        </>
    );
}
