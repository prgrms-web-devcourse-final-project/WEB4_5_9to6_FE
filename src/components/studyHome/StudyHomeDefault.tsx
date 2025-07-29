"use client";
import { Users } from "lucide-react";
import StudyGoal from "../studyRecruit/StudyGoal";
import NoticeBox from "../common/NoticeBox";
import { regionMap, scheduleString } from "@/utils/studyDataMap";

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
    startDate,
    endDate,
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
    startDate: string;
    endDate: string;
    onOpen: () => void;
}) {
    const changeDate = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startYear = start.getFullYear();
        const startMonth = start.getMonth() + 1;
        const startDay = start.getDate();

        const endYear = end.getFullYear();
        const endMonth = end.getMonth() + 1;
        const endDay = end.getDate();

        const format = (month: number) => (month < 10 ? `0${month}` : month);

        const monthDiff =
            (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

        return `${startYear}.${format(startMonth)}.${format(startDay)}~${endYear}.${format(endMonth)}.${format(endDay)} (${monthDiff}개월)`;
    };

    return (
        <>
            {/* 공지사항 */}
            <NoticeBox
                notice={notice}
                className="dark:border-gray900 rounded-none border border-[#1D1D1D] bg-[#1D1D1D]/85 py-3"
                color="hall"
            />

            {/* 스터디 정보 */}
            <div className="mt-3 w-full">
                <button
                    className="dark:bg-gray900 dark:hover:bg-gray1000 ml-5 flex h-[26px] w-[58px] cursor-pointer items-center justify-center gap-1 rounded-[50px] bg-[var(--color-gray200)] text-[var(--color-gray1000)] hover:bg-[var(--color-gray300)] dark:text-white"
                    onClick={onOpen}
                >
                    <Users className="h-[14px] w-[14px]" />
                    <span className="c2 dark:text-white">
                        {currentMemberCount}/{maxMembers}
                    </span>
                </button>

                {/* 제목,일정 */}
                <p className="mt-3 ml-5 text-[22px] font-semibold text-[var(--color-gray1000)] dark:text-white">
                    {name}
                </p>
                <p className="b2 dark:text-gray500 mt-2 ml-5 text-[var(--color-gray700)]">
                    매주 {schedules && scheduleString(schedules)}요일 ·{" "}
                    {startTime}~{endTime} · {regionMap[region]}
                </p>
                <p className="b2 dark:text-gray500 ml-5 text-[var(--color-gray700)]">
                    {changeDate(startDate, endDate)}
                </p>

                {/* 스터디 목표 */}
                <StudyGoal />

                {/* 학습 관련 링크 */}
                <div className="w-full px-5">
                    <h3 className="mt-8 text-[var(--color-gray1000)] dark:text-white">
                        학습 관련 링크
                    </h3>
                    {exLink ? (
                        <a
                            href={exLink}
                            target="blank"
                            className="c1 transiton-all dark:border-gray800 dark:bg-gray1000 dark:hover:text-gray200 mt-[10px] mb-[10px] flex h-[50px] w-full items-center rounded-[12px] border border-[var(--color-gray300)] px-4 text-[var-(--color-gray1000)] duration-200 ease-in-out hover:text-[var(--color-gray700)] dark:text-white"
                        >
                            {exLink}
                        </a>
                    ) : (
                        <h6 className="dark:text-gray600 mt-[10px] mb-[10px] text-[var(--color-gray500)]">
                            링크가 없습니다.
                        </h6>
                    )}
                </div>
            </div>
        </>
    );
}
