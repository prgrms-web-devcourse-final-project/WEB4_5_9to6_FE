"use client";
import { Check, Circle, X } from "lucide-react";
import { useState } from "react";
import Button from "../common/Button";

export default function StudyGoalModal({ onClose }: { onClose: () => void }) {
    const goals = [
        "히라가나 깜지 3만번 쓰기",
        "스터디 숙제 완수하기",
        "라틴어로 경비아저씨와 대화하기",
        "스타벅스 닉네임 라틴어로 바꾸기",
    ];
    const [isCheck, setIsCheck] = useState<boolean[]>(
        Array(goals.length).fill(false),
    );
    const checkHandler = (index: number) => {
        setIsCheck((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };
    return (
        <>
            <div className="fixed inset-0 z-30 bg-[#000000]/30">
                <div className="absolute right-[10px] bottom-5 left-[10px] z-50 flex h-[479px] flex-col rounded-3xl bg-[#FFFFFF] py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="ml-5 text-[var(--color-gray1000)]">
                            목표체크
                        </h3>
                        <X
                            className="mr-5 h-6 w-6 cursor-pointer text-[#161616]"
                            onClick={onClose}
                        />
                    </div>

                    <div className="mt-7 flex flex-col gap-2 px-5">
                        {goals.map((goal, index) => (
                            <div
                                key={index}
                                className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4"
                            >
                                <div className="flex items-center gap-2">
                                    <p className="text-[13px] text-[var(--color-gray1000)]">
                                        {index + 1}주차
                                    </p>
                                    <p className="text-[var(--color-gray1000)]">
                                        {goal}
                                    </p>
                                </div>
                                {!isCheck[index] && (
                                    <Circle
                                        className="h-5 w-5 cursor-pointer text-[var(--color-gray500)]"
                                        onClick={() => checkHandler(index)}
                                    />
                                )}
                                {isCheck[index] && (
                                    <button
                                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[var(--color-main500)]"
                                        onClick={() => checkHandler(index)}
                                    >
                                        <Check className="h-4 w-4 text-[#FFFFFF]" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mx-5 mt-auto flex items-center justify-between gap-2">
                        <Button
                            onClick={onClose}
                            color="gray"
                            className="basis-[35.9%] cursor-pointer"
                        >
                            취소
                        </Button>
                        <Button
                            color="black"
                            className="basis-[64.1%]"
                            onClick={onClose}
                        >
                            확인완료
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
