import Image from "next/image";
import studyImg from "@/assets/studyImg.png";
import { useRouter } from "next/navigation";
import {
    Bell,
    ChevronLeft,
    EllipsisVertical,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";
import StudyHomeDefault from "@/components/studyHome/StudyHomeDefault";
import StudyTimer from "@/components/studyHome/StudyTimer";
import MenuModal from "./MenuModal";
import StudyUserModal from "@/components/studyHome/StudyUserModal";
import StudyGoalModal from "@/components/studyHome/StudyGoalModal";
import boy from "../../../public/images/avatarImgs/basic1.png";
export default function StudyHome({
    isStart,
    pause,
}: {
    isStart: boolean;
    pause: boolean;
}) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                {/* 아바타 위치 지정 */}
                <div className="absolute bottom-[60px] left-1/2 z-30 flex -translate-x-1/2">
                    <Image src={boy} alt="아바타" width={52} height={52} />
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

            {isStart && (
                <StudyTimer pause={pause} setIsGoalOpen={setIsGoalOpen} />
            )}

            {isMenuOpen && (
                <MenuModal
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    setIsUserOpen={setIsUserOpen}
                />
            )}

            {isUserOpen && (
                <StudyUserModal
                    isOpen={isUserOpen}
                    onClose={() => setIsUserOpen(false)}
                />
            )}

            {isGoalOpen && (
                <StudyGoalModal
                    isOpen={isGoalOpen}
                    onClose={() => setIsGoalOpen(false)}
                />
            )}
        </>
    );
}
