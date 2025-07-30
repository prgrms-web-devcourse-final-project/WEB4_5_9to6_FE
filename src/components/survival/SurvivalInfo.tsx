import Image from "next/image";
import { regionMap, categoryMap, dayMap } from "../../utils/studyDataMap";
import { useThemeStore } from "@/stores/themeStore";

export default function SurvivalInfo({ study }: { study: StudyInfo }) {
    const theme = useThemeStore().theme;
    const isGreenTheme = theme === "green";
    return (
        <>
            <div className="mt-6 mb-7 w-full px-5">
                <div className="flex h-6 items-center justify-center gap-1.5">
                    <div className="c2 green:bg-[var(--color-gray800)] h-full rounded-lg bg-[var(--color-gray1000)] px-2 text-white dark:bg-[var(--color-gray800)]">
                        {categoryMap[study?.category ?? 0]}
                    </div>
                    <div className="c2 green:bg-[--color-green400] green:text-[var(--color-gray1000)] flex h-full rounded-lg bg-[var(--color-main400)] px-2 text-white">
                        {isGreenTheme ? (
                            <Image
                                src="/icons/dark_flash.svg"
                                alt="survival icon"
                                width={14}
                                height={14}
                            />
                        ) : (
                            <Image
                                src="/icons/flash.svg"
                                alt="survival icon"
                                width={14}
                                height={14}
                            />
                        )}
                        서바이벌
                    </div>
                </div>
                <h2 className="h2 green:text-white mt-[15px] flex justify-center text-[var(--color-gray1000)] dark:text-white">
                    {study?.name}
                </h2>
                <p className="green:text-[var(--color-gray500)] mt-1.5 text-center text-[var(--color-gray700)] dark:text-[var(--color-gray500)]">
                    매주{" "}
                    {study?.schedules
                        ?.map((day: string) => dayMap[day])
                        .join(", ")}
                    요일 {study?.startTime}~{study?.endTime} ·{" "}
                    {regionMap[study?.region ?? 0]}
                </p>
                <h4 className="h4 green:text-white mt-6.5 text-center dark:text-white">
                    참가자 : {study?.currentMemberCount}명
                </h4>
            </div>
            <hr className="green:text-[var(--color-gray800)] mx-5 mt-6 text-[var(--color-gray200)] dark:text-[var(--color-gray800)]" />
            <div className="mb-7 w-full px-5">
                <h3 className="green:text-white mt-6 dark:text-white">
                    서바이벌 목표
                </h3>
                <div className="mt-[10px] flex cursor-default flex-col gap-2">
                    {study?.goals
                        ?.slice(0, 4)
                        .map((schedule: Goal, index: number) => (
                            <div
                                key={index}
                                className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4 dark:bg-[var(--color-gray1000)]"
                            >
                                <div className="flex">
                                    <p className="c1 text-[var(--color-gray1000) mr-3 font-medium dark:text-white">
                                        {index + 1}주차
                                    </p>
                                    <p className="c1 text-[var(--color-gray1000)] dark:text-white">
                                        {schedule?.content}
                                    </p>
                                </div>
                                <p className="text-[var(--color-main400)]">
                                    500P
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
