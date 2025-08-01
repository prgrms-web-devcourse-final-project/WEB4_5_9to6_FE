"use client";

import {
    checkWeekAttendance,
    fetchStudyInfo,
    postAttendance,
} from "@/api/studies";
import { postStudyTime } from "@/api/timer";
import Button from "@/components/common/Button";
import MemberModal from "@/components/studyHome/modal/MemberModal";
import StudyHome from "@/components/studyHome/StudyHome";
import { studyStartStore } from "@/stores/studyStartStore";
import StudyLoading from "@/components/studyHome/StudyLoading";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
export default function Page() {
    // const [pause, setPause] = useState(false);
    const [isMemberOpen, setIsMemberOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isStart, setIsStart, pause, setPause, seconds, setSeconds } =
        studyStartStore();

    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : null;

    // const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    //타이머 동작 핸들러
    const startTimer = () => {
        setIsStart(true);
        setPause(true);
    };

    const playTimer = () => {
        if (intervalRef.current) return;

        setPause(false);
        intervalRef.current = setInterval(() => {
            // setSeconds((prev) => prev + 1);
            studyStartStore.setState((state) => ({
                seconds: state.seconds + 1,
            }));
        }, 1000);
    };

    const stopTimer = useCallback(() => {
        setPause(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [setPause]);

    const resetTimer = async () => {
        stopTimer();
        setIsStart(false);
        // setPause(false);

        if (!studyId) throw new Error("스터디 아이디가 없습니다.");

        if (Math.floor(seconds / 60) <= 0) {
            customAlert({
                message: `1분 이상의 시간만 저장 가능합니다.`,
                linkLabel: "닫기",
                onClick: () => {},
            });
            setSeconds(0);
            return;
        }

        const isTimePosted = await postStudyTime(
            studyId,
            Math.floor(seconds / 60),
        );
        if (isTimePosted === "정상적으로 완료되었습니다.") {
            customAlert({
                message: `공부시간이 저장되었습니다.`,
                linkLabel: "닫기",
                onClick: () => {},
            });
        } else {
            customAlert({
                message: `공부시간을 저장하는데 에러가 발생했습니다.`,
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
        setSeconds(0);
    };
    useEffect(() => {
        return () => stopTimer();
    }, [stopTimer]);

    // const formatTime = (totalSeconds: number) => {
    //     const hr = Math.floor(totalSeconds / 3600);
    //     const min = Math.floor((totalSeconds % 3600) / 60);
    //     const sec = totalSeconds % 60;
    //     return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    // };

    //출석 핸들러
    const attendHandler = async () => {
        if (!studyId) throw new Error("스터디 아이디가 없습니다.");
        const res = await postAttendance(studyId);

        if (res.code === "0000") {
            await refetchAttendance();
            customAlert({
                message: "출석체크 완료! 오늘도 화이팅이에요!",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } else {
            customAlert({
                message:
                    "이미 오늘 출석을 했거나,\n출석체크가 완료되지 않았습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };

    const { data: studyManageData, isPending: studyPending } =
        useQuery<StudyInfos>({
            queryKey: ["studyInfos", studyId],
            queryFn: async () => await fetchStudyInfo(studyId!),
            enabled: !!studyId,
        });
    const { data: attendData, refetch: refetchAttendance } =
        useQuery<studyUserAttendance>({
            queryKey: ["userAttendance", studyId],
            queryFn: async () => {
                if (!studyId) throw new Error("스터디 아이디가 없습니다.");
                return await checkWeekAttendance(studyId);
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
        if (!attended) {
            setIsStart(false);
        }
    }, [attended, setIsStart]);
    if (studyPending) {
        return (
            <>
                <StudyLoading />
            </>
        );
    }

    return (
        <>
            <div className="flex min-h-screen min-w-[360px] flex-col bg-[var(--color-white)] dark:bg-[#222222]">
                {studyManageData && studyId && (
                    <StudyHome
                        studyId={studyId}
                        notice={studyManageData?.notice}
                        schedules={studyManageData.schedules}
                        startTime={studyManageData.startTime}
                        endTime={studyManageData.endTime}
                        region={studyManageData.region}
                        name={studyManageData.name}
                        exLink={studyManageData?.externalLink}
                        maxMembers={studyManageData.maxMembers}
                        currentMemberCount={studyManageData.currentMemberCount}
                        startDate={studyManageData.startDate}
                        endDate={studyManageData.endDate}
                        // pause={pause}
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        // studyTimeSec={formatTime(seconds)}
                        attended={attended}
                    />
                )}

                {/* 버튼 */}
                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px] dark:border-t-[var(--color-gray1000)]">
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
                            {attended && (
                                <Button color="primary" onClick={startTimer}>
                                    스터디 시작
                                </Button>
                            )}
                        </div>
                    )}
                    {attended && isStart && (
                        <div className="flex w-full items-center justify-between gap-2">
                            <button
                                className="bg-main100 h-[50px] w-full basis-[35.9%] cursor-pointer rounded-xl dark:bg-[#FDF5F7]"
                                onClick={resetTimer}
                            >
                                <h5 className="text-main500">그만하기</h5>
                            </button>
                            {!pause && (
                                <Button
                                    color="primary"
                                    className="basis-[64.1%]"
                                    onClick={stopTimer}
                                >
                                    <Pause className="h-6 w-6" />
                                </Button>
                            )}
                            {pause && (
                                <Button
                                    color="primary"
                                    className="basis-[64.1%]"
                                    onClick={playTimer}
                                >
                                    <Play className="h-6 w-6" />
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {isMemberOpen && studyManageData?.maxMembers && (
                    <MemberModal
                        isOpen={isMemberOpen}
                        onClose={() => setIsMemberOpen(false)}
                        maxMembers={studyManageData.maxMembers}
                    />
                )}
            </div>
        </>
    );
}
