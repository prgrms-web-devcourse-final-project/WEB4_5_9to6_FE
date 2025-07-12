"use client";
import { Check, Circle } from "lucide-react";
import { useState } from "react";
import Button from "../common/Button";
import BottomModal from "../common/BottomModal";

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
            <BottomModal title="목표체크" onClose={onClose} height="399">
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
            </BottomModal>
        </>
    );
}
