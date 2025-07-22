import Image from "next/image";
import flash from "@/assets/Flash--filled.svg";
import SurvivalCard from "../common/SurvivalCard";
import StudyCard from "../common/StudyCard";
// import avatar from "@/assets/avatar.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import { useEffect, useState } from "react";
import { studyMembers } from "@/api/studies";
import StudyResult from "./SearchResult";
import { useQueries } from "@tanstack/react-query";
import { categoryMap, regionMap, scheduleString } from "@/utils/studyDataMap";

export default function StudyLists({
    defaultStudies,
    survStudies,
    search,
}: {
    defaultStudies: Study[];
    survStudies: Study[] | undefined;
    search: string;
}) {
    const isNewFunc = (start: string) => {
        const now = new Date();
        const startDate = new Date(start);
        return now < startDate;
    };

    const leaderQueries = useQueries({
        queries: defaultStudies.map((study) => ({
            queryKey: ["studyMembers", study.studyId],
            queryFn: () => studyMembers(study.studyId),
            select: (data: Members[]) => data.find((m) => m.role === "LEADER"),
            enabled: defaultStudies.length > 0,
            staleTime: 1000 * 60 * 3,
        })),
    });
    const leaders = leaderQueries.map((q) => q.data);
    // console.log("리더아이디", leaders[1]?.memberId);

    return (
        <>
            <div>
                {/* 서바이벌 스터디 */}

                <div className="mt-6 pl-5">
                    <div className="flex items-center">
                        <Image
                            src={flash}
                            alt="서바이벌"
                            style={{ width: 18, height: "auto" }}
                        />
                        <h3 className="text-[var(--color-gray1000)]">
                            서바이벌 스터디
                        </h3>
                    </div>
                    <h6 className="mt-1 text-[var(--color-gray700)]">
                        매주 Ai가 내는 카테고리별 퀴즈를 풀면 생존!
                    </h6>
                    <div className="hide-scrollbar w-full overflow-x-auto">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={"auto"}
                            className="mt-[14px]"
                        >
                            {survStudies?.map((study, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{ width: "auto" }}
                                    className="!flex items-center justify-start"
                                >
                                    <SurvivalCard
                                        studyId={study.studyId}
                                        category={study.category}
                                        title={study.title}
                                        content="몽트뤠조르 사투리 위주의 본토 할머니발음 스터디"
                                        startDate={study.startTime}
                                        member={`${study.currentMemberCount}/${study.maxMemberCount}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                {/* 스터디 추천 */}
                <h3 className="mt-8 pl-5 text-[var(--color-gray1000)]">
                    어떤 스터디를 하고싶나요?
                </h3>
                <div className="mt-[14px] flex flex-col gap-[16px] px-5">
                    {defaultStudies.map((study, i) => (
                        <StudyCard
                            key={i}
                            studyId={study.studyId}
                            category={categoryMap[study.category]}
                            isNew={isNewFunc(study.start_date)}
                            title={study.title}
                            avatar={leaders[i]?.profileImage}
                            schedule={scheduleString(study.schedules)}
                            startTime={study.startTime}
                            endTime={study.endTime}
                            region={regionMap[study.region]}
                            member={{
                                current: study.currentMemberCount,
                                max: study.maxMemberCount,
                            }}
                            studyType="DEFAULT"
                            leaderId={leaders[i]?.memberId}
                        />
                    ))}
                </div>
            </div>
            {defaultStudies.length === 0 && <StudyResult search={search} />}
        </>
    );
}
