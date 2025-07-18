import Image from "next/image";

export default function SurvivalInfo({ study }: { study: StudyInfo }) {
    const categoryMap: Record<string, string> = {
        ALL: "전체",
        LANGUAGE: "어학",
        JOB: "취업",
        PROGRAMMING: "프로그래밍",
        EXAM_PUBLIC: "고시&공무원",
        EXAM_SCHOOL: "수능&내신",
        ETC: "기타",
    };
    const dayMap: Record<string, string> = {
        MON: "월요일",
        TUE: "화요일",
        WED: "수요일",
        THU: "목요일",
        FRI: "금요일",
        SAT: "토요일",
        SUN: "일요일",
    };
    const regionMap: Record<string, string> = {
        ONLINE: "온라인",
        SEOUL: "서울",
        INCHEON: "인천",
        GYEONGGI: "경기",
        DAEJEON: "대전",
        GANGWON: "강원",
        SEJONG: "세종",
        CHUNGBUK: "충북",
    };

    return (
        <>
            <div className="mt-6 mb-7 w-full px-5">
                <div className="flex h-6 items-center justify-center gap-1.5">
                    <div className="c2 h-full rounded-lg bg-[var(--color-gray1000)] px-2 text-white">
                        {categoryMap[study?.category ?? 0]}
                    </div>
                    <div className="c2 flex h-full rounded-lg bg-[var(--color-main400)] px-2 text-white">
                        <Image
                            src="/icons/flash.svg"
                            alt="survival icon"
                            width={14}
                            height={14}
                        />
                        서바이벌
                    </div>
                </div>
                <h2 className="h2 mt-[15px] flex justify-center text-[var(--color-gray1000)]">
                    {study?.name}
                </h2>
                <p className="mt-1.5 text-center text-[var(--color-gray700)]">
                    매주{" "}
                    {study?.schedules?.map((day) => dayMap[day]).join(", ")}{" "}
                    {study?.startTime}~{study?.endTime} ·{" "}
                    {regionMap[study?.region ?? 0]}
                </p>
                <h4 className="h4 mt-6.5 text-center">
                    참가자 :{study?.currentMemberCount}명
                </h4>
            </div>
            <hr className="mx-5 mt-6 text-[var(--color-gray200)]" />
            <div className="mb-7 w-full px-5">
                <h3 className="mt-6">서바이벌 목표</h3>
                <div className="mt-[10px] flex flex-col gap-2">
                    {study?.goals?.slice(0, 4).map((schedule, index) => (
                        <div
                            key={index}
                            className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4"
                        >
                            <div className="flex">
                                <p className="c1 mr-3 font-medium text-[var(--color-gray1000)]">
                                    {index + 1}주차
                                </p>
                                <p className="c1 text-[var(--color-gray1000)]">
                                    {schedule.content}
                                </p>
                            </div>
                            <p className="text-[var(--color-main400)]">
                                {100 * (index + 1)}P
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
