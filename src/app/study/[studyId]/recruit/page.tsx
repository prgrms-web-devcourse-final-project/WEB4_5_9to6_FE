"use client";

import { ChevronLeft } from "lucide-react";
import studyImg from "@/assets/studyImg.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import StudyInfo from "@/components/studyRecruit/StudyInfo";
import StudyUsers from "@/components/studyRecruit/StudyUsers";
import ApplyModal from "@/components/studyRecruit/ApplyModal";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import SubHeader from "@/components/common/SubHeader";
import ChannelSlideBar from "@/components/common/ChannelSlideBar";
import { customAlert } from "@/utils/customAlert";

export default function Page() {
    const [channel, setChannel] = useState("정보");
    const [isOpen, setIsOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [isApply, setIsApply] = useState(false);
    const router = useRouter();

    const applyHandler = () => {
        setIsOpen(false);
        setIsApply(true);
        customAlert({
            message: "스터디를 신청했어요.곧 연락올거에요!",
            linkLabel: "닫기",
            onClick: () => {},
        });
        //신청자 목록에 추가
    };

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
    return (
        <>
            {/* 스크롤시 헤더 */}

            <SubHeader
                className={`z-40 bg-[var(--color-white)] transition-all duration-200 ease-in-out ${
                    showHeader
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                }`}
            >
                <p className="b2 min-w-0 basis-[50%] truncate">
                    숲속에서 함께 라틴어 공부할 요정들의 스터디 모임
                </p>
            </SubHeader>

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
                <ChannelSlideBar
                    channels={["정보", "팀원 현황"]}
                    channel={channel}
                    setChannel={setChannel}
                />
                {channel === "정보" && <StudyInfo />}
                {channel === "팀원 현황" && <StudyUsers />}

                {/* 신청하기 버튼 */}
                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px]">
                    {isApply ? (
                        <Button disabled>신청 완료</Button>
                    ) : (
                        <Button onClick={() => setIsOpen(true)} color="primary">
                            신청하기
                        </Button>
                    )}
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
