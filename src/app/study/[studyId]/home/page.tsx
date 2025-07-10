"use client";

import studyImg from "@/assets/studyImg.png";
import Button from "@/components/common/Button";
import MenuModal from "@/components/studyHome/MenuModal";
import StudyGoal from "@/components/studyInfo/StudyGoal";
import StudyUserModal from "@/components/studyHome/StudyUserModal";
import {
    Bell,
    ChevronDown,
    ChevronLeft,
    EllipsisVertical,
    MessageSquare,
    Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [attend, setAttend] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

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

                {/* 공지사항 */}
                <div className="flex h-[61px] w-full items-center justify-between bg-[#1D1D1D]/85 px-5 backdrop-blur-2xl">
                    <div className="flex min-w-0 flex-col">
                        <p className="c2 text-[#D6D6D6]">07.03 공지사항</p>
                        <p className="c1 truncate text-[#FFFFFF]">
                            오늘은 제가 예비군 일정으로 스터디장 없이 진행하기
                            바랍니다. 오늘은 제가 예비군 일정으로 스터디장 없이
                            진행하기 바랍니다.
                        </p>
                    </div>
                    <button className="ml-5 h-5 w-5 flex-shrink-0 cursor-pointer text-[#FFFFFF]">
                        <ChevronDown />
                    </button>
                </div>

                {/* 스터디 정보 */}
                <div className="mt-3 w-full px-5">
                    <button
                        className="flex h-[26px] w-[58px] cursor-pointer items-center justify-center gap-1 rounded-[50px] bg-[var(--color-gray200)] text-[var(--color-gray1000)] hover:bg-[var(--color-gray300)]"
                        onClick={() => setIsUserOpen(true)}
                    >
                        <Users className="h-[14px] w-[14px]" />
                        <span className="c2">9/15</span>
                    </button>

                    {/* 제목,일정 */}
                    <p className="mt-3 text-[22px] font-semibold text-[var(--color-gray1000)]">
                        숲속에서 함께 라틴어 공부
                    </p>
                    <p className="b2 mt-2 text-[var(--color-gray700)]">
                        매주 수요일 · 15:00~18:00 · 온라인(Zoom)
                    </p>

                    {/* 스터디 목표 */}
                    <StudyGoal />

                    {/* 학습 관련 링크 */}
                    <h3 className="mt-8 text-[var(--color-gray1000)]">
                        학습 관련 링크
                    </h3>
                    <div className="mt-[10px] mb-[10px] flex h-[50px] w-full items-center justify-center rounded-[12px] border border-[var(--color-gray300)] text-[var-(--color-gray1000)]">
                        https://www.inflearn.com/course/suyaisbest
                    </div>
                </div>

                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px]">
                    <Button color="primary" onClick={() => setAttend(true)}>
                        {" "}
                        {attend ? "스터디 시작" : "출석체크"}
                    </Button>
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
