import Image from "next/image";
import flash from "@/assets/Flash--filled.svg";
import SurvivalCard from "../common/SurvivalCard";
import StudyCard from "../common/StudyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { studyMembers } from "@/api/studies";
import StudyResult from "./SearchResult";
import { useQueries } from "@tanstack/react-query";
import { categoryMap, regionMap, scheduleString } from "@/utils/studyDataMap";
import { X } from "lucide-react";

export default function StudyLists({
    defaultStudies,
    survStudies,
    search,
}: {
    defaultStudies: StudyList[];
    survStudies: StudyList[] | undefined;
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
            enabled: !!study.studyId,
            staleTime: 1000 * 60 * 3,
        })),
    });
    const leaders = leaderQueries.map((q) => q.data);

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
                        <h3 className="text-[var(--color-gray1000)] dark:text-white">
                            서바이벌 스터디
                        </h3>
                    </div>
                    <h6 className="mt-1 text-[var(--color-gray700)]">
                        매주 Ai가 내는 카테고리별 퀴즈를 풀면 생존!
                    </h6>
                    <div className="relative w-full overflow-x-hidden">
                        {(survStudies || []).length > 0 ? (
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
                                            content={study.description || ""}
                                            startDate={study.startTime}
                                            member={`${study.currentMemberCount}/${study.maxMemberCount}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="mt-[14px] flex items-center">
                                <X size={20} className="mr-1 text-red-600" />
                                <h4 className="text-gray700 dark:text-gray300">
                                    관련 서바이벌 스터디가 없어요!
                                </h4>
                            </div>
                        )}
                    </div>
                </div>
                {/* 스터디 추천 */}
                <h3 className="mx-5 mt-8 text-[var(--color-gray1000)] dark:text-white">
                    어떤 스터디를 하고싶나요?
                </h3>
                <div className="mt-[14px] flex flex-col gap-[16px] px-5">
                    {defaultStudies.map((study, i) => (
                        <StudyCard
                            key={i}
                            studyId={study.studyId}
                            category={categoryMap[study.category]}
                            isNew={isNewFunc(study.startDate)}
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
