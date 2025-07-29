"use client";

import Image from "next/image";
import Button from "./common/Button";
import StudyCard from "./common/StudyCard";
import { fetchRandomStudyList, fetchStudyList } from "@/api/studyList";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useQueries, useQuery } from "@tanstack/react-query";
import { categoryMap, regionMap, scheduleString } from "@/utils/studyDataMap";
import { checkGoalsCompleted, studyMembers } from "@/api/studies";
import { fetchAllTime } from "@/api/timer";
import { useEffect, useState } from "react";
import LoadingHome from "./LoadingHome";

export default function StudyTime() {
    const router = useRouter();
    const { myInfo } = useAuthStore();
    const isLogIn = useAuthStore((state) => state.isLogIn);
    const isFetched = useAuthStore((state) => state.isFetched);

    // 시간에 따른 멘트 설정
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [message, setMessage] = useState("");
    const [icon, setIcon] = useState("/icons/smile.svg");

    const isNewFunc = (start: string) => {
        const now = new Date();
        const startDate = new Date(start);
        return now < startDate;
    };

    // 로그인 시
    const { data: userData, isPending: pendingLogin } = useQuery({
        queryKey: ["myInfo", myInfo?.id],
        queryFn: async () => {
            const myStudy = await fetchStudyList(myInfo?.id ?? 0);
            const studyList = myStudy.studies;
            return studyList;
        },
        enabled: isFetched && isLogIn && !!myInfo,
        retry: 0,
    });

    // 로그인시, 시간 불러오기
    const { data: userTime, isPending: pendingTime } = useQuery({
        queryKey: ["myStudyTime", myInfo?.id],
        queryFn: () => fetchAllTime(myInfo?.id ?? 0),
        enabled: isFetched && isLogIn && !!myInfo,
        retry: 0,
    });

    useEffect(() => {
        if (userTime?.totalStudyTime != null) {
            const total = userTime.totalStudyTime;
            setHours(Math.floor(total / 60));
            setMinutes(total % 60);

            if (total < 60) {
                setMessage("자! 이제 공부를 시작해볼까요?");
                setIcon("/icons/smile.svg");
            } else if (total <= 299) {
                setMessage("조금씩 성장중이군요! 계속 가볼까요?");
                setIcon("/icons/angel-face.svg");
            } else if (total <= 600) {
                setMessage("열공 중이네요! 좋아요!");
                setIcon("/icons/heart-eyes.svg");
            } else if (total <= 1200) {
                setMessage("공부가 꽤 진행됐어요! 조만간 마스터 하겠는걸요?");
                setIcon("/icons/face-hearts.svg");
            } else if (total > 1200) {
                setMessage("이렇게 공부하다가 코피나요! 대단해요!");
                setIcon("/icons/Star-struck.svg");
            }
        }
    }, [userTime]);

    // 로그인시, 가장 많은 목표 개수 불러오기
    const studyIds = userData?.map((study: Study) => study.studyId) ?? [];
    const goalQueries = useQueries({
        queries: studyIds.map((id: number) => ({
            queryKey: ["studyGoals", id],
            queryFn: () => checkGoalsCompleted(id),
            enabled: isFetched && isLogIn,
            staleTime: 1000 * 60 * 5,
        })),
    });
    const goalData = goalQueries.map((q) => q.data).filter(Boolean);
    const maxStudy = (goalData as studyUserGoals[]).reduce(
        (acc: GoalMaxCount, curr) => {
            const sum = curr.goals.reduce(
                (total: number, g: GoalWeekCount) => total + g.count,
                0,
            );
            if (sum > acc.maxCount) {
                return {
                    studyId: curr.studyId,
                    goals: curr.goals,
                    maxCount: sum,
                };
            }
            return acc;
        },
        { studyId: null, goals: [], maxCount: -1 },
    );

    // 비로그인 시
    const { data: guestData, isPending: pendingNotLogin } = useQuery({
        queryKey: ["guestStudy"],
        queryFn: async () => {
            const randomList = await fetchRandomStudyList();
            return randomList;
        },
        enabled: isFetched && !isLogIn,
        retry: 0,
    });

    const studyCards: Study[] =
        isLogIn === true ? userData : isLogIn === false ? guestData : [];

    const leaderQueries = useQueries({
        queries: (studyCards || []).map((v) => ({
            queryKey: ["studyMembers", v.studyId],
            queryFn: () => studyMembers(v.studyId),
            select: (data: Members[]) => data.find((m) => m.role === "LEADER"),
            enabled: !!v.studyId,
            staleTime: 1000 * 60 * 3,
        })),
    });
    const leaders = leaderQueries.map((q) => q.data);

    if (!isFetched) {
        return (
            <>
                <LoadingHome />
            </>
        );
    }

    if (!isLogIn && pendingNotLogin) {
        return (
            <>
                <LoadingHome />
            </>
        );
    }

    if (isLogIn && (pendingLogin || pendingTime)) {
        return (
            <>
                <LoadingHome />
            </>
        );
    }

    return (
        <>
            {isLogIn ? (
                // 로그인상태
                <section>
                    <h3 className="h3">{myInfo?.nickname}님의 공부시간</h3>
                    <div className="mt-3.5 min-h-[165px] w-full rounded-2xl bg-white px-6">
                        <div className="flex pt-6">
                            <div className="flex w-1/2 flex-col">
                                <div className="mb-[11px]">
                                    <p className="c2">총 공부시간</p>
                                </div>
                                <p className="h1 mr-0.5">
                                    {hours}
                                    <span className="h6 mr-1.5">시간</span>
                                    {minutes}
                                    <span className="h6">분</span>
                                </p>
                            </div>
                            <div className="flex w-1/2 flex-col gap-4">
                                {maxStudy.goals.length > 0 ? (
                                    maxStudy.goals
                                        .sort(
                                            (a, b) =>
                                                Number(a.week) - Number(b.week),
                                        )
                                        .slice(-4)
                                        .map((goal) => {
                                            const percent = Math.min(
                                                (goal.count / 5) * 100,
                                                100,
                                            );
                                            const getColor = () => {
                                                if (percent >= 80)
                                                    return "bg-main500";
                                                if (percent >= 60)
                                                    return "bg-main400";
                                                if (percent >= 40)
                                                    return "bg-main300";
                                                return "bg-main200";
                                            };

                                            return (
                                                <div
                                                    key={goal.week}
                                                    className="bg-gray200 h-2 w-full rounded-md"
                                                >
                                                    <div
                                                        className={`${getColor()} h-2 rounded-md`}
                                                        style={{
                                                            width: `${percent}%`,
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })
                                ) : (
                                    <>
                                        <div className="bg-gray200 h-2 w-full rounded-sm"></div>
                                        <div className="bg-gray200 h-2 w-full rounded-sm"></div>
                                        <div className="bg-gray200 h-2 w-full rounded-sm"></div>
                                        <div className="bg-gray200 h-2 w-full rounded-sm"></div>
                                    </>
                                )}
                            </div>
                        </div>
                        <hr className="mt-5.5 text-[var(--color-gray200)]" />
                        <div className="flex justify-center py-4">
                            <Image
                                src={icon}
                                alt="icon"
                                className="mr-2 h-5 w-5"
                                width={20}
                                height={20}
                                priority
                            />
                            {message}
                        </div>
                    </div>
                </section>
            ) : (
                // 비로그인
                <section>
                    <div className="mt-3.5 flex min-h-[165px] w-full flex-col items-center justify-center rounded-2xl bg-white px-[10%]">
                        <p className="h5 mb-7 text-center text-[var(--color-gray1000)]">
                            로그인 후<br />
                            스터디 정보를 확인해보세요
                        </p>
                        <Button
                            onClick={() => router.push("/login")}
                            className="h-9 w-25.5 cursor-pointer rounded-lg bg-[var(--color-main500)] transition duration-200 ease-in-out hover:bg-[var(--color-main600)]"
                        >
                            <p className="h6 text-white">로그인</p>
                        </Button>
                    </div>
                </section>
            )}
            {isLogIn ? (
                <section>
                    <h3 className="h3 mt-8 pb-3.5">내 스터디</h3>

                    {studyCards && studyCards.length > 0 ? (
                        <div className="flex flex-col gap-3.5 pb-24">
                            {studyCards.map((study: Study, i: number) => (
                                <StudyCard
                                    key={i}
                                    studyId={study.studyId}
                                    category={categoryMap[study.category]}
                                    isNew={isNewFunc(study.start_date)}
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
                                    studyType={study.studyType}
                                    leaderId={leaders[i]?.memberId}
                                />
                            ))}
                        </div>
                    ) : (
                        // 가입한 스터디가 없을 때
                        <div className="flex h-[300px] flex-col items-center justify-center">
                            <p className="b1 mb-5 text-center text-[var(--color-gray800)]">
                                아직 가입한 스터디가 없어요!
                            </p>
                            <Button
                                onClick={() => router.push("/studylist")}
                                className="h-9 w-31 cursor-pointer rounded-lg bg-[var(--color-main500)] transition duration-200 ease-in-out hover:bg-[var(--color-main600)]"
                            >
                                <p className="b2 text-white">스터디 둘러보기</p>
                            </Button>
                        </div>
                    )}
                </section>
            ) : (
                <section className="mt-8 flex flex-col gap-3.5 pb-24">
                    <h3 className="h3">이런 스터디도 있어요</h3>
                    {studyCards?.map((study: Study, i: number) => (
                        <StudyCard
                            key={i}
                            studyId={study.studyId}
                            category={categoryMap[study.category]}
                            isNew={isNewFunc(study.start_date)}
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
                            studyType={study.studyType}
                            leaderId={leaders[i]?.memberId}
                        />
                    ))}
                </section>
            )}
        </>
    );
}
