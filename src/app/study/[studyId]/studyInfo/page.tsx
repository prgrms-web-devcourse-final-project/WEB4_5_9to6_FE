"use client";
import { studyMembers } from "@/api/studies";
import Button from "@/components/common/Button";
import ChannelSlideBar from "@/components/common/ChannelSlideBar";
import StudyHomeInfo from "@/components/studyHome/StudyHomeInfo";
import StudyUsers from "@/components/studyRecruit/StudyUsers";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [channel, setChannel] = useState("정보");
    const userInfo = useAuthStore((state) => state.myInfo);
    const router = useRouter();
    const params = useParams();

    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : null;

    //유저가 스터디장인지 확인
    const { data: memberData, isLoading } = useQuery<Members[]>({
        queryKey: ["members", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다.");
            return await studyMembers(studyId);
        },
        enabled: !!studyId,
    });

    const isLeader = () => {
        const leader = memberData?.filter((m) => m.role === "LEADER");

        if (leader && leader[0].memberId === userInfo?.id) return true;
        else return false;
    };
    // console.log("리더?", isLeader());
    return (
        <>
            <div className="mt-[62px]">
                <div className="min-h-screen min-w-[360px]">
                    {/* 채널(정보/팀원현황) */}
                    <ChannelSlideBar
                        channels={["정보", "팀원 현황"]}
                        channel={channel}
                        setChannel={setChannel}
                    />
                    {/* 정보 */}
                    {channel === "정보" && <StudyHomeInfo />}
                    {/* 팀원현황 */}
                    {channel === "팀원 현황" && <StudyUsers />}

                    {!isLoading && isLeader() && (
                        <div className="fixed bottom-0 flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] bg-[var(--color-white)] px-5 py-[14px]">
                            <Button
                                onClick={() =>
                                    router.push(`/study/${studyId}/edit`)
                                }
                                color="black"
                            >
                                수정하기
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
