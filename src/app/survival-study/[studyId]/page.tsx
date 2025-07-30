"use client";

import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import NoticeBox from "@/components/common/NoticeBox";
import ApplyModal from "@/components/studyRecruit/ApplyModal";
import SurvivalInfo from "@/components/survival/SurvivalInfo";
import WinnerModal from "@/components/survival/WinnerModal";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";
import { fetchIsApplied, fetchSurvApply, fetchSurvival } from "@/api/studyList";
import { useAuthStore } from "@/stores/authStore";
import { useSurvivalStore } from "@/stores/survivalStore";
import { dayMap, categoryMap } from "@/utils/studyDataMap";
import { useOwnItemStore } from "@/stores/ownItemStore";
import SurvivalStudyLoading from "@/components/survival/SurvivalStudyLoading";

export default function SurvivalStudy() {
    const params = useParams();
    const studyId = Number(params?.studyId);
    const router = useRouter();
    const myInfo = useAuthStore().myInfo;
    const { setStudy } = useSurvivalStore();
    const { fetchItemsOwn, groupedOwnItems } = useOwnItemStore();
    const [src, setSrc] = useState("/images/rewardItems/12.png");
    const [isImageLoading, setIsImageLoading] = useState(true);
<<<<<<< HEAD
=======

>>>>>>> dev
    const [showModal, setShowModal] = useState(false);
    const { changeClass } = useAnimationStore();

    const closeHandler = () => setShowModal(false);

    const { data: study, isPending: studyPending } = useQuery({
        queryKey: ["survivalStudy", studyId],
        queryFn: () => fetchSurvival(studyId),
        enabled: !!studyId,
    });
    console.log(study);

    const {
        data: apply,
        refetch: refetchApply,
        isLoading: isApplyLoading,
    } = useQuery({
        queryKey: ["isApplied", studyId, myInfo?.id],
        queryFn: () => fetchIsApplied(studyId),
        enabled: !!studyId && !!myInfo?.id,
    });

    const today = new Date();
    // 스터디 시작, 끝 날짜/시간
    const startDateTime = new Date(`${study?.startDate}T${study?.startTime}`);
    const endDateTime = new Date(`${study?.endDate}T${study?.endTime}`);

    console.log(endDateTime);
    // 시작 조건
    const canStart =
        apply &&
        apply?.isMember === true &&
        today >= startDateTime &&
        today < endDateTime;
    console.log("canStart:", canStart);

    // 닫히는 조건
    const isClosed = today > endDateTime;

    // 서바이벌 data, studyId, studyMemberId 전역으로 저장
    useEffect(() => {
        if (study) {
            setStudy({ ...study, studyId });
        }
    }, [setStudy, studyId, study]);

    const quizStartHandler = (studyId: number) => {
        router.push(`/survival-study/${studyId}/quiz/1`);
    };
    const buttonHandler = (studyId: number) => {
        if (!apply.isMember) {
            setShowModal(true);
        } else if (canStart) {
            if (!studyId) {
                console.error("스터디 정보 없음");
                return;
            }
            quizStartHandler(studyId);
        }
    };

    const applyHandler = async () => {
        changeClass("animate-modalFadeOut");
        try {
            await fetchSurvApply(studyId, myInfo?.id ?? 0);
            await refetchApply();
            setShowModal(false);

            customAlert({
                message: "서바이벌 스터디가 신청되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } catch (err) {
            console.error("신청 실패", err);
            customAlert({
                message: "신청 중 오류가 발생했습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };

    useEffect(() => {
        if (
            !groupedOwnItems.BACKGROUND ||
            groupedOwnItems.BACKGROUND.length === 0
        ) {
            fetchItemsOwn();
        }
        let selectedItemId = groupedOwnItems.BACKGROUND?.find(
            (v) => v.used,
        )?.itemId;
        if (selectedItemId === 11) selectedItemId = 18;
        setSrc(`/images/rewardItems/${selectedItemId}.png`);
        setIsImageLoading(true);
    }, [fetchItemsOwn, groupedOwnItems.BACKGROUND]);

    // 노로그인 사용자는 홈으로 보내버림
    useEffect(() => {
        if (myInfo === undefined) {
            router.push("/");
        }
    }, [myInfo, apply, isApplyLoading, router]);

    if (studyPending) {
        return (
            <>
                <SurvivalStudyLoading />
            </>
        );
    }

    return (
        <>
            <div className="green:bg-[#222] relative mb-10 h-screen dark:bg-[#222]">
                <div className="relative aspect-[1000/500] w-full">
                    <Image
                        src={src}
                        alt="survival study"
                        fill
                        priority
                        className={`${isImageLoading ? "opacity-0" : "opacity-100"} w-full`}
                        onLoad={() => setIsImageLoading(false)}
                    />
                    <div className="absolute top-4 left-4">
                        <BackButton className="h-4 w-4" />
                    </div>
                    <button className="absolute right-4 bottom-4 h-6.5 w-14.5 rounded-3xl bg-[#1d1d1d]/80">
                        <Link href={`/profile/${myInfo?.id}/theme`}>
                            <p className="c2 px-2 pt-0.5 text-white">
                                테마변경
                            </p>
                        </Link>
                    </button>
                </div>

                <NoticeBox
                    className="green:bg-[var(--color-gray1000)] green:text-white rounded-none bg-[var(--color-gray100)] pt-2 dark:bg-[var(--color-gray1000)] dark:text-white"
                    notice={study?.notice}
                />
                <SurvivalInfo study={study} />
                <div className="green:border-t-[var(--color-gray1000)] green:bg-[#222222] fixed bottom-0 z-10 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)] bg-white dark:border-t-[var(--color-gray1000)] dark:bg-[#222222]">
                    {apply && apply?.isMember === false ? (
                        <Button
                            onClick={() => buttonHandler(studyId)}
                            color="primary"
                            className="green:bg-[#00E69A] green:hover:bg-[#00BD7E] mx-5 my-5 text-white"
                            disabled={isClosed}
                        >
                            신청하기
                        </Button>
                    ) : (
                        <Button
                            onClick={() => buttonHandler(studyId)}
                            disabled={!canStart || isClosed}
                            className={`mx-5 my-5 ${
                                canStart
                                    ? "green:bg-[#00E69A] green:hover:bg-[#00BD7E] bg-[var(--color-main500)] text-white transition duration-200 hover:bg-[var(--color-main600)]"
                                    : "cursor-not-allowed bg-[var(--color-gray200)] text-[var(--color-gray500)]"
                            }`}
                        >
                            <Image
                                src="/icons/flash.svg"
                                alt="survival icon"
                                width={14}
                                height={14}
                                style={{ marginBottom: "1px" }}
                            />
                            퀴즈 시작
                        </Button>
                    )}
                </div>
                <ApplyModal
                    className="absolute bottom-[250px] left-1/2 -translate-x-1/2 dark:bg-[#222222]"
                    onClose={closeHandler}
                    onApply={applyHandler}
                    isOpen={showModal}
                    showTextArea={false}
                >
                    <p className="b1 mb-2.5 dark:text-white">
                        스터디를 신청하시겠습니까?
                    </p>
                    <div className="flex flex-col gap-2 rounded-xl bg-[var(--color-gray100)] p-4 dark:bg-[var(--color-gray1000)]">
                        <div className="flex justify-between dark:text-white">
                            <p className="b2">스터디 이름</p>
                            <p className="b2">{study?.name}</p>
                        </div>
                        <div className="flex justify-between dark:text-white">
                            <p className="b2">스터디 주제</p>
                            <p className="b2">{categoryMap[study?.category]}</p>
                        </div>
                        <div className="flex justify-between dark:text-white">
                            <p className="b2">스터디 요일</p>
                            <p className="b2">
                                매주 {dayMap[study?.schedules]}요일
                            </p>
                        </div>
                        <div className="flex justify-between dark:text-white">
                            <p className="b2">스터디 시간</p>
                            <p className="b2">
                                {study?.startTime}~{study?.endTime}
                            </p>
                        </div>
                    </div>
                </ApplyModal>
            </div>
            <WinnerModal />
        </>
    );
}
