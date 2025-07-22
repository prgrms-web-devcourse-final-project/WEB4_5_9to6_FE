"use client";

import { fetchStudyInfo, getAttendance, postAttendance } from "@/api/studies";
import Button from "@/components/common/Button";
import SubHeader from "@/components/common/SubHeader";
import StudyHome from "@/components/studyHome/StudyHome";
import { StudyInfos, studyUserAttendance } from "@/types/study";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";
import {
    Bell,
    EllipsisVertical,
    MessageSquare,
    Pause,
    Play,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Page() {
    // const [attend, setAttend] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [pause, setPause] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();
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

        console.log(res);
        if (res === "출석 체크 완료.") {
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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 56) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <SubHeader
                className={`z-40 bg-[var(--color-white)] transition-all duration-200 ease-in-out ${
                    showHeader
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                }`}
            >
                <div className="absolute right-7 left-11 flex items-center justify-between">
                    <p className="b2 ml-2 min-w-0 basis-[40%] truncate">
                        {studyData?.name}
                    </p>
                    <div className="flex items-center gap-4">
                        <MessageSquare
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push("/chat")}
                        />
                        <Bell
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push("/notifications")}
                        />
                        <EllipsisVertical
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        />
                    </div>
                </div>
            </SubHeader>
            <div className="mb-[90px] flex min-h-screen min-w-[360px] flex-col bg-[var(--color-white)]">
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
                <div className="fixed bottom-0 mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] bg-[var(--color-white)] px-5 py-[14px]">
                    {!attended && (
                        <Button color="primary" onClick={attendHandler}>
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

                {/* {isMenuOpen && (
                    <MenuModal
                        onClose={() => setIsMenuOpen(false)}
                        setIsUserOpen={setIsUserOpen}
                    />
                )}

                {isUserOpen && (
                    <StudyUserModal onClose={() => setIsUserOpen(false)} />
                )}

                {isGoalOpen && (
                    <StudyGoalModal onClose={() => setIsGoalOpen(false)} />
                )} */}
            </div>
        </>
    );
}
