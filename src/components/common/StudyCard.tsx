"use client";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import defaultImg from "../../../public/images/rewardItems/61.png";
import Image from "next/image";
import { checkIsMember } from "@/api/studies";
import { useAuthStore } from "@/stores/authStore";
export default function StudyCard({
    category,
    isNew,
    title,
    avatar,
    schedule,
    region,
    place,
    startTime,
    endTime,
    member: { current, max },
    studyId,
    studyType,
    leaderId,
}: {
    category: string;
    isNew: boolean;
    title: string;
    avatar: string | undefined;
    schedule: string;
    region: string;
    place?: string;
    startTime: string;
    endTime: string;
    member: { current: number; max: number };
    studyId: number;
    studyType: "DEFAULT" | "SURVIVAL";
    leaderId: number | undefined;
}) {
    const router = useRouter();
    const userInfo = useAuthStore((state) => state.myInfo);
    const clickHandler = async (id: number) => {
        const isMember = await checkIsMember(id);

        if (studyType === "DEFAULT") {
            if (leaderId && leaderId === userInfo?.id) {
                router.push(`/study/${id}/manage`);
            } else if (isMember.isMember === true) router.push(`/study/${id}`);
            else router.push(`/study/${id}/recruit`);
        } else {
            router.push(`/survival-study/${id}`);
        }
    };
    return (
        <>
            <div
                className="group dark:bg-gray1000 h-[157px] w-full cursor-pointer rounded-[16px] bg-white px-4"
                onClick={() => clickHandler(studyId)}
            >
                <div className="flex h-[104px] w-full justify-between py-[14px]">
                    <div>
                        {/* 뱃지 */}
                        <div className="flex h-[24px] items-center gap-[6px]">
                            <div className="c2 dark:bg-gray800 h-full rounded-[8px] bg-[var(--color-gray200)] px-2 text-[var(--color-gray1000)] dark:text-white">
                                {category}
                            </div>
                            {studyType === "SURVIVAL" && (
                                <div className="c2 dark:text-main400 h-full rounded-[8px] bg-[var(--color-main100)] px-2 text-[#FF395C] dark:bg-black">
                                    서바이벌
                                </div>
                            )}

                            {isNew && (
                                <div className="c2 dark:bg-gray800 dark:text-main400 h-full rounded-[8px] bg-[var(--color-gray200)] px-2 text-[#FF395C]">
                                    New
                                </div>
                            )}
                        </div>
                        {/*제목*/}
                        <h4 className="dark:group-hover:text-gray500 mt-2 text-[var(--color-gray1000)] transition-all duration-200 ease-in-out group-hover:text-[#727272] dark:text-white">
                            {title}
                        </h4>
                    </div>

                    {/* 아바타 */}
                    <div className="dark:bg-gray900 my-[5px] h-[66px] w-[66px] rounded-[26px] bg-[var(--color-gray100)] p-[10px]">
                        <Image
                            src={avatar || defaultImg}
                            alt="아바타이미지"
                            width={46}
                            height={46}
                        />
                    </div>
                </div>

                {/* 일정,장소,인원수 */}
                <div className="dark:text-gray500 dark:border-t-gray800 h-[53px] border-t border-t-[var(--color-gray200)] text-[#727272]">
                    <p className="c1 mt-[7px] mb-[1px] leading-none">
                        매주 {schedule}요일 {startTime}~{endTime}
                    </p>
                    <div className="flex justify-between">
                        <span className="c2">
                            {region} {place}
                        </span>
                        <div className="c1 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {current}/{max}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
