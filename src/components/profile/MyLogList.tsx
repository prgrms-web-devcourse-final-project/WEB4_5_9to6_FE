"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import LogPerWeek from "./LogPerWeek";
import { useMyStudyModalStore } from "@/stores/myStudyModalStore";
import { useProfileStore } from "@/stores/memberStore";
import LogSurvival from "./LogSurvival";

export default function MyLogList({ id }: { id: string }) {
    const { openModal, studyIndex } = useMyStudyModalStore();
    const { data, data3 } = useProfileStore();
    return (
        <>
            <div className="flex w-full flex-col items-center gap-6 py-8">
                <h4 className="text-gray1000">서바이벌 우승 횟수</h4>
                <div className="relative h-26 w-26">
                    <Image
                        src="/images/trophy.png"
                        alt="트로피"
                        fill
                        className="object-contain"
                        sizes="104px"
                        priority
                    />
                </div>
                <p className="text-main400 text-[28px] font-bold">
                    {data?.winCount || 0}회
                </p>
            </div>
            <div className="bg-gray200 h-4 w-full"></div>
            {(data3 || []).length > 0 && (
                <div className="my-6 flex w-full flex-col gap-4">
                    <h3 className="text-gray1000">스터디별 활동 현황</h3>
                    <button
                        onClick={openModal}
                        className="bg-gray200 hover:bg-gray300 flex cursor-pointer justify-between rounded-2xl p-5"
                    >
                        <h5 className="text-gray1000">
                            {(data3 || [])[studyIndex].title || "스터디 없음"}
                        </h5>
                        <ChevronDown size={18} className="text-gray500" />
                    </button>
                    {(data3 || [])[studyIndex].studyType === "SURVIVAL" ? (
                        <LogSurvival study={(data3 || [])[studyIndex]} />
                    ) : (
                        <LogPerWeek id={id} study={(data3 || [])[studyIndex]} />
                    )}
                </div>
            )}
        </>
    );
}
