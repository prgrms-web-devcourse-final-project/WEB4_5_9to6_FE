"use client";

import { useProfileStore } from "@/stores/memberStore";
import StudyCard from "../common/StudyCard";
import {
    getValidAvatar,
    categoryMap,
    dayMap,
    regionMap,
} from "@/utils/studyDataMap";

export default function MyStudyList() {
    const { data3 } = useProfileStore();

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4">
                {(data3 || []).length > 0 ? (
                    data3?.map((v, i) => (
                        <StudyCard
                            key={i}
                            studyId={v.studyId}
                            category={categoryMap[v.category]}
                            isNew={new Date(v.start_date) > new Date()}
                            title={v.title}
                            avatar={getValidAvatar(v.leaderAvatar)}
                            schedule={v.schedules
                                .map((day) => dayMap[day])
                                .join(", ")}
                            startTime={v.startTime}
                            endTime={v.endTime}
                            region={regionMap[v.region]}
                            member={{
                                current: v.currentMemberCount,
                                max: v.maxMemberCount,
                            }}
                            studyType={v.studyType}
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
