"use client";

import Button from "@/components/common/Button";
import SubHeader from "@/components/common/SubHeader";
import StudyHome from "@/components/studyHome/StudyHome";
import { customAlert } from "@/utils/customAlert";
import {
    Bell,
    EllipsisVertical,
    MessageSquare,
    Pause,
    Play,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Page() {
    const [attend, setAttend] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [pause, setPause] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const finishHandler = () => {
        setIsStart(false);
        setPause(false);
    };

    const attendHandler = () => {
        setAttend(true);
        customAlert({
            message: "출석체크 완료! 오늘도 화이팅이에요!",
            linkLabel: "닫기",
            onClick: () => {},
        });
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
            <SubHeader
                className={`z-40 bg-[var(--color-white)] transition-all duration-200 ease-in-out ${
                    showHeader
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                }`}
            >
                <div className="absolute right-7 left-11 flex items-center justify-between">
                    <p className="b2 ml-2 min-w-0 basis-[40%] truncate">
                        숲속에서 함께 라틴어 공부할 요정들의 스터디 모임
                    </p>
                    <div className="flex items-center gap-4">
                        <MessageSquare
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push("/chat")}
                        />
                        <Bell
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push("/notifications")}
                        />
                        <EllipsisVertical
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => setIsMenuOpen(true)}
                        />
                    </div>
                </div>
            </SubHeader>
            <div className="flex min-h-screen min-w-[360px] flex-col bg-[var(--color-white)]">
                <StudyHome
                    isStart={isStart}
                    pause={pause}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {/* 버튼 */}
                <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t border-t-[var(--color-gray200)] px-5 py-[14px]">
                    {!attend && (
                        <Button color="primary" onClick={attendHandler}>
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

                {/* {isMenuOpen && (
                    <MenuModal
                        onClose={() => setIsMenuOpen(false)}
                        setIsUserOpen={setIsUserOpen}
                    />
                )}

                {isUserOpen && (
                    <StudyUserModal onClose={() => setIsUserOpen(false)} />
                )}

                {isGoalOpen && (
                    <StudyGoalModal onClose={() => setIsGoalOpen(false)} />
                )} */}
            </div>
        </>
    );
}
