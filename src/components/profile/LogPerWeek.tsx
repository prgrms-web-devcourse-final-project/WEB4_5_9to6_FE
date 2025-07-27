"use client";

import { checkGoalsCompleted, checkWeekAttendance } from "@/api/studies";
import { fetchStudyWeeklyAllTime } from "@/api/timer";
import { useQuery } from "@tanstack/react-query";
import { Check, Minus } from "lucide-react";
import { useEffect, useState } from "react";

function CheckState() {
    return (
        <>
            <span className="bg-main500 flex h-8 w-8 items-center justify-center rounded-full">
                <Check size={16} className="text-white" />
            </span>
        </>
    );
} // 출석체크한 요일

function SkipState() {
    return (
        <>
            <span className="bg-gray1000 flex h-8 w-8 items-center justify-center rounded-full">
                <Minus size={16} className="text-white" />
            </span>
        </>
    );
} // 출석체크하지 않은 요일

function NotyetState() {
    return (
        <>
            <span className="bg-gray200 flex h-8 w-8 items-center justify-center rounded-full"></span>
        </>
    );
} // 출석체크가 아직인 요일

const dayOrder = [
    "MONDAY",
    "TUEDAY",
    "WEDDAY",
    "THUDAY",
    "FRIDAY",
    "SATDAY",
    "SUNDAY",
]; // 요일 순서

export default function LogPerWeek({
    id,
    study,
}: {
    id: string;
    study?: MemberStudyList;
}) {
    const toDay = new Date().getDay();
    const todayIndex = toDay === 0 ? 6 : toDay - 1;

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [goals, setGoals] = useState<GoalWeekCount[]>([]);

    const { data: studyWeekAttendance } = useQuery({
        queryKey: ["study-attendance", id, study?.studyId],
        enabled: !!study?.studyId,
        queryFn: () => checkWeekAttendance(study!.studyId, Number(id)),
    });

    const { data: studyWeekGoals } = useQuery({
        queryKey: ["study-goals", id, study?.studyId],
        enabled: !!study?.studyId,
        queryFn: () => checkGoalsCompleted(study!.studyId, Number(id)),
    });

    const { data: studyWeekTime } = useQuery({
        queryKey: ["study-all-time", id, study?.studyId],
        enabled: !!study?.studyId,
        queryFn: () => fetchStudyWeeklyAllTime(study!.studyId, Number(id)),
    });

    useEffect(() => {
        if (studyWeekAttendance?.attendances != null) {
            setAttendances(studyWeekAttendance.attendances || []);
        }

        if (studyWeekGoals?.goals != null) {
            setGoals(studyWeekGoals.goals || []);
        }

        if (studyWeekTime?.weekTotalStudyTime != null) {
            const total = studyWeekTime.weekTotalStudyTime;
            setHours(Math.floor(total / 60));
            setMinutes(total % 60);
        }
    }, [studyWeekAttendance, studyWeekGoals, studyWeekTime]);

    const attendanceMap = new Map(attendances.map((v) => [v.dayOfWeek, v]));

    return (
        <>
            <div className="w-full rounded-2xl bg-white p-5">
                <h6 className="text-gray700 mb-[14px]">주간 출석 현황</h6>
                <div className="mb-8 flex items-center justify-between">
                    {dayOrder.map((v, i) => {
                        const data = attendanceMap.get(v);

                        if (data?.attend) {
                            return <CheckState key={v} />;
                        }

                        return i <= todayIndex ? (
                            <SkipState key={v} />
                        ) : (
                            <NotyetState key={v} />
                        );
                    })}
                </div>
                <hr className="text-gray200 mb-5" />
                <h6 className="text-gray700 mb-[14px]">주차별 미션 진척도</h6>
                <div className="mb-8 gap-[9px]">
                    {goals.length > 0 ? (
                        goals
                            .sort((a, b) => Number(a.week) - Number(b.week))
                            .slice(-4)
                            .map((goal) => {
                                const percent = Math.min(
                                    (goal.count / 4) * 100,
                                    100,
                                );
                                const getColor = () => {
                                    if (percent >= 75) return "bg-main500";
                                    if (percent >= 50) return "bg-main400";
                                    if (percent >= 25) return "bg-main300";
                                    return "bg-main200";
                                };

                                return (
                                    <span
                                        key={goal.week}
                                        className="flex items-center justify-start"
                                    >
                                        <p className="c2 text-gray1000 w-12">
                                            {goal.week}주차
                                        </p>
                                        <div className="bg-gray200 h-[10px] w-60 rounded-sm">
                                            <div
                                                className={`${getColor()} h-[10px] rounded-sm`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </span>
                                );
                            })
                    ) : (
                        <span className="flex items-center justify-start">
                            <p className="c2 text-gray1000 w-12">1주차</p>
                            <div className="bg-gray200 h-[10px] w-60 rounded-sm"></div>
                        </span>
                    )}
                </div>
                <hr className="text-gray200 mb-5" />
                <h6 className="text-gray700 mb-[14px]">주간 내 타이머</h6>
                <div className="text-gray1000 mb-5 flex items-baseline gap-[2px]">
                    <span className="text-[32px]">{hours}</span>
                    <span className="mr-1 text-base">시간</span>
                    <span className="text-[32px]">{minutes}</span>
                    <span className="text-base">분</span>
                </div>
            </div>
        </>
    );
}
