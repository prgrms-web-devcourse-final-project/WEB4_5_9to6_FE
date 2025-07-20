"use client";

import { fetchStudyWeeklyAllTime } from "@/api/timer";
import { useQuery } from "@tanstack/react-query";
import { Check, Minus } from "lucide-react";
import { useEffect, useState } from "react";

export default function LogPerWeek({
    id,
    study,
}: {
    id: string;
    study?: StudyInfo;
}) {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const { data: studyWeekTime } = useQuery({
        queryKey: ["study-all-time", id, study?.studyId],
        enabled: !!study?.studyId,
        queryFn: () => fetchStudyWeeklyAllTime(study!.studyId, Number(id)),
    });

    useEffect(() => {
        console.log("이거", studyWeekTime);
        if (studyWeekTime?.weekTotalStudyTime != null) {
            const total = studyWeekTime.weekTotalStudyTime;
            setHours(Math.floor(total / 60));
            setMinutes(total % 60);
        }
    }, [studyWeekTime]);

    return (
        <>
            <div className="w-full rounded-2xl bg-white p-5">
                <h6 className="text-gray700 mb-[14px]">주간 출석 현황</h6>
                <div className="mb-8 flex items-center justify-between">
                    <span className="bg-main500 flex h-8 w-8 items-center justify-center rounded-full">
                        <Check size={16} className="text-white" />
                    </span>

                    <span className="bg-gray1000 flex h-8 w-8 items-center justify-center rounded-full">
                        <Minus size={16} className="text-white" />
                    </span>
                    <span className="bg-gray100 flex h-8 w-8 items-center justify-center rounded-full"></span>
                    <span className="bg-gray100 flex h-8 w-8 items-center justify-center rounded-full"></span>
                </div>
                <hr className="text-gray200 mb-5" />
                <h6 className="text-gray700 mb-[14px]">주차별 미션 진척도</h6>
                <div className="mb-8 gap-[9px]">
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">1주차</p>
                        <div className="bg-main400 h-[10px] w-60 rounded-sm"></div>
                    </span>
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">2주차</p>
                        <div className="bg-main300 h-[10px] w-40 rounded-sm"></div>
                    </span>
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">3주차</p>
                        <div className="bg-main400 h-[10px] w-60 rounded-sm"></div>
                    </span>
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">4주차</p>
                        <div className="bg-main200 h-[10px] w-20 rounded-sm"></div>
                    </span>
                </div>
                <hr className="text-gray200 mb-5" />
                <h6 className="text-gray700 mb-[14px]">주간 내 타이머</h6>
                <div className="text-gray1000 mb-5 flex items-baseline gap-[2px]">
                    <span className="text-[32px]">{hours}</span>
                    <span className="text-base">시간</span>
                    <span className="text-[32px]">{minutes}</span>
                    <span className="text-base">분</span>
                </div>
            </div>
        </>
    );
}
