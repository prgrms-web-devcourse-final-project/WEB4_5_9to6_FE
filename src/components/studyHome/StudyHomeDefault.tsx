"use client";
import { Users } from "lucide-react";
import StudyGoal from "../studyRecruit/StudyGoal";
// import { useState } from "react";
import NoticeBox from "../common/NoticeBox";

export default function StudyHomeDefault({
    notice,
    schedules,
    startTime,
    endTime,
    region,
    name,
    exLink,
    maxMembers,
    currentMemberCount,
    onOpen,
}: {
    notice: string | undefined;
    schedules: string[];
    startTime: string;
    endTime: string;
    region: string;
    name: string;
    exLink: string | undefined;
    maxMembers: number;
    currentMemberCount: number;
    onOpen: () => void;
}) {
    // const [expanded, setExpanded] = useState(false);
    const day: Record<string, string> = {
        MON: "월",
        TUE: "화",
        WED: "수",
        THU: "목",
        FRI: "금",
        SAT: "토",
        SUN: "일",
    };
    const scheduleString = (sche: string[]) => {
        const order = Object.keys(day);
        return sche
            .sort((a, b) => order.indexOf(a) - order.indexOf(b))
            .map((d) => day[d])
            .join(", ");
    };
    // const toggleHandler = () => {
    //     setExpanded((prev) => !prev);
    // };
    return (
        <>
            {/* 공지사항 */}
            <NoticeBox
                notice={notice}
                className="rounded-none bg-[#1D1D1D]/85 py-3"
                // isLeader={true}
                color="hall"
            />
            {/* <div className="relative h-fit w-full bg-[#1D1D1D]/85 px-5 py-3 backdrop-blur-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-col">
                        <p className="c2 text-[#D6D6D6]">공지사항</p>
                        <div
                            className={`relative overflow-hidden transition-all duration-600 ${expanded ? "max-h-[500px]" : "max-h-[61px]"}`}
                        >
                            <p
                                className={`c1 text-[#FFFFFF] ${expanded ? "" : "truncate"}`}
                            >
                                {notice}
                            </p>
                        </div>
                    </div>
                    <button
                        className="ml-5 h-5 w-5 flex-shrink-0 cursor-pointer text-[#FFFFFF]"
                        onClick={toggleHandler}
                    >
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                <div
                    className={`flex flex-col items-center ${expanded ? "mt-3 max-h-[50px]" : "max-h-0"} overflow-hidden transition-all duration-150`}
                >
                    <button
                        onClick={toggleHandler}
                        className="h6 right-0 cursor-pointer text-[var(--color-gray500)]"
                    >
                        접기
                    </button>
                </div>
            </div> */}

            {/* 스터디 정보 */}
            <div className="mt-3 w-full">
                <button
                    className="ml-5 flex h-[26px] w-[58px] cursor-pointer items-center justify-center gap-1 rounded-[50px] bg-[var(--color-gray200)] text-[var(--color-gray1000)] hover:bg-[var(--color-gray300)]"
                    onClick={onOpen}
                >
                    <Users className="h-[14px] w-[14px]" />
                    <span className="c2">
                        {currentMemberCount}/{maxMembers}
                    </span>
                </button>

                {/* 제목,일정 */}
                <p className="mt-3 ml-5 text-[22px] font-semibold text-[var(--color-gray1000)]">
                    {name}
                </p>
                <p className="b2 mt-2 ml-5 text-[var(--color-gray700)]">
                    매주 {schedules && scheduleString(schedules)}요일 ·{" "}
                    {startTime}~{endTime} · {region}
                </p>

                {/* 스터디 목표 */}
                <StudyGoal />

                {/* 학습 관련 링크 */}
                <div className="w-full px-5">
                    <h3 className="mt-8 text-[var(--color-gray1000)]">
                        학습 관련 링크
                    </h3>
                    {exLink ? (
                        <a
                            href={exLink}
                            target="blank"
                            className="c1 transiton-all mt-[10px] mb-[10px] flex h-[50px] w-full items-center rounded-[12px] border border-[var(--color-gray300)] px-4 text-[var-(--color-gray1000)] duration-200 ease-in-out hover:text-[var(--color-gray700)]"
                        >
                            {exLink}
                        </a>
                    ) : (
                        <h6 className="mt-[10px] mb-[10px] text-[var(--color-gray500)]">
                            링크가 없습니다.
                        </h6>
                    )}
                </div>
            </div>
        </>
    );
}
