"use client";

import { ChevronLeft } from "lucide-react";
import studyImg from "@/assets/studyImg.png";
import Image from "next/image";
import { useState } from "react";
import StudyInfo from "@/components/studyInfo/StudyInfo";
import StudyUsers from "@/components/studyInfo/StudyUsers";
import ApplyModal from "@/components/studyInfo/ApplyModal";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

export default function Page() {
    const [channel, setChannel] = useState("정보");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const applyHandler = () => {
        setIsOpen(false);
        //신청자 목록에 추가
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
                    <div className="absolute inset-0 z-10 h-[256px] w-full bg-black opacity-30" />
                    <button
                        className="absolute top-5 left-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-5 w-5 text-[#161616]" />
                    </button>
                    <h2 className="absolute bottom-5 left-5 z-20 text-[var(--color-white)]">
                        <p>숲속에서 함께 라틴어 공부할</p>
                        <p className="mt-[10px]">요정들의 스터디 모임</p>
                    </h2>
                </div>

                {/* 채널(정보/팀원현황) */}
                <div className="flex h-[50px] w-full items-center justify-center gap-4 border-b border-b-[var(--color-gray300)] px-5">
                    <button
                        onClick={() => setChannel("정보")}
                        className={`flex h-full w-full cursor-pointer items-center justify-center border-b-2 ${channel === "정보" ? "border-b-[var(--color-gray1000)] text-[var(--color-gray1000)]" : "border-b-[var(--color-white)] text-[var(--color-gray500)]"}`}
                    >
                        정보
                    </button>
                    <button
                        onClick={() => setChannel("팀원 현황")}
                        className={`flex h-full w-full cursor-pointer items-center justify-center border-b-2 ${channel === "팀원 현황" ? "border-b-[var(--color-gray1000)] text-[var(--color-gray1000)]" : "border-b-[var(--color-white)] text-[var(--color-gray500)]"}`}
                    >
                        팀원 현황
                    </button>
                </div>

                {channel === "정보" && <StudyInfo />}
                {channel === "팀원 현황" && <StudyUsers />}

                {/* 신청하기 버튼 */}
                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px]">
                    <Button onClick={() => setIsOpen(true)} color="primary">
                        신청하기
                    </Button>
                </div>

                {isOpen && (
                    <ApplyModal
                        onClose={() => setIsOpen(false)}
                        onApply={() => applyHandler()}
                    />
                )}
            </div>
        </>
    );
}
