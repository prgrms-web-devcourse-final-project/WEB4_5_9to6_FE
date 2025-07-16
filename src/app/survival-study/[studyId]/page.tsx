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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { customAlert } from "@/utils/customAlert";

export default function SurvivalStudy() {
    const router = useRouter();

    // 시작요일
    const quizDay = 3;

    // const today = new Date();
    const todayDay = new Date().getDay();
    const [isApplied, setIsApplied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { changeClass } = useAnimationStore();
    const canStart = isApplied && todayDay === quizDay;

    const closeHandler = () => setShowModal(false);

    const quizStartHandler = () => {
        router.push("/survival-study/1/quiz/1");
    };

    const buttonHandler = () => {
        if (!isApplied) {
            setShowModal(true);
        } else if (canStart) {
            quizStartHandler();
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

                <NoticeBox
                    content="다음 퀴즈는 7/17 10시에 열릴 예정입니다."
                    className="rounded-none bg-[var(--color-gray100)]/85"
                    date="07.11"
                />
                <SurvivalInfo />
                <div className="flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                    {!isApplied ? (
                        <Button
                            onClick={buttonHandler}
                            color="primary"
                            className="mx-5 my-5"
                        >
                            신청하기
                        </Button>
                    ) : (
                        <Button
                            onClick={quizStartHandler}
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
                            <p className="b2">스터디명</p>
                            <p className="b2">프로그래머스 부수기</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="b2">스터디주제</p>
                            <p className="b2">토익</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="b2">스터디 요일</p>
                            <p className="b2">매주 월요일</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="b2">스터디 시간</p>
                            <p className="b2">19:00~20:00</p>
                        </div>
                    </div>
                </ApplyModal>
            </div>
            <WinnerModal />
        </>
    );
}
