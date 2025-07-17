"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./common/Button";
import StudyCard from "./common/StudyCard";
import { fetchLeaderAvatar, fetchMyData } from "@/api/fetchUser";
import { fetchRandomStudyList, fetchStudyList } from "@/api/studyList";
import { useRouter } from "next/navigation";

type StudyCardWithAvatar = StudyInfo & {
    leaderAvatar: string | null;
};

export default function StudyTime() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [myData, setMyData] = useState<UserAllInfo | null>(null);
    const [studyCards, setStudyCards] = useState<StudyCardWithAvatar[]>([]);
    const getValidAvatar = (avatar?: string | null) =>
        !avatar || avatar.includes("placehold.co")
            ? "/images/avatarImgs/basic2.png"
            : avatar;
    const dayMap: Record<string, string> = {
        MON: "월요일",
        TUE: "화요일",
        WED: "수요일",
        THU: "목요일",
        FRI: "금요일",
        SAT: "토요일",
        SUN: "일요일",
    };
    const categoryMap: Record<string, string> = {
        LANGUAGE: "어학",
        JOB: "취업",
        PROGRAMMING: "프로그래밍",
        EXAM_PUBLIC: "고시&공무원",
        EXAM_SCHOOL: "수능&내신",
        ETC: "기타",
    };
    const regionMap: Record<string, string> = {
        ONLINE: "온라인",
        SEOUL: "서울",
        GYEONGGI: "경기",
        GANGWON: "강원",
        INCHEON: "인천",
        BUSAN: "부산",
        ULSAN: "울산",
        DAEGU: "대구",
        DAEJEON: "대전",
        GWANGJU: "광주",
        SEJONG: "세종",
        CHUNGNAM: "충남",
        CHUNGBUK: "충북",
        JEONNAM: "전남",
        JEONBUK: "전북",
        GYEONGNAM: "경남",
        GYEONGBUK: "경북",
        JEJU: "제주",
    };

    // 시간에 따른 멘트 설정
    const hours = 12;
    const minutes = 39;
    const totalMinutes = hours * 60 + minutes;
    let message = "";
    let icon = "/icons/smile.svg";

    if (totalMinutes < 60) {
        message = "자! 이제 공부를 시작해볼까요?";
        icon = "/icons/smile.svg";
    } else if (totalMinutes <= 299) {
        message = "조금씩 성장중이군요! 계속 가볼까요?";
        icon = "/icons/angel-face.svg";
    } else if (totalMinutes <= 600) {
        message = "열공 중이네요! 좋아요!";
        icon = "/icons/heart-eyes.svg";
    } else if (totalMinutes <= 1200) {
        message = "공부가 꽤 진행됐어요! 조만간 마스터 하겠는걸요?";
        icon = "/icons/face-hearts.svg";
    } else if (totalMinutes > 1200) {
        message = "이렇게 공부하다가 코피나요! 대단해요!";
        icon = "/icons/Star-struck.svg";
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
        const getMyData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                setIsLoggedIn(!!token);

                // 로그인 시
                if (token) {
                    const myInfo = await fetchMyData();
                    const myStudy = await fetchStudyList(myInfo?.memberInfo.id);
                    const studyList = myStudy.studies;
                    console.log("마이스터디", myStudy.studies);

                    const avatarList = await Promise.all(
                        studyList.map((study: StudyCardWithAvatar) =>
                            fetchLeaderAvatar(study.studyId),
                        ),
                    );

                    const studyCardsWithAvatar = studyList.map(
                        (study: StudyCardWithAvatar, i: number) => ({
                            ...study,
                            leaderAvatar: avatarList[i],
                        }),
                    );

                    setMyData(myInfo);
                    setStudyCards(studyCardsWithAvatar);
                    console.log("리더포함된 정보", studyCardsWithAvatar);
                } else {
                    const studyList = await fetchRandomStudyList();
                    const avatarList = await Promise.all(
                        studyList.map((study) =>
                            fetchLeaderAvatar(study.studyId),
                        ),
                    );

                    const studyCardsWithAvatar = studyList.map((study, i) => ({
                        ...study,
                        leaderAvatar: avatarList[i],
                    }));

                    setStudyCards(studyCardsWithAvatar);
                }
            } catch (err) {
                console.error("데이터 fetch 중 에러", err);
            }
        };
        getMyData();
    }, []);

    return (
        <>
            {isLoggedIn ? (
                // 로그인상태
                <section>
                    <h3 className="h3">
                        {myData?.memberInfo?.nickname}님의 공부시간
                    </h3>
                    <div className="mt-3.5 min-h-[165px] w-full rounded-2xl bg-white px-[10%]">
                        <div className="flex pt-6">
                            <div className="flex w-1/2 flex-col">
                                <div className="mb-[11px]">
                                    <p className="c2">총 공부시간</p>
                                </div>
                                <p className="h1 mr-0.5">
                                    {hours}
                                    <span className="h5 mr-1.5">시간</span>
                                    {minutes}
                                    <span className="h5">분</span>
                                </p>
                            </div>
                            <div className="flex w-1/2 flex-col gap-4">
                                <div className="mt-2 h-1.5 w-full rounded-md bg-[var(--color-main400)]"></div>
                                <div className="h-1.5 w-[70%] rounded-md bg-[var(--color-main400)]"></div>
                                <div className="h-1.5 w-[30%] rounded-md bg-[var(--color-main200)]"></div>
                                <div className="h-1.5 w-[50%] rounded-md bg-[var(--color-main300)]"></div>
                            </div>
                        </div>
                        <hr className="mt-5.5 text-[var(--color-gray200)]" />
                        <div className="flex justify-center py-4">
                            <Image
                                src={icon}
                                alt="icon"
                                className="mr-2 h-5 w-5"
                                width={0}
                                height={0}
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
            {isLoggedIn ? (
                <section className="pb-10">
                    <h3 className="h3 mt-8 pb-3.5">내 스터디</h3>
                    {studyCards && studyCards.length > 0 ? (
                        studyCards.map((study, i) => (
                            <StudyCard
                                studyId={study.studyId}
                                key={i}
                                category={categoryMap[study.category]}
                                isNew={new Date(study.start_date) > new Date()}
                                title={study.title}
                                avatar={getValidAvatar(study.leaderAvatar)}
                                schedule={study.schedules
                                    .map((day) => dayMap[day])
                                    .join(", ")}
                                startTime={study.startTime}
                                endTime={study.endTime}
                                region={regionMap[study.region]}
                                member={{
                                    current: study.currentMemberCount,
                                    max: study.maxMemberCount,
                                }}
                            />
                        ))
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
                <section className="mt-8 flex flex-col gap-3.5 pb-25">
                    <h3 className="h3">이런 스터디도 있어요</h3>
                    {studyCards?.map((study, i) => (
                        <StudyCard
                            key={i}
                            studyId={study.studyId}
                            category={categoryMap[study.category]}
                            isNew={new Date(study.start_date) > new Date()}
                            title={study.title}
                            avatar={getValidAvatar(study.leaderAvatar)}
                            schedule={study.schedules
                                .map((day) => dayMap[day])
                                .join(", ")}
                            startTime={study.startTime}
                            endTime={study.endTime}
                            region={regionMap[study.region]}
                            member={{
                                current: study.currentMemberCount,
                                max: study.maxMemberCount,
                            }}
                        />
                    ))}
                </section>
            )}
        </>
    );
}
