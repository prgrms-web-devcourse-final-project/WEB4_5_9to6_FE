"use client";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
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
}: {
    category: string;
    isNew: boolean;
    title: string;
    avatar: string;
    schedule: string;
    region: string;
    place?: string;
    startTime: string;
    endTime: string;
    member: { current: number; max: number };
    studyId: number;
}) {
    const router = useRouter();
    const clickHandler = (id: number) => {
        router.push(`/study/${id}/recruit`);
    };
    return (
        <>
            <div
                className="group h-[157px] w-full cursor-pointer rounded-[16px] bg-white px-4"
                onClick={() => clickHandler(studyId)}
            >
                <div className="flex h-[104px] w-full justify-between py-[14px]">
                    <div>
                        {/* 뱃지 */}
                        <div className="flex h-[24px] items-center gap-[6px]">
                            <div className="c2 h-full rounded-[8px] bg-[var(--color-gray200)] px-2 text-[var(--color-gray1000)]">
                                {category}
                            </div>
                            {isNew && (
                                <div className="c2 h-full rounded-[8px] bg-[var(--color-gray200)] px-2 text-[#FF395C]">
                                    New
                                </div>
                            )}
                        </div>
                        {/*제목*/}
                        <h4 className="mt-2 text-[var(--color-gray1000)] transition-all duration-200 ease-in-out group-hover:text-[#727272]">
                            {title}
                        </h4>
                    </div>

                    {/* 아바타 */}
                    <div className="my-[5px] h-[66px] w-[66px] rounded-[26px] bg-[var(--color-gray100)] p-[10px]">
                        <img
                            src={
                                typeof avatar === "string" && avatar
                                    ? avatar
                                    : "/avatar.svg"
                            }
                            alt="아바타이미지"
                            width={46}
                            height={46}
                        />
                    </div>
                </div>

                {/* 일정,장소,인원수 */}
                <div className="h-[53px] border-t border-t-[var(--color-gray200)] text-[#727272]">
                    <p className="c1 mt-[7px] mb-[1px] leading-none">
                        매주 {schedule} {startTime}~{endTime}
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
