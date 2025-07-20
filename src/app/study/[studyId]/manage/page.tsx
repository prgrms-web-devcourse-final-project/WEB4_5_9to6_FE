"use client";

import { fetchStudyInfo } from "@/api/studies";
import Button from "@/components/common/Button";
import MemberModal from "@/components/studyHome/MemberModal";
import StudyHome from "@/components/studyHome/StudyHome";
import { StudyInfos } from "@/types/study";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
export default function Page() {
    const [attend, setAttend] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [pause, setPause] = useState(false);
    const [isMemberOpen, setIsMemberOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : null;

    const finishHandler = () => {
        setIsStart(false);
        setPause(false);
    };
    const { data: studyData } = useQuery<StudyInfos>({
        queryKey: ["studyId", studyId],
        queryFn: async () => await fetchStudyInfo(studyId!),
        enabled: !!studyId,
    });
    return (
        <>
            <div className="flex min-h-screen min-w-[360px] flex-col bg-[var(--color-white)]">
                {studyData && (
                    <StudyHome
                        notice={studyData?.notice}
                        schedules={studyData.schedules}
                        startTime={studyData.startTime}
                        endTime={studyData.endTime}
                        region={studyData.region}
                        name={studyData.name}
                        exLink={studyData?.externalLink}
                        maxMembers={studyData.maxMembers}
                        currentMemberCount={studyData.currentMemberCount}
                        isStart={isStart}
                        pause={pause}
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                )}

                {/* 버튼 */}
                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px]">
                    {!attend && (
                        <div className="flex w-full items-center justify-between gap-2">
                            <Button
                                color="gray"
                                className="basis-[35.9%] cursor-pointer"
                                onClick={() => setIsMemberOpen(true)}
                            >
                                인원관리
                            </Button>
                            <Button
                                color="primary"
                                className="basis-[64.1%] cursor-pointer"
                                onClick={() => setAttend(true)}
                            >
                                출석체크
                            </Button>
                        </div>
                    )}
                    {attend && !isStart && (
                        <Button
                            color="primary"
                            onClick={() => setIsStart(true)}
                        >
                            스터디 시작
                        </Button>
                    )}
                    {isStart && (
                        <div className="flex w-full items-center justify-between gap-2">
                            <button
                                className="h-[50px] w-full basis-[35.9%] cursor-pointer rounded-xl bg-[var(--color-main100)]"
                                onClick={finishHandler}
                            >
                                <h5 className="text-[var(--color-main500)]">
                                    그만하기
                                </h5>
                            </button>
                            <Button
                                color="primary"
                                className="basis-[64.1%]"
                                onClick={() => setPause(!pause)}
                            >
                                {!pause && <Pause className="h-6 w-6" />}
                                {pause && <Play className="h-6 w-6" />}
                            </Button>
                        </div>
                    )}
                </div>

                {isMemberOpen && (
                    <MemberModal
                        isOpen={isMemberOpen}
                        onClose={() => setIsMemberOpen(false)}
                    />
                )}
            </div>
        </>
    );
}
