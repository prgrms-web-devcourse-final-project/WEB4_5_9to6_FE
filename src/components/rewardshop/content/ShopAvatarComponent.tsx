"use client";

import { useShopModalStore } from "@/stores/shopModalStore";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarType {
    name: string;
    part: "face" | "hat" | "hair" | "basic";
    index: number;
    selected: boolean;
    avatarHandler: () => void;
}

export default function ShopAvatarComponent({
    name,
    part,
    index,
    selected,
    avatarHandler,
}: AvatarType) {
    const [src, setSrc] = useState(`/images/avatarImgs/face1.png`);

    useEffect(() => {
        setSrc(`/images/avatarImgs/${part}${index + 1}.png`);
    }, [part, index]); // 클라이언트에서 동작하게끔 구성

    const { openModal, nameChange, priceChange } = useShopModalStore();

    const purchasedData = {
        face: [true, true, false, false, false],
        hat: [true, true, false, false, false, true, true, false, false, false],
        hair: [true, true, false, false, false, true, true, false, false],
        basic: [true, false],
    };
    const priceData = {
        face: [500, 500, 800, 800, 1000],
        hat: [500, 500, 800, 800, 1000, 1000, 1000, 1000, 2000, 2000],
        hair: [500, 500, 800, 800, 1000, 1000, 1000, 1000, 2000],
        basic: [100, 200],
    };

    const clickHandler = () => {
        const isPurchased = purchasedData[part][index];
        if (isPurchased) {
            avatarHandler();
        } else {
            nameChange(name);
            priceChange(priceData[part][index]);
            openModal(
                <div className="bg-gray200 relative h-18 w-18 shrink-0 cursor-pointer rounded-xl">
                    <Image
                        src={src}
                        alt={part}
                        fill
                        sizes="72px"
                        className="absolute inset-0 rounded-xl"
                    />
                    <div className="temaChoose"></div>
                </div>,
            );
        }
    };

    return (
        <>
            <div
                onClick={clickHandler}
                className="bg-gray200 group relative h-18 w-18 shrink-0 cursor-pointer rounded-xl"
            >
                <Image
                    src={src}
                    alt={part}
                    fill
                    sizes="72px"
                    className="absolute inset-0 rounded-xl"
                />
                <div
                    className={`${purchasedData[part][index] ? "bg-black/0" : "bg-black/80"} temaChoose`}
                ></div>

                <div className="absolute top-1 right-1 flex-col items-center">
                    {selected && (
                        <span className="bg-gray1000 flex h-4.5 w-4.5 items-center justify-center rounded-full">
                            <Check className="text-white" size={12} />
                        </span>
                    )}
                </div>

                {!purchasedData[part][index] && (
                    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                        <Lock size={18} className="mb-1 text-white" />
                        <p className="text-xs text-white">
                            {priceData[part][index]}P
                        </p>
                    </div>
                )}
                <p className="absolute bottom-1 left-1 h-fit w-fit rounded-sm bg-white p-1 text-xs text-black opacity-0 group-hover:opacity-100">
                    {name}
                </p>
            </div>
        </>
    );
}
