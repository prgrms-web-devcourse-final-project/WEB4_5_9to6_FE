"use client";
import { useState } from "react";
import Button from "../common/Button";
import BottomModal from "../common/BottomModal";

export default function FilterModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
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
            <BottomModal
                title="필터 항목"
                onClose={onClose}
                height="420"
                isOpen={isOpen}
            >
                <div className="mt-[18px] ml-[29px]">
                    {/* 지역 */}
                    <p className="text-[12px] font-semibold text-[#000000]">
                        지역
                    </p>
                    <div className="mt-[10px] flex h-[82px] w-[283px] flex-wrap items-center gap-[5px]">
                        {regions.map((region) => (
                            <div
                                onClick={() => regionHandler(region)}
                                className={`flex h-6 w-auto cursor-pointer items-center rounded-3xl px-[10px] text-[12px] whitespace-nowrap transition-all duration-200 ease-in-out ${region === regionSelect ? "bg-[#454545] text-[12px] text-[#FFFFFF]" : "bg-[#EFEFEF] text-[#000000]"}`}
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

                <Button
                    onClick={() => onApply([regionSelect, activeSelect])}
                    color="primary"
                    className="absolute right-5 bottom-5 left-5 w-auto items-center justify-center"
                >
                    적용하기
                </Button>
            </BottomModal>
        </>
    );
}
