"use client";

import { useAlarmStore } from "@/stores/alarmStore";
import { studyStartStore } from "@/stores/studyStartStore";
import { Bell, ListChecks, MessageSquare, Timer } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function StudyTimer({
    // pause,
    setIsGoalOpen,
    // studyTimeSec,
}: {
    // pause: boolean;
    setIsGoalOpen: Dispatch<SetStateAction<boolean>>;
    // studyTimeSec: string;
}) {
    const router = useRouter();
    const params = useParams();
    const studyId = params.studyId;
    const { pause, setPause, seconds, isStart } = studyStartStore();
    const alarms = useAlarmStore((state) => state.alarmList);

    const formatTime = (totalSeconds: number) => {
        const hr = Math.floor(totalSeconds / 3600);
        const min = Math.floor((totalSeconds % 3600) / 60);
        const sec = totalSeconds % 60;
        return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };
    const chatHandler = () => {
        setPause(true);
        router.push(`/study/${studyId}/chat`);
        console.log("isStart", isStart);
    };
    const notiHandler = () => {
        setPause(true);
        router.push("/notifications");
        console.log("isStart", isStart);
    };
    return (
        <>
            {/* 타이머 */}
            <div className="mt-[117px] flex w-full flex-col items-center justify-center text-[var(--color-gray1000)] dark:text-white">
                <p className="ml-4 text-[32px] font-bold">
                    {pause ? "쉬는중.." : "스터디중.."}
                </p>
                <div className="mt-3 flex">
                    <Timer className="h-5 w-5 dark:text-white" />
                    <span className="b1 ml-[1px] dark:text-white">
                        스터디시간
                    </span>
                    <h3 className="ml-1 text-[var(--color-main400)]">
                        {formatTime(seconds)}
                    </h3>
                </div>

                {/* 채팅,목표,알림 */}
                <div className="mt-[54px] flex items-center gap-4">
                    <div className="flex h-[102px] w-[72px] flex-col items-center">
                        <button
                            className="dark:bg-gray1000 flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-[500px] bg-[var(--color-gray100)]"
                            onClick={chatHandler}
                        >
                            <MessageSquare className="h-6 w-6 text-[var(--color-gray1000)] dark:text-white" />
                        </button>
                        <p className="c1 mt-3 text-[var(--color-gray1000)] dark:text-white">
                            그룹채팅
                        </p>
                    </div>

                    <div className="flex h-[102px] w-[72px] flex-col items-center">
                        <button
                            className="dark:bg-gray1000 flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-[500px] bg-[var(--color-gray100)]"
                            onClick={() => setIsGoalOpen(true)}
                        >
                            <ListChecks className="h-6 w-6 text-[var(--color-gray1000)] dark:text-white" />
                        </button>
                        <p className="c1 mt-3 text-[var(--color-gray1000)] dark:text-white">
                            목표체크
                        </p>
                    </div>

                    <div className="flex h-[102px] w-[72px] flex-col items-center justify-center">
                        <button
                            className="dark:bg-gray1000 flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-[500px] bg-[var(--color-gray100)]"
                            onClick={notiHandler}
                        >
                            <div className="relative">
                                <Bell
                                    className="text-gray1000 h-6 w-6 cursor-pointer transition-colors duration-200 ease-in hover:text-black dark:text-white"
                                    onClick={() =>
                                        router.push("/notifications")
                                    }
                                />
                                {alarms.filter(
                                    (alarm) => alarm.isRead === false,
                                ).length > 0 && (
                                    <>
                                        <div className="absolute top-[-1px] right-0 h-2 w-2 animate-ping rounded-full bg-red-500" />
                                        <div className="absolute top-[-1px] right-0 h-2 w-2 rounded-full bg-red-600" />
                                    </>
                                )}
                            </div>
                        </button>
                        <p className="c1 mt-3 text-[var(--color-gray1000)] dark:text-white">
                            알림
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
