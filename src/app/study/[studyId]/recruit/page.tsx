"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import StudyInfo from "@/components/studyRecruit/StudyInfo";
import StudyUsers from "@/components/studyRecruit/StudyUsers";
import ApplyModal from "@/components/studyRecruit/ApplyModal";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import SubHeader from "@/components/common/SubHeader";
import ChannelSlideBar from "@/components/common/ChannelSlideBar";
import { customAlert } from "@/utils/customAlert";
import {
    checkIsMember,
    fetchStudyInfo,
    getApplicants,
    studyMembers,
} from "@/api/studies";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { useOwnItemStore } from "@/stores/ownItemStore";
import BottomModal from "@/components/common/BottomModal";
import StudyApplicant from "@/components/studyHome/StudyApplicant";
import StudyRecruitLoading from "@/components/studyRecruit/StudyRecruitLoading";

export default function Page() {
    const [channel, setChannel] = useState("정보");
    const [isOpen, setIsOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [isApply, setIsApply] = useState(false);
    const [study, setStudy] = useState<StudyInfos>();
    const router = useRouter();
    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : undefined;
    const isLogIn = useAuthStore((state) => state.isLogIn); //로그인유무
    const myInfo = useAuthStore((state) => state.myInfo);
    const { fetchItemsOwn, groupedOwnItems } = useOwnItemStore();
    const [src, setSrc] = useState(`/images/rewardItems/11.png`);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const isNewFunc = () => {
        const now = new Date();
        if (study) {
            const startDate2 = new Date(study?.startDate);
            return now < startDate2;
        }
    };

    // 신청자 목록조회
    const { data: applicantData } = useQuery<studyApplicant[]>({
        queryKey: ["applicantData", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다");
            return await getApplicants(studyId);
        },
        enabled: !!studyId,
    });

    //서브헤더를 위한 스크롤 감지
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

    //스터디 정보
    useEffect(() => {
        const fetchStudy = async () => {
            const id = params?.studyId;
            if (typeof id === "string") {
                try {
                    setIsLoading(true);
                    const data: StudyInfos = await fetchStudyInfo(parseInt(id));
                    setStudy(data);
                } catch (err) {
                    console.error("스터디 정보 에러:", err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchStudy();
    }, [params?.studyId]);

    //현재 사용자의 신청여부 및 상태
    useEffect(() => {
        if (applicantData && myInfo?.id) {
            const isApplied = applicantData.some(
                (m) => m.memberId === myInfo.id,
            );
            setIsApply(isApplied);
        }
    }, [applicantData, myInfo]);
    const isRejected = applicantData?.some(
        (m) => m.memberId === myInfo?.id && m.state === "REJECT",
    );

    //스터디멤버여부
    const { data: isMember } = useQuery({
        queryKey: ["isMember", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다.");
            return await checkIsMember(studyId);
        },
    });

    //스터디장 여부
    const { data: memberData } = useQuery<StudyMember[]>({
        queryKey: ["studyMembers", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다.");
            else return await studyMembers(studyId);
        },
        enabled: !!studyId,
        staleTime: 1000 * 60 * 3,
    });
    const leader = memberData?.find((q) => q.role === "LEADER");

    //스터디 배경
    useEffect(() => {
        if (
            !groupedOwnItems.BACKGROUND ||
            groupedOwnItems.BACKGROUND.length === 0
        ) {
            fetchItemsOwn();
        }
        const selectedItemId = groupedOwnItems.BACKGROUND?.find(
            (v) => v.used,
        )?.itemId;
        setSrc(`/images/rewardItems/${selectedItemId}.png`);
        setIsImageLoading(true);
    }, [fetchItemsOwn, groupedOwnItems]);

    if (isLoading) {
        return (
            <>
                <StudyRecruitLoading />
            </>
        );
    }

    return (
        <>
            {/* 스크롤시 헤더 */}
            {study && (
                <div className="hide-scrollbar overflow-y-auto bg-[var(--color-white)] dark:bg-[#222222]">
                    <SubHeader
                        className={`top-0 z-40 bg-[var(--color-white)] transition-all duration-200 ease-in-out dark:bg-[#222222] ${
                            showHeader
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-full opacity-0"
                        }`}
                    >
                        <p className="b2 min-w-0 truncate">{study.name}</p>
                    </SubHeader>

                    {/* 스터디 이미지 */}
                    <div className="relative aspect-[1000/500] w-full">
                        <Image
                            src={src}
                            alt="스터디 배경"
                            fill
                            priority
                            className={`${isImageLoading ? "opacity-0" : "opacity-100"} w-full`}
                            onLoad={() => setIsImageLoading(false)}
                        />
                        <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-30" />
                        <button
                            className="dark:hover:bg-gray900/90 absolute top-5 left-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90 dark:bg-[#222222]/90"
                            onClick={() => router.back()}
                        >
                            <ChevronLeft className="h-5 w-5 text-[#161616] dark:text-[var(--color-white)]" />
                        </button>
                        <h2 className="absolute bottom-5 left-5 z-20 text-[var(--color-white)]">
                            {study.name}
                        </h2>
                        {/* 활동여부 표시 */}
                        <div className="absolute right-5 bottom-4 z-20 flex h-[24px] w-[53px] cursor-pointer items-center justify-center gap-1 rounded-[50px] bg-[#FF395C] px-2 text-[var(--color-gray200)]">
                            <span className="c2">
                                {isNewFunc() === true ? "활동 전" : "활동중"}
                            </span>
                        </div>
                    </div>

                    {/* 채널(정보/팀원현황) */}
                    <ChannelSlideBar
                        channels={["정보", "팀원 현황"]}
                        channel={channel}
                        setChannel={setChannel}
                    />
                    <div className="mb-[120px]">
                        {channel === "정보" && (
                            <StudyInfo
                                maxMembers={study.maxMembers}
                                schedules={study.schedules}
                                startTime={study.startTime}
                                endTime={study.endTime}
                                startDate={study.startDate}
                                endDate={study.endDate}
                                description={study.description}
                                exLink={study.externalLink}
                            />
                        )}
                        {channel === "팀원 현황" && <StudyUsers />}
                    </div>

                    {/* 신청하기 버튼 */}
                    <div className="fixed bottom-0 flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] bg-[var(--color-white)] px-5 py-[14px] dark:border-t-[var(--color-gray1000)] dark:bg-[#222222]">
                        {/* 로그인상태 */}
                        {isLogIn &&
                            (isMember?.isMember ? (
                                leader?.memberId === myInfo?.id ? (
                                    <Button
                                        color="black"
                                        onClick={() => setIsApplyOpen(true)}
                                    >
                                        인원 관리
                                    </Button>
                                ) : (
                                    <Button disabled>
                                        가입된 스터디입니다
                                    </Button>
                                )
                            ) : isApply ? (
                                <Button disabled>
                                    {isRejected
                                        ? "거절된 스터디입니다"
                                        : "신청 완료"}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    color="primary"
                                >
                                    신청하기
                                </Button>
                            ))}

                        {/* 비로그인상태 */}
                        {!isLogIn && (
                            <Button
                                onClick={() => router.push("/login")}
                                color="primary"
                            >
                                로그인
                            </Button>
                        )}
                    </div>

                    {isOpen && (
                        <ApplyModal
                            className="top-[137px] left-1/2 h-[355px] w-[340px] -translate-x-1/2"
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            onApply={() => {
                                setIsApply(true);
                                customAlert({
                                    message:
                                        "스터디를 신청했어요.곧 연락올거에요!",
                                    linkLabel: "닫기",
                                    onClick: () => {},
                                });
                            }}
                        />
                    )}

                    {isApplyOpen && (
                        <BottomModal
                            title="스터디원"
                            onClose={() => setIsApplyOpen(false)}
                            height="479"
                            isOpen={isApplyOpen}
                        >
                            <StudyApplicant maxMembers={study.maxMembers} />
                        </BottomModal>
                    )}
                </div>
            )}
        </>
    );
}
