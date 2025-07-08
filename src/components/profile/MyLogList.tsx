"use client";

import Image from "next/image";
import trophy from "../../assets/images/trophy.png";
import { ChevronDown } from "lucide-react";
import LogPerWeek from "./LogPerWeek";
import { useMyStudyModalStore } from "@/stores/myStudyModalStore";

export default function MyLogList() {
    const { openModal } = useMyStudyModalStore();

    return (
        <>
            <div className="flex w-full flex-col items-center gap-6 py-8">
                <h4 className="text-gray1000">서바이벌 우승 횟수</h4>
                <Image src={trophy} alt="트로피" className="h-26 w-26" />
                <p className="text-main400 text-[28px] font-bold">7회</p>
            </div>
            <div className="bg-gray200 h-4 w-full"></div>
            <div className="mx-5 my-6 flex w-full flex-col gap-4">
                <h3 className="text-gray1000">스터디별 활동 현황</h3>
                <button
                    onClick={openModal}
                    className="bg-gray200 hover:bg-gray300 flex w-80 cursor-pointer justify-between rounded-2xl p-5"
                >
                    <h5 className="text-gray1000">
                        수코딩 강의로 배우는 프론트엔드
                    </h5>
                    <ChevronDown size={18} className="text-gray500" />
                </button>
                <LogPerWeek />
            </div>
        </>
    );
}
