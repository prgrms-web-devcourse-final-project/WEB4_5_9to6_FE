"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import BottomModal from "@/components/common/BottomModal";
import Button from "@/components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { getCheckGoal, postGoalsCompleted } from "@/api/studies";
import { customAlert } from "@/utils/customAlert";

export default function StudyGoalModal({
    studyId,
    isOpen,
    onClose,
}: {
    studyId: number;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [isCheck, setIsCheck] = useState<boolean[]>([]);
    const { changeClass } = useAnimationStore();

    const { data: goalData } = useQuery<CheckGoal[]>({
        queryKey: ["goalModalData", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다.");
            const fetchGoal = await getCheckGoal(studyId);
            if (fetchGoal.length > 5) {
                return fetchGoal.slice(0, 5);
            } else {
                return fetchGoal;
            }
        },
    });

    const checkHandler = (index: number) => {
        setIsCheck((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            console.log(updated);
            return updated;
        });
    };
    const closeHandler = () => {
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 200);
    };

    const submitHandler = async () => {
        for (let i = 0; i < isCheck.length; i++) {
            if (isCheck[i] && goalData) {
                const goalId = goalData[i].goalId;
                const message = await postGoalsCompleted(studyId, goalId);
                if (message === "정상적으로 완료되었습니다.") {
                    customAlert({
                        message: "목표가 체크되었습니다!",
                        linkLabel: "닫기",
                        onClick: () => {},
                    });
                } else {
                    customAlert({
                        message: "목표가 체크에 실패하였습니다.",
                        linkLabel: "닫기",
                        onClick: () => {},
                    });
                }
            }
        }
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            onClose();
        }, 200);
    };

    useEffect(() => {
        if (goalData) {
            setIsCheck(Array(goalData.length).fill(false));
        }
    }, [goalData]);

    return (
        <>
            <BottomModal
                title="목표체크"
                onClose={onClose}
                height="399"
                isOpen={isOpen}
            >
                <div className="mt-7 flex flex-col gap-2 px-5">
                    {goalData &&
                        goalData.map((goal, index) => (
                            <div
                                key={index}
                                className={`flex h-[50px] w-full items-center justify-between rounded-[12px] ${goal.achieved ? "bg-[var(--color-gray400)]" : "bg-[var(--color-gray100)]"} px-4 py-4`}
                            >
                                <div className="flex items-center gap-2">
                                    <p className="text-[var(--color-gray1000)]">
                                        {goal.content}
                                    </p>
                                </div>

                                {goal.achieved && (
                                    <div className="disabled flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-gray800)]">
                                        <Check className="h-4 w-4 text-[var(--color-gray400)]" />
                                    </div>
                                )}
                                {!goal.achieved && (
                                    <button
                                        className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ${isCheck[index] ? "bg-[var(--color-main500)]" : "border border-[var(--color-gray400)]"}`}
                                        onClick={() => checkHandler(index)}
                                    >
                                        {isCheck[index] && (
                                            <Check className="h-4 w-4 text-[#FFFFFF]" />
                                        )}
                                    </button>
                                )}
                            </div>
                        ))}
                </div>

                <div className="mx-5 mt-auto flex items-center justify-between gap-2">
                    <Button
                        onClick={closeHandler}
                        color="gray"
                        className="basis-[35.9%] cursor-pointer"
                    >
                        취소
                    </Button>
                    <Button
                        color="black"
                        className="basis-[64.1%]"
                        onClick={() => submitHandler()}
                    >
                        확인완료
                    </Button>
                </div>
            </BottomModal>
        </>
    );
}
