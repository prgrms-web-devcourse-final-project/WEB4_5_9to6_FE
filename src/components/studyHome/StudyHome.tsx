import Image from "next/image";
import studyImg from "@/assets/studyImg.png";
import { useRouter } from "next/navigation";
import {
    Bell,
    ChevronLeft,
    EllipsisVertical,
    MessageSquare,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import StudyHomeDefault from "@/components/studyHome/StudyHomeDefault";
import StudyTimer from "@/components/studyHome/StudyTimer";
import MenuModal from "./MenuModal";
import StudyUserModal from "@/components/studyHome/StudyUserModal";
import StudyGoalModal from "@/components/studyHome/StudyGoalModal";
import AvatarDisplay from "./AvatarDisplay";
export default function StudyHome({
    isStart,
    pause,
    isMenuOpen,
    setIsMenuOpen,
}: {
    isStart: boolean;
    pause: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const router = useRouter();

    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isGoalOpen, setIsGoalOpen] = useState(false);

    return (
        <>
            {/* 스터디 이미지 */}
            <div className="relative h-[256px] w-full">
                <Image
                    src={studyImg}
                    alt="스터디 배경"
                    className="h-full w-full"
                />
                {isStart && (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/0 via-[#000000]/26 to-[#000000]/50"></div>
                )}
                {/* 상단 메뉴 */}
                {!isStart && (
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
                                onClick={() => router.push("/chat")}
                            >
                                <MessageSquare className="h-5 w-5 text-[#161616]" />
                            </button>
                            <button
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[500px] bg-[#FFFFFF]/90 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray200)]/90"
                                onClick={() => router.push("/notifications")}
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
                )}
                {/* 아바타 위치 지정 */}
                <div className="absolute bottom-[30px] left-1/2 z-30 flex -translate-x-1/2">
                    <AvatarDisplay num={5} />
                </div>
                {!isStart && (
                    <button
                        className="absolute right-4 bottom-4 z-20 flex h-[26px] w-[58px] cursor-pointer items-center justify-center rounded-[50px] bg-[#1D1D1D]/80 transition-all duration-200 ease-in-out hover:bg-[var(--color-gray900)]/80"
                        onClick={() => router.push("/profile/1/theme")}
                    >
                        <span className="c2 text-[var(--color-white)]">
                            테마변경
                        </span>
                    </button>
                )}
            </div>

            {!isStart && (
                <StudyHomeDefault onOpen={() => setIsUserOpen(true)} />
            )}

            {isStart && (
                <div className="z-30 mt-[-18px] flex rounded-t-[16px] bg-[var(--color-white)]">
                    <StudyTimer pause={pause} setIsGoalOpen={setIsGoalOpen} />
                </div>
            )}

            {isMenuOpen && (
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
            )}
        </>
    );
}
