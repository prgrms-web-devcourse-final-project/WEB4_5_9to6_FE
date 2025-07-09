"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "./common/Button";

export default function StudyTime() {
    const [isLoggedin, setIsLoggedin] = useState(true);
    // 시간에 따른 멘트 설정
    const hours = 6;
    const minutes = 39;
    const totalMinutes = hours * 60 + minutes;
    let message = "";
    let icon = "/icons/smile.svg";

    if (totalMinutes < 10) {
        message = "이제 공부를 시작해볼까요?";
        icon = "/icons/smile.svg";
    } else if (totalMinutes < 60) {
        message = "조금씩 성장중이군요! 계속 가볼까요?";
        icon = "/icons/angel-face.svg";
    } else if (totalMinutes < 120) {
        message = "열공 중이네요! 좋아요!";
        icon = "/icons/heart-eyes.svg";
    } else if (totalMinutes < 300) {
        message = "공부가 꽤 진행됐어요! 조만간 마스터 하겠는걸요?";
        icon = "/icons/face-hearts.svg";
    } else if (totalMinutes > 300) {
        message = "이렇게 공부하다가 코피나요! 대단해요!";
        icon = "/icons/Star-struck.svg";
    }

    return (
        <>
            {isLoggedin ? (
                // 로그인상태
                <section>
                    <h3 className="h3">어설픈도마뱀님의 공부시간</h3>
                    <div className="mt-3.5 min-h-[165px] w-full rounded-2xl bg-white px-[10%]">
                        <div className="flex pt-6">
                            <div className="flex w-1/2 flex-col">
                                <div className="mb-[11px]">
                                    <p className="c2">총 공부 시간</p>
                                </div>
                                <p className="h1">
                                    {hours}
                                    <span className="h5">시간</span>
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
                    <h3 className="h3">어설픈도마뱀님의 공부시간</h3>
                    <div className="mt-3.5 flex min-h-[165px] w-full flex-col items-center justify-center rounded-2xl bg-white px-[10%]">
                        <p className="h5 mb-7 text-center text-[var(--color-gray1000)]">
                            로그인 후<br />
                            스터디 정보를 확인해보세요
                        </p>
                        <Button className="h-9 w-25.5 cursor-pointer rounded-lg bg-[var(--color-main500)] transition duration-200 ease-in-out hover:bg-[var(--color-main600)]">
                            <p className="h6 text-white">로그인</p>
                        </Button>
                    </div>
                </section>
            )}
            <section className="mt-8">
                <h3 className="h3">이런 스터디도 있어요</h3>
            </section>
        </>
    );
}
