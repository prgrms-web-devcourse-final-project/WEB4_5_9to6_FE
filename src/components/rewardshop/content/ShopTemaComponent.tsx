"use client";

import { useShopModalStore } from "@/stores/shopModalStore";
import { Check, Lock } from "lucide-react";

export default function ShopTemaComponent({
    name,
    selected,
    onSelect,
}: {
    name: string;
    selected: boolean;
    onSelect: () => void;
}) {
    const gradientColors = [
        {
            name: "기본",
            gradient: "from-black via-[#741E2D] to-[#FF395C]",
            purchased: true,
            price: 0,
        },
        {
            name: "그린 & 블랙",
            gradient: "from-black via-[#0F6153] to-[#00C5A4]",
            purchased: true,
            price: 500,
        },
        {
            name: "블루 & 블랙",
            gradient: "from-black via-[#1B1F8F] to-[#484EFD]",
            purchased: false,
            price: 500,
        },
        {
            name: "오렌지 & 블랙",
            gradient: "from-black via-[#A64C10] to-[#FE6F0F]",
            purchased: false,
            price: 500,
        },
        {
            name: "핑크",
            gradient: "from-[#FF899E] via-[#FF395C] to-[#DC2344]",
            purchased: false,
            price: 2000,
        },
        {
            name: "그린",
            gradient: "from-[#2FDBBE] via-[#00C5A4] to-[#28A18D]",
            purchased: false,
            price: 2000,
        },
    ];

    const { openModal, nameChange, priceChange } = useShopModalStore();

    const clickHandler = () => {
        const isPurchased = gradientColors.find(
            (v) => v.name === name,
        )?.purchased;
        if (isPurchased) {
            onSelect();
        } else {
            nameChange(name + " 테마");
            priceChange(
                gradientColors.find((v) => v.name === name)?.price || 0,
            );
            openModal(
                <div className="relative aspect-[148/204] h-51">
                    <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientColors.find((v) => v.name === name)?.gradient}`}
                    ></div>
                    <p className="c2 absolute right-3 bottom-3 text-white/40">
                        Studium
                    </p>
                    <div className="temaChoose"></div>
                </div>,
            );
        }
    };
    return (
        <>
            <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-1">
                    <h6 className="text-gray1000">{name}</h6>
                    {selected && (
                        <span className="bg-gray1000 flex h-4.5 w-4.5 items-center justify-center rounded-full">
                            <Check className="text-white" size={12} />
                        </span>
                    )}
                </div>

                <div
                    onClick={clickHandler}
                    className="relative aspect-[31/57] cursor-pointer"
                >
                    <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientColors.find((v) => v.name === name)?.gradient}`}
                    ></div>
                    <p className="c2 absolute right-3 bottom-3 text-white/40">
                        Studium
                    </p>
                    <div
                        className={`${selected ? "bg-black/50" : "bg-black/0"} temaChoose`}
                    ></div>

                    {!gradientColors.find((v) => v.name === name)
                        ?.purchased && (
                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                            <Lock size={18} className="mb-1 text-white" />
                            <p className="h6 text-white">
                                {gradientColors
                                    .find((v) => v.name === name)
                                    ?.price.toLocaleString()}
                                P
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
