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
import { useState } from "react";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";
import { fetchSurvival } from "@/api/studyList";

export default function SurvivalStudy() {
    const params = useParams();
    const studyId = Number(params?.studyId);
    const router = useRouter();

    // 시작요일
    const quizDay = 3;

    // const today = new Date();
    const todayDay = new Date().getDay();
    const [isApplied, setIsApplied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { changeClass } = useAnimationStore();
    const canStart = isApplied && todayDay === quizDay;

    const dayMap: Record<string, string> = {
        MON: "월요일",
        TUE: "화요일",
        WED: "수요일",
        THU: "목요일",
        FRI: "금요일",
        SAT: "토요일",
        SUN: "일요일",
    };

    const closeHandler = () => setShowModal(false);

    const quizStartHandler = (studyId: number) => {
        router.push(`/survival-study/${studyId}/quiz/1`);
    };

    const { data: study, isLoading } = useQuery({
        queryKey: ["survivalStudy", studyId],
        queryFn: () => fetchSurvival(studyId),
        enabled: !!studyId,
    });

    const buttonHandler = (studyId: number) => {
        if (!isApplied) {
            setShowModal(true);
        } else if (canStart) {
            quizStartHandler(studyId);
        }
    };

    const applyHandler = () => {
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            setShowModal(false);
        }, 300);

        setIsApplied(true);
        customAlert({
            message: "서바이벌 스터디가 신청되었습니다!",
            linkLabel: "닫기",
            onClick: () => {},
        });
    };

    return (
        <>
            <div className="relative h-screen">
                <div className="relative">
                    <Image
                        src="/images/roomImgs/room7.png"
                        alt="survival study"
                        width={1000}
                        height={470}
                        style={{
                            width: "100%",
                            maxHeight: "500px",
                        }}
                        priority
                    />
                    <div className="absolute top-4 left-4">
                        <BackButton className="h-4 w-4" />
                    </div>
                    <button className="absolute right-4 bottom-4 h-6.5 w-14.5 rounded-3xl bg-[#1d1d1d]/80">
                        <Link href="/profile/123/theme">
                            <p className="c2 px-2 pt-0.5 text-white">
                                테마변경
                            </p>
                        </Link>
                    </button>
                </div>

                <NoticeBox notice={study?.notice} />
                <SurvivalInfo study={study} />
                <div className="flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                    {!isApplied ? (
                        <Button
                            onClick={() => buttonHandler(study.studyId)}
                            color="primary"
                            className="mx-5 my-5"
                        >
                            신청하기
                        </Button>
                    ) : (
                        <Button
                            onClick={() => buttonHandler(study?.studyId)}
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
                    <p className="b1 mb-2.5">스터디를 신청하시겠습니까?</p>
                    <div className="flex flex-col gap-2 rounded-xl bg-[var(--color-gray100)] p-4">
                        <div className="flex justify-between">
                            <p className="b2">스터디 이름</p>
                            <p className="b2">{study.description}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="b2">스터디 주제</p>
                            <p className="b2">{study.category}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="b2">스터디 요일</p>
                            <p className="b2">매주 {dayMap[study.schedules]}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="b2">스터디 시간</p>
                            <p className="b2">
                                {study.startTime}~{study.endTime}
                            </p>
                        </div>
                    </div>
                </ApplyModal>
            </div>
            <WinnerModal />
        </>
    );
}
