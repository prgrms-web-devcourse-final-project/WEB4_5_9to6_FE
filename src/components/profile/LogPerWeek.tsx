"use client";

import { Check, Minus } from "lucide-react";

export default function LogPerWeek() {
    return (
        <>
            <div className="w-full rounded-2xl bg-white p-5">
                <h6 className="text-gray700 mb-[14px]">주간 출석 현황</h6>
                <div className="mb-8 flex gap-[9px]">
                    <span className="bg-main500 flex h-8 w-8 items-center justify-center rounded-full">
                        <Check size={16} className="text-white" />
                    </span>
                    <span className="bg-main500 flex h-8 w-8 items-center justify-center rounded-full">
                        <Check size={16} className="text-white" />
                    </span>
                    <span className="bg-gray1000 flex h-8 w-8 items-center justify-center rounded-full">
                        <Minus size={16} className="text-white" />
                    </span>
                    <span className="bg-main500 flex h-8 w-8 items-center justify-center rounded-full">
                        <Check size={16} className="text-white" />
                    </span>
                    <span className="bg-gray1000 flex h-8 w-8 items-center justify-center rounded-full">
                        <Minus size={16} className="text-white" />
                    </span>
                    <span className="bg-gray100 flex h-8 w-8 items-center justify-center rounded-full"></span>
                    <span className="bg-gray100 flex h-8 w-8 items-center justify-center rounded-full"></span>
                </div>
                <hr className="text-gray200 mb-5" />
                <h6 className="text-gray700 mb-[14px]">주간 미션 진척도</h6>
                <div className="mb-8 gap-[9px]">
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">1주차</p>
                        <div className="bg-main400 h-[10px] w-60 rounded-sm"></div>
                    </span>
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">2주차</p>
                        <div className="bg-main300 h-[10px] w-40 rounded-sm"></div>
                    </span>
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">3주차</p>
                        <div className="bg-main400 h-[10px] w-60 rounded-sm"></div>
                    </span>
                    <span className="flex items-center justify-start">
                        <p className="c2 text-gray1000 w-12">4주차</p>
                        <div className="bg-main200 h-[10px] w-20 rounded-sm"></div>
                    </span>
                </div>
                <hr className="text-gray200 mb-5" />
                <h6 className="text-gray700 mb-[14px]">주간 내 타이머</h6>
                <div className="text-gray1000 mb-5 flex items-baseline gap-[2px]">
                    <span className="text-[32px]">3</span>
                    <span className="text-base">시간</span>
                    <span className="text-[32px]">16</span>
                    <span className="text-base">분</span>
                </div>
            </div>
        </>
    );
}
