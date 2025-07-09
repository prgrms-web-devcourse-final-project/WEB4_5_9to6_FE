"use client";
import { X } from "lucide-react";
import { useState } from "react";

export default function FilterModal({
    onClose,
    onApply,
}: {
    onClose: () => void;
    onApply: (filters: string[]) => void;
}) {
    const regions = [
        "온라인",
        "서울",
        "경기",
        "인천",
        "강원",
        "대구",
        "대전",
        "제주",
        "울산",
        "부산",
        "광주",
        "세종",
        "충남",
        "충북",
        "전남",
        "전북",
        "경남",
        "경북",
    ];
    const active = ["활동 전체", "활동 전", "활동중"];
    const [regionSelect, setRegionSelect] = useState("");
    const [activeSelect, setActiveSelect] = useState("");

    const regionHandler = (region: string) => {
        setRegionSelect(region);
    };
    const activeHandler = (active: string) => {
        setActiveSelect(active);
    };
    return (
        <>
            <div className="fixed bottom-0 left-[10px] z-50 h-[420px] w-[340px] rounded-[24px] bg-[var(--color-white)]">
                <div className="mt-[22px] flex w-full items-center justify-between px-5">
                    <p className="text-[18px] font-semibold text-[var(--color-gray1000)]">
                        필터항목
                    </p>
                    <button onClick={onClose}>
                        <X className="h-6 w-6 cursor-pointer text-[#161616]" />
                    </button>
                </div>

                <div className="mt-[18px] ml-[29px]">
                    {/* 지역 */}
                    <p className="text-[12px] font-semibold text-[#000000]">
                        지역
                    </p>
                    <div className="mt-[10px] flex h-[82px] w-[283px] flex-wrap items-center gap-[5px]">
                        {regions.map((region) => (
                            <div
                                onClick={() => regionHandler(region)}
                                className={`flex h-6 w-auto cursor-pointer items-center rounded-3xl px-[10px] text-[12px] whitespace-nowrap ${region === regionSelect ? "bg-[#454545] text-[12px] text-[#FFFFFF]" : "bg-[#EFEFEF] text-[#000000]"}`}
                                key={region}
                            >
                                {region}
                            </div>
                        ))}
                    </div>

                    {/* 활동상태 */}
                    <p className="mt-8 text-[12px] font-semibold text-[#000000]">
                        활동상태
                    </p>
                    <div className="mt-[10px] flex items-center gap-[5px]">
                        {active.map((a) => (
                            <div
                                onClick={() => activeHandler(a)}
                                className={`flex h-6 w-auto cursor-pointer items-center rounded-3xl px-[10px] text-[12px] ${a === activeSelect ? "bg-[#454545] text-[12px] text-[#FFFFFF]" : "bg-[#EFEFEF] text-[#000000]"}`}
                                key={a}
                            >
                                {a}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => onApply([regionSelect, activeSelect])}
                    className="hover-[#D31D3E] absolute bottom-5 left-1/2 h-[50px] w-[300px] -translate-x-1/2 items-center justify-center rounded-[12px] bg-[#E02D4D]"
                >
                    <h5 className="cursor-pointer text-[var(--color-white)]">
                        적용하기
                    </h5>
                </button>
            </div>
        </>
    );
}
