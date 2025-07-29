import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Bell,
    ChevronLeft,
    EllipsisVertical,
    MessageSquare,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StudyHomeDefault from "@/components/studyHome/StudyHomeDefault";
import StudyTimer from "@/components/studyHome/StudyTimer";
import AvatarDisplay from "./AvatarDisplay";
import { useAuthStore } from "@/stores/authStore";
import MenuModal from "./modal/MenuModal";
import StudyGoalModal from "./modal/StudyGoalModal";
import StudyUserModal from "./modal/StudyUserModal";
import { useOwnItemStore } from "@/stores/ownItemStore";
export default function StudyHome({
    studyId,
    notice,
    schedules,
    startTime,
    endTime,
    region,
    name,
    exLink,
    maxMembers,
    currentMemberCount,
    isStart,
    pause,
    isMenuOpen,
    setIsMenuOpen,
    studyTimeSec,
}: {
    studyId: number;
    notice: string | undefined;
    schedules: string[];
    startTime: string;
    endTime: string;
    region: string;
    name: string;
    exLink: string | undefined;
    maxMembers: number;
    currentMemberCount: number;
    isStart: boolean;
    pause: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
    studyTimeSec: string;
}) {
    const router = useRouter();
    const userInfo = useAuthStore((state) => state.myInfo);
    const { groupedOwnItems } = useOwnItemStore();

    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isGoalOpen, setIsGoalOpen] = useState(false);
    const [src, setSrc] = useState(`/images/rewardItems/11.png`);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const selectedItemId = groupedOwnItems.BACKGROUND?.find(
            (v) => v.used,
        )?.itemId;
        setSrc(`/images/rewardItems/${selectedItemId}.png`);
        setIsImageLoading(true);
    }, [groupedOwnItems]);

    return (
        <>
            {/* 스터디 이미지 */}
            <div className="relative aspect-[1000/500] w-full">
                {isImageLoading && (
                    <div className="bg-gray300 absolute inset-0 z-10 animate-pulse" />
                )}
                <Image
                    src={src}
                    alt="스터디 배경"
                    fill
                    priority
                    className={`${isImageLoading ? "opacity-0" : "opacity-100"} w-full`}
                    onLoad={() => setIsImageLoading(false)}
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
                                onClick={() =>
                                    router.push(`/study/${studyId}/chat`)
                                }
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
                        onClick={() =>
                            router.push(`/profile/${userInfo?.id}/theme`)
                        }
                    >
                        <span className="c2 text-[var(--color-white)]">
                            테마변경
                        </span>
                    </button>
                )}
            </div>

            {!isStart && (
                <StudyHomeDefault
                    notice={notice}
                    schedules={schedules}
                    startTime={startTime}
                    endTime={endTime}
                    region={region}
                    name={name}
                    exLink={exLink}
                    maxMembers={maxMembers}
                    currentMemberCount={currentMemberCount}
                    onOpen={() => setIsUserOpen(true)}
                />
            )}

            {isStart && (
                <div className="z-30 mt-[-18px] flex rounded-t-[16px] bg-[var(--color-white)]">
                    <StudyTimer
                        pause={pause}
                        setIsGoalOpen={setIsGoalOpen}
                        studyTimeSec={studyTimeSec}
                    />
                </div>
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
                    studyId={studyId}
                    isOpen={isGoalOpen}
                    onClose={() => setIsGoalOpen(false)}
                />
            )}
        </>
    );
}
