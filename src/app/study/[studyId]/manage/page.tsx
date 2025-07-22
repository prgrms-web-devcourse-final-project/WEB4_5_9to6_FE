"use client";

import { fetchStudyInfo, getAttendance, postAttendance } from "@/api/studies";
import Button from "@/components/common/Button";
import MemberModal from "@/components/studyHome/modal/MemberModal";
import StudyHome from "@/components/studyHome/StudyHome";
import { StudyInfos, studyUserAttendance } from "@/types/study";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
export default function Page() {
    // const [attend, setAttend] = useState(false);
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

    const attendHandler = async () => {
        if (!studyId) throw new Error("스터디 아이디가 없습니다.");
        const res = await postAttendance(studyId);

        if (res.data.data === "출석 체크 완료.") {
            await refetchAttendance();
            customAlert({
                message: "출석체크 완료! 오늘도 화이팅이에요!",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } else {
            customAlert({
                message: "출석체크가 되지 않았어요.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };

    const { data: studyData } = useQuery<StudyInfos>({
        queryKey: ["studyId", studyId],
        queryFn: async () => await fetchStudyInfo(studyId!),
        enabled: !!studyId,
    });
    const { data: attendData, refetch: refetchAttendance } =
        useQuery<studyUserAttendance>({
            queryKey: ["userAttendance", studyId],
            queryFn: async () => {
                if (!studyId) throw new Error("스터디 아이디가 없습니다.");
                return await getAttendance(studyId);
            },
            enabled: !!studyId,
        });
    const isUserAttended = () => {
        if (!attendData) return false;
        const now = new Date().toISOString().slice(0, 10);
        return attendData.attendances.some((a) => {
            const attendDay = a.attendanceDate.slice(0, 10);
            return attendDay === now && a.attend === true;
        });
    };
    const attended = isUserAttended();
    return (
        <>
            <div className="flex min-h-screen min-w-[360px] flex-col bg-[var(--color-white)]">
                {studyData && studyId && (
                    <StudyHome
                        studyId={studyId}
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
                    {!isStart && (
                        <div className="flex w-full items-center justify-between gap-2">
                            <Button
                                color="gray"
                                className="basis-[35.9%] cursor-pointer"
                                onClick={() => setIsMemberOpen(true)}
                            >
                                인원관리
                            </Button>

                            {!attended && (
                                <Button
                                    color="primary"
                                    className="basis-[64.1%] cursor-pointer"
                                    onClick={attendHandler}
                                >
                                    출석체크
                                </Button>
                            )}
                            {attended && !isStart && (
                                <Button
                                    color="primary"
                                    onClick={() => setIsStart(true)}
                                >
                                    스터디 시작
                                </Button>
                            )}
                        </div>
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
