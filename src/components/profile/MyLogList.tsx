"use client";

import Image from "next/image";
import trophy from "../../assets/images/trophy.png";
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
                <Image src={trophy} alt="트로피" className="h-26 w-26" />
                <p className="text-main400 text-[28px] font-bold">
                    {data?.winCount || 0}회
                </p>
            </div>
            <div className="bg-gray200 h-4 w-full"></div>
            {(data?.userStudies || []).length > 0 && (
                <div className="my-6 flex w-full flex-col gap-4">
                    <h3 className="text-gray1000">스터디별 활동 현황</h3>
                    <button
                        onClick={openModal}
                        className="bg-gray200 hover:bg-gray300 flex cursor-pointer justify-between rounded-2xl p-5"
                    >
                        <h5 className="text-gray1000">
                            {data?.userStudies[studyIndex].title ||
                                "스터디 없음"}
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

//   {
//     "title": "토익 900 목표 스터디",
//     "currentMemberCount": 5,
//     "maxMemberCount": 8,
//     "category": "LANGUAGE",
//     "region": "ONLINE",
//     "place": "ONLINE",
//     "schedules": [
//       "TUE"
//     ],
//     "startTime": "20:00",
//     "endTime": "22:00",
//     "studyType": "SURVIVAL",
//     "achievementRecords": []
//   },
