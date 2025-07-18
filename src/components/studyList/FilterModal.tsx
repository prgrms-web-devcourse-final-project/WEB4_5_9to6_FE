"use client";
import { useState } from "react";
import Button from "../common/Button";
import BottomModal from "../common/BottomModal";
import { useAnimationStore } from "@/stores/modalAnimationStore";
const regions2: Record<string, string> = {
    온라인: "ONLINE",
    전체: "ALL",
    서울: "SEOUL",
    경기: "GYEONGGI",
    강원: "GANGWON",
    인천: "INCHEON",
    부산: "BUSAN",
    울산: "ULSAN",
    대구: "DAEGU",
    대전: "DAEJEON",
    광주: "GWANGJU",
    세종: "SEJONG",
    충남: "CHUNGNAM",
    충북: "CHUNGBUK",
    전남: "JEONNAM",
    전북: "JEONBUK",
    경남: "GYEONGNAM",
    경북: "GYEONGBUK",
    제주: "JEJU",
};
interface Filtering {
    region: string;
    status: string;
    regionSelect: boolean;
    statusSelect: boolean;
}
export default function FilterModal({
    isOpen,
    onClose,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: Filtering) => void;
}) {
    const regions = [
        "온라인",
        "전체",
        "서울",
        "경기",
        "강원",
        "인천",
        "부산",
        "울산",
        "대구",
        "대전",
        "광주",
        "세종",
        "충남",
        "충북",
        "전남",
        "전북",
        "경남",
        "경북",
        "제주",
    ];
    const active = ["활동 전체", "활동 전", "활동중"];
    const [regionSelected, setRegionSelected] = useState("");
    const [activeSelected, setActiveSelected] = useState("");
    const { changeClass } = useAnimationStore();

    const regionHandler = (region: string) => {
        setRegionSelected(region);
    };
    const activeHandler = (active: string) => {
        setActiveSelected(active);
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
                            <button
                                onClick={() => regionHandler(regions2[region])}
                                className={`flex h-6 w-auto cursor-pointer items-center rounded-3xl px-[10px] text-[12px] whitespace-nowrap transition-all duration-200 ease-in-out ${regions2[region] === regionSelected ? "bg-[#454545] text-[12px] text-[#FFFFFF]" : "bg-[#EFEFEF] text-[#000000]"}`}
                                key={region}
                            >
                                {region}
                            </button>
                        ))}
                    </div>

                    {/* 활동상태 */}
                    <p className="mt-8 text-[12px] font-semibold text-[#000000]">
                        활동상태
                    </p>
                    <div className="mt-[10px] flex items-center gap-[5px]">
                        {active.map((a) => (
                            <button
                                onClick={() => activeHandler(a)}
                                className={`flex h-6 w-auto cursor-pointer items-center rounded-3xl px-[10px] text-[12px] ${a === activeSelected ? "bg-[#454545] text-[12px] text-[#FFFFFF]" : "bg-[#EFEFEF] text-[#000000]"}`}
                                key={a}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={() => {
                        onApply({
                            region: regionSelected,
                            status: activeSelected,
                            regionSelect: !!regionSelected,
                            statusSelect: !!activeSelected,
                        });
                        changeClass("animate-modalFadeOut");
                        setTimeout(() => {
                            onClose();
                        }, 200);
                    }}
                    color="primary"
                    className="absolute right-5 bottom-5 left-5 w-auto items-center justify-center"
                >
                    적용하기
                </Button>
            </BottomModal>
        </>
    );
}
