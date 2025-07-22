"use client";

import { useShopModalStore } from "@/stores/shopModalStore";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShopRoomComponent({
    name,
    index,
    selected,
    onSelect,
}: {
    name: string;
    index: number;
    selected: boolean;
    onSelect: () => void;
}) {
    const [src, setSrc] = useState(`/images/roomImgs/room1.png`);

    useEffect(() => {
        setSrc(`/images/roomImgs/room${index}.png`);
    }, [index]); // 클라이언트에서 동작하게끔 구성

    const { openModal, nameChange, priceChange } = useShopModalStore();

    const purchasedData = [
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
    ];
    const priceData = [0, 500, 500, 500, 800, 800, 1000, 1000, 2000];

    const clickHandler = () => {
        const isPurchased = purchasedData[index];
        if (isPurchased) {
            onSelect();
        } else {
            nameChange(name);
            priceChange(priceData[index]);
            openModal(
                <div className="relative aspect-[80/45] h-40">
                    <Image
                        src={src}
                        alt="스터디룸"
                        fill
                        className="absolute inset-0 rounded-xl"
                    />
                    <div className="temaChoose"></div>
                </div>,
            );
        }
    };

    return (
        <>
            <div>
                <div className="mb-1 flex items-center gap-1">
                    <h6 className="text-gray1000">{name}</h6>
                    {selected && (
                        <span className="bg-gray1000 flex h-4.5 w-4.5 items-center justify-center rounded-full">
                            <Check className="text-white" size={12} />
                        </span>
                    )}
                </div>
                <div
                    onClick={clickHandler}
                    className="relative aspect-[80/45] cursor-pointer"
                >
                    <Image
                        src={src}
                        alt="스터디룸"
                        fill
                        className="absolute inset-0 rounded-xl"
                    />
                    <div
                        className={`${purchasedData[index] ? "bg-black/0" : "bg-black/50"} temaChoose`}
                    ></div>
                    {!purchasedData[index] && (
                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                            <Lock size={18} className="mb-1 text-white" />
                            <p className="h6 text-white">{priceData[index]}P</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
