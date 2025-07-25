"use client";

import { useProfileStore } from "@/stores/memberStore";
import StudyCard from "../common/StudyCard";
import { categoryMap, regionMap, scheduleString } from "@/utils/studyDataMap";
import { studyMembers } from "@/api/studies";
import { useQueries } from "@tanstack/react-query";

export default function MyStudyList() {
    const { data3 } = useProfileStore();

    const isNewFunc = (start: string) => {
        const now = new Date();
        const startDate = new Date(start);
        return now < startDate;
    };

    const leaderQueries = useQueries({
        queries: (data3 || []).map((v) => ({
            queryKey: ["studyMembers", v.studyId],
            queryFn: () => studyMembers(v.studyId),
            select: (data: Members[]) => data.find((m) => m.role === "LEADER"),
            enabled: !!v.studyId,
            staleTime: 1000 * 60 * 3,
        })),
    });
    const leaders = leaderQueries.map((q) => q.data);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4">
                {(data3 || []).length > 0 ? (
                    data3?.map((v, i) => (
                        <StudyCard
                            key={i}
                            studyId={v.studyId}
                            category={categoryMap[v.category]}
                            isNew={isNewFunc(v.start_date)}
                            title={v.title}
                            avatar={leaders[i]?.profileImage}
                            schedule={scheduleString(v.schedules)}
                            startTime={v.startTime}
                            endTime={v.endTime}
                            region={regionMap[v.region]}
                            member={{
                                current: v.currentMemberCount,
                                max: v.maxMemberCount,
                            }}
                            studyType={v.studyType}
                            leaderId={leaders[i]?.memberId}
                        />
                    ))
                ) : (
                    <>
                        <p className="text-gray500 mt-10">
                            가입한 스터디가 없습니다
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
