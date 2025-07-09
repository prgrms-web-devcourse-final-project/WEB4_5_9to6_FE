"use client";

import { CircleCheck } from "lucide-react";

export default function AppTemaComponent({
    name,
    selected,
    onSelect,
}: {
    name: string;
    selected: boolean;
    onSelect: () => void;
}) {
    const gradientColors = [
        { name: "기본", gradient: "from-black via-[#741E2D] to-[#FF395C]" },
        {
            name: "그린 & 블랙",
            gradient: "from-black via-[#0F6153] to-[#00C5A4]",
        },
        {
            name: "블루 & 블랙",
            gradient: "from-black via-[#1B1F8F] to-[#484EFD]",
        },
        {
            name: "오렌지 & 블랙",
            gradient: "from-black via-[#A64C10] to-[#FE6F0F]",
        },
    ];
    return (
        <>
            <div className="flex flex-col gap-[10px]">
                <p>{name}</p>
                <div
                    onClick={onSelect}
                    className="relative h-51 w-37 cursor-pointer"
                >
                    <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientColors.find((v) => v.name === name)?.gradient}`}
                    ></div>
                    <p className="c2 absolute right-3 bottom-3 text-white/40">
                        Studium
                    </p>
                    <div
                        className={`${selected ? "bg-black/50" : "bg-black/0"} absolute inset-0 rounded-xl transition-colors duration-250 ease-in-out hover:bg-black/30`}
                    ></div>

                    {selected && (
                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                            <CircleCheck
                                size={18}
                                className="mb-1 text-white"
                            />
                            <h6 className="text-white">선택됨</h6>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
