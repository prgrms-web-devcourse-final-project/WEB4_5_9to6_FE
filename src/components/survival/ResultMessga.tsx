"use client";

import Image from "next/image";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { useQuizResult } from "@/stores/quizStore";
import { useWinnerModalStore } from "@/stores/winnerModalStore";

export default function ResultMessage() {
    const { openModal } = useWinnerModalStore();
    const score = useQuizResult((state) => state.score);
    const isPass = score >= 3;
    const router = useRouter();

    return (
        <>
            <div className="text-center">
                <h5 className="h5 mb-3 text-[var(--color-main400)]">
                    서바이벌 Quiz
                </h5>
                {isPass ? (
                    <h1 className="h1 mb-9.5">결과</h1>
                ) : (
                    <h1 className="h1 mb-9.5">탈락</h1>
                )}
                <hr className="mb-9.5 text-[var(--color-gray200)]" />
            </div>
            <div className="animate-slideFadeDown flex flex-col items-center justify-center text-center">
                <h3 className="h3 mb-10">
                    총 5문제 중 {score}문제를 맞췄어요!
                </h3>
                {isPass ? (
                    <div className="animate-bounceShort -rotate-10">
                        <Image
                            src="/icons/thumb-up.svg"
                            alt="thumbup"
                            width={120}
                            height={120}
                            priority
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
            <div className="fixed bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                {isPass ? (
                    <Button
                        onClick={() => {
                            router.push("/survival-study/1");
                            openModal();
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
