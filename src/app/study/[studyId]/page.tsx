"use client";

import {
    fetchStudyInfo,
    postAttendance,
    checkWeekAttendance,
} from "@/api/studies";
import { postStudyTime } from "@/api/timer";
import Button from "@/components/common/Button";
import SubHeader from "@/components/common/SubHeader";
import StudyHome from "@/components/studyHome/StudyHome";
import { studyStartStore } from "@/stores/studyStartStore";
import StudyLoading from "@/components/studyHome/StudyLoading";
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

import { useEffect, useRef, useState } from "react";

export default function Page() {
    // const [pause, setPause] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isStart, setIsStart, pause, setPause, seconds, setSeconds } =
        studyStartStore();
    // console.log("isStart", isStart);
    const router = useRouter();
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

    const stopTimer = () => {
        setPause(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const resetTimer = async () => {
        stopTimer();
        setIsStart(false);
        // setPause(true);

        if (!studyId) throw new Error("스터디 아이디가 없습니다.");

        if (Math.floor(seconds / 60) <= 0) {
            customAlert({
                message: `1분 이상의 시간만 저장 가능합니다.`,
                linkLabel: "닫기",
                onClick: () => {},
            });
            // console.log("seconds", seconds);
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
    }, []);

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
                message: "출석체크가 되지 않았어요.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };

    const { data: studyData, isPending: studyPending } = useQuery<StudyInfos>({
        queryKey: ["studyData", studyId],
        queryFn: async () => await fetchStudyInfo(studyId!),
        enabled: !!studyId,
    });

    // 스터디 출석 여부
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
    if (studyPending) {
        return (
            <>
                <StudyLoading />
            </>
        );
    }

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
                            onClick={() => router.push(`/${studyId}/chat`)}
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
                        startDate={studyData.startDate}
                        endDate={studyData.endDate}
                        // pause={pause}
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        attended={attended}
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
                        <Button color="primary" onClick={startTimer}>
                            스터디 시작
                        </Button>
                    )}
                    {attended && isStart && (
                        <div className="flex w-full items-center justify-between gap-2">
                            <button
                                className="h-[50px] w-full basis-[35.9%] cursor-pointer rounded-xl bg-[var(--color-main100)]"
                                onClick={resetTimer}
                            >
                                <h5 className="text-[var(--color-main500)]">
                                    그만하기
                                </h5>
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
            </div>
        </>
    );
}
