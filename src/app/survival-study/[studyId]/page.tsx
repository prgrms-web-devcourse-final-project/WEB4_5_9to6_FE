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
import { fetchIsApplied, fetchSurvival } from "@/api/studyList";
import { useAuthStore } from "@/stores/authStore";
import { useSurvivalStore } from "@/stores/survivalStore";
import { dayMap, categoryMap } from "@/utils/studyDataMap";
import { useOwnItemStore } from "@/stores/ownItemStore";
import SurvivalStudyLoading from "@/components/survival/SurvivalStudyLoading";

export default function SurvivalStudy() {
    const params = useParams();
    const studyId = Number(params?.studyId);
    const router = useRouter();
    const { myInfo } = useAuthStore();
    const { setStudy } = useSurvivalStore();
    const { fetchItemsOwn, groupedOwnItems } = useOwnItemStore();
    const [src, setSrc] = useState(`/images/rewardItems/11.png`);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { changeClass } = useAnimationStore();
    const closeHandler = () => setShowModal(false);

    const { data: study, isPending: studyPending } = useQuery({
        queryKey: ["survivalStudy", studyId],
        queryFn: () => fetchSurvival(studyId),
        enabled: !!studyId,
    });

    const {
        data: apply,
        refetch: refetchApply,
        isLoading: isApplyLoading,
    } = useQuery({
        queryKey: ["isApplied", studyId, myInfo?.id],
        queryFn: () => fetchIsApplied(studyId),
        enabled: !!studyId && !!myInfo?.id,
    });
    const now = new Date();
    const startDateTime = new Date(`${study?.startDate}T${study?.startTime}`);
    const endDateTime = new Date(`${study?.startDate}T${study?.endTime}`);

    const canStart =
        apply?.isMember === true && now >= startDateTime && now < endDateTime;

    const isClosed = now > endDateTime;
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
                console.error("studyId is undefined");
                return;
            }
            quizStartHandler(studyId);
        }
    };

    const applyHandler = async () => {
        try {
            await refetchApply();

            changeClass("animate-modalFadeOut");
            setTimeout(() => {
                setShowModal(false);
            }, 300);

            customAlert({
                message: "서바이벌 스터디가 신청되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } catch (err) {
            console.error(err);
            customAlert({
                message: "이미 신청했거나 오류가 발생했습니다.",
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

    // 노로그인/노가입 사용자는 홈으로 보내버림
    useEffect(() => {
        if (myInfo === null && !apply) {
            router.push("/");
        }
    }, [myInfo, apply, router, isApplyLoading]);

    if (studyPending) {
        return (
            <>
                <SurvivalStudyLoading />
            </>
        );
    }

    return (
        <>
            <div className="relative mb-10 h-screen">
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
                    notice={study?.notice}
                    color="default"
                    className="bg-gray100 rounded-none pt-3 dark:bg-[#222]"
                />
                <SurvivalInfo study={study} />
                <div className="fixed bottom-0 z-10 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)] bg-white dark:border-t-[var(--color-gray1000)] dark:bg-[#222]">
                    {apply?.isMember === false ? (
                        <Button
                            onClick={() => buttonHandler(study.studyId)}
                            color="primary"
                            className="mx-5 my-5"
                            disabled={isClosed}
                        >
                            신청하기
                        </Button>
                    ) : (
                        <Button
                            onClick={() => buttonHandler(studyId)}
                            disabled={!canStart}
                            className={`mx-5 my-5 ${
                                canStart
                                    ? "bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]"
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
                    className="absolute bottom-[250px] left-1/2 -translate-x-1/2"
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
                                매주 {dayMap[study?.schedules]}
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
