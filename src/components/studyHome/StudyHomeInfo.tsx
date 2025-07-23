import { useQuery } from "@tanstack/react-query";
import StudyDefaultInfo from "../studyRecruit/StudyDefaultInfo";
import { useParams } from "next/navigation";
import { fetchStudyInfo } from "@/api/studies";

export default function StudyHomeInfo() {
    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : null;

    const { data: studyData } = useQuery<StudyInfos>({
        queryKey: ["studyId", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다.");
            return await fetchStudyInfo(studyId);
        },
        enabled: !!studyId,
    });
    return (
        <>
            <div className="flex h-[88px] justify-between border-b border-b-[var(--color-gray200)] px-5 py-6">
                <h6 className="text-[var(--color-gray1000)]">스터디 이름</h6>
                <h6 className="text-[var(--color-gray1000)]">
                    {studyData?.name}
                </h6>
            </div>

            <div className="px-5">
                {studyData && (
                    <StudyDefaultInfo
                        maxMembers={studyData.maxMembers}
                        schedules={studyData.schedules}
                        startTime={studyData.startTime}
                        endTime={studyData.endTime}
                        startDate={studyData.startDate}
                        endDate={studyData.endDate}
                    />
                )}
            </div>
            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 스터디 소개 */}
            <div className="w-full px-5">
                <h3 className="mt-6">스터디 소개</h3>
                <p className="b2 mt-[10px] w-full text-[var(--color-gray700)]">
                    {studyData?.description}
                </p>
            </div>
        </>
    );
}
