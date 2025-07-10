"use client";

import studyImg from "@/assets/studyImg.png";
import Button from "@/components/common/Button";
import MenuModal from "@/components/studyHome/MenuModal";
import StudyTimer from "@/components/studyHome/StudyTimer";
import StudyUserModal from "@/components/studyHome/StudyUserModal";
import StudyHomeDefault from "@/components/studyHome/studyHomeDefault";
import {
    Bell,
    ChevronLeft,
    EllipsisVertical,
    MessageSquare,
    Pause,
    Play,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [attend, setAttend] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [pause, setPause] = useState(false);

    const finishHandler = () => {
        setIsStart(false);
        setPause(false);
    };
    return (
        <>
            <div className="flex min-h-screen min-w-[360px] flex-col bg-[var(--color-white)]">
                {/* 스터디 이미지 */}
                <div className="relative h-[256px] w-full">
                    <Image
                        src={studyImg}
                        alt="스터디 배경"
                        className="h-full w-full"
                    />

                    {/* 상단 메뉴 */}
                    <div className="absolute top-5 right-4 left-4 z-20 flex justify-between">
                        <button
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90"
                            onClick={() => router.back()}
                        >
                            <ChevronLeft className="h-5 w-5 text-[#161616]" />
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90"
                                onClick={() => router.back()}
                            >
                                <MessageSquare className="h-5 w-5 text-[#161616]" />
                            </button>
                            <button
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90"
                                onClick={() => router.back()}
                            >
                                <Bell className="h-5 w-5 text-[#161616]" />
                            </button>
                            <button
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <EllipsisVertical className="h-5 w-5 text-[#161616]" />
                            </button>
                        </div>
                    </div>

                    <button className="absolute right-4 bottom-4 z-20 flex h-[26px] w-[58px] cursor-pointer items-center justify-center rounded-[50px] bg-[#1D1D1D]/80 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray900)]/80">
                        <span className="c2 text-[var(--color-white)]">
                            테마변경
                        </span>
                    </button>
                </div>

                {!isStart && (
                    <StudyHomeDefault onOpen={() => setIsUserOpen(true)} />
                )}

                {isStart && <StudyTimer pause={pause} />}
                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px]">
                    {!attend && (
                        <Button color="primary" onClick={() => setAttend(true)}>
                            출석체크
                        </Button>
                    )}
                    {attend && !isStart && (
                        <Button
                            color="primary"
                            onClick={() => setIsStart(true)}
                        >
                            스터디 시작
                        </Button>
                    )}
                    {isStart && (
                        <div className="flex w-full items-center justify-between gap-2">
                            <button
                                className="h-[50px] w-full basis-[35.9%] cursor-pointer rounded-xl bg-[var(--color-main100)]"
                                onClick={finishHandler}
                            >
                                <h5 className="text-[var(--color-main500)]">
                                    그만하기
                                </h5>
                            </button>
                            <Button
                                color="primary"
                                className="basis-[64.1%]"
                                onClick={() => setPause(!pause)}
                            >
                                {!pause && <Pause className="h-6 w-6" />}
                                {pause && <Play className="h-6 w-6" />}
                            </Button>
                        </div>
                    )}
                </div>

                {isMenuOpen && (
                    <MenuModal
                        onClose={() => setIsMenuOpen(false)}
                        setIsUserOpen={setIsUserOpen}
                    />
                )}

                {isUserOpen && (
                    <StudyUserModal onClose={() => setIsUserOpen(false)} />
                )}
            </div>
        </>
    );
}
