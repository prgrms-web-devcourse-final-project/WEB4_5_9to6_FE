import { goalsInfo } from "@/api/studies";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudyGoal() {
    const [goals, setGoals] = useState<Goal[]>();
    const params = useParams();

    useEffect(() => {
        const fetchGoals = async () => {
            const id = params?.studyId;
            if (typeof id === "string") {
                try {
                    const goalData: Goal[] = await goalsInfo(parseInt(id));
                    setGoals(goalData);
                } catch (err) {
                    console.error("목표 불러오기 실패", err);
                }
            }
        };
        fetchGoals();
    }, [params?.studyId]);

    return (
        <>
            <div className="w-full px-5">
                <h3 className="mt-6">스터디 주간 목표</h3>
                <div className="mt-[10px] flex flex-col gap-2">
                    {goals?.map((goal, index) => (
                        <div
                            key={index}
                            className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4"
                        >
                            <p className="text-[var(--color-gray1000)]">
                                {goal.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
