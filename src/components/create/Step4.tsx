import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { Trash2 } from "lucide-react";

export default function Step4({
    continueStep,
    requestGoals,
}: {
    continueStep: () => void;
    requestGoals: (goals: { goalId: number; content: string }[]) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [goals, setGoals] = useState<string[]>([""]);
    const [goalsError, setGoalsError] = useState<boolean[]>([false]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (goalsError.some((goalError) => goalError === true)) return;

        requestGoals(
            goals
                .filter((goal) => goal !== "")
                .map((goal, i) => ({ goalId: i, content: goal })),
        );
        continueStep();
    };

    const changeGoalHandler = (index: number, value: string) => {
        const newGoals = [...goals];
        newGoals[index] = value;
        setGoals(newGoals);
    };

    const addGoalHandler = () => {
        setGoals([...goals, ""]);
    };

    const deleteGoalHandler = (index: number) => {
        const newGoals = [...goals];
        newGoals.splice(index, 1);
        setGoals(newGoals);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const newErrors = goals.map((goal) => {
            return goal.length > 0 && (goal.length < 2 || goal.length > 20);
        });
        setGoalsError(newErrors);
    }, [goals]);

    return (
        <>
            <form className="step-form" onSubmit={submitHandler}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold text-[var(--color-gray1000)] delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    스터디 목표를 알려주세요
                </h1>
                <div
                    className={`mt-5 flex flex-col gap-1 delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                >
                    <Input
                        placeholder="주간 목표 입력"
                        value={goals[0]}
                        onChange={(e) =>
                            changeGoalHandler(
                                0,
                                e.target.value.replace(/^\s+/, ""),
                            )
                        }
                        label="스터디 목표"
                        error={goalsError[0]}
                        errorMsg="스터디 목표는 2자 이상, 20자 이하여야 합니다."
                    />
                    {goals.slice(1).map((goal, index) => (
                        <Input
                            key={index + 1}
                            placeholder="주간 목표 입력"
                            value={goal}
                            onChange={(e) =>
                                changeGoalHandler(
                                    index + 1,
                                    e.target.value.replace(/^\s+/, ""),
                                )
                            }
                            icon={
                                <Trash2
                                    strokeWidth={1}
                                    size={20}
                                    onClick={() => deleteGoalHandler(index + 1)}
                                />
                            }
                            error={goalsError[index + 1]}
                            errorMsg="스터디 목표는 2자 이상, 20자 이하여야 합니다."
                        />
                    ))}
                </div>
                <div
                    className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                >
                    {goals.length === 5 ? (
                        <Button
                            type="button"
                            disabled
                            className="mt-4 bg-[var(--color-gray100)] pb-1.5 text-4xl font-extralight"
                        >
                            +
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            color="gray"
                            className="mt-4 bg-[var(--color-gray100)] pb-1.5 text-4xl font-extralight hover:bg-[var(--color-gray200)]"
                            onClick={addGoalHandler}
                        >
                            +
                        </Button>
                    )}
                </div>
                <div className="h-[] absolute bottom-5 w-[calc(100%-40px)]">
                    {goalsError.some((goalError) => goalError === true) ? (
                        <Button type="button" disabled>
                            다음
                        </Button>
                    ) : goals.some((goal) => goal !== "") ? (
                        <Button type="submit">다음</Button>
                    ) : (
                        <Button type="submit">건너뛰기</Button>
                    )}
                </div>
            </form>
        </>
    );
}
