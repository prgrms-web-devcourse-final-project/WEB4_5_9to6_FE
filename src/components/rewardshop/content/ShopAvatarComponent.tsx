"use client";

import { useShopModalStore } from "@/stores/shopModalStore";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarType {
    id: number;
    name: string;
    price: number;
    owned: boolean;
    part: "FACE" | "HAT" | "HAIR" | "TOP";
    selected: boolean;
}

export default function ShopAvatarComponent({
    id,
    name,
    price,
    owned,
    part,
    selected,
}: AvatarType) {
    const [src, setSrc] = useState(`/images/rewardItems/21.png`);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setSrc(`/images/rewardItems/${id}.png`);
        setIsImageLoading(true);
    }, [part, id]);

    const { openModal, idChange, nameChange, priceChange } =
        useShopModalStore();

    const clickHandler = () => {
        if (!owned) {
            idChange(id);
            nameChange(name);
            priceChange(price);
            openModal(
                <div className="bg-gray200 dark:bg-gray1000 relative h-18 w-18 shrink-0 cursor-pointer rounded-xl">
                    <Image
                        src={src}
                        alt={part}
                        fill
                        sizes="72px"
                        className="absolute inset-0 rounded-xl"
                    />
                </div>,
            );
        }
    };

    return (
        <>
            <div
                onClick={clickHandler}
                className="bg-gray200 dark:bg-gray1000 group relative h-18 w-18 shrink-0 cursor-pointer rounded-xl"
            >
                {isImageLoading && (
                    <div className="bg-gray300 dark:bg-gray800 absolute inset-0 z-10 flex animate-pulse items-center justify-center rounded-xl">
                        <div className="border-t-main500 border-gray500 h-6 w-6 animate-spin rounded-full border-2" />
                    </div>
                )}
                <Image
                    src={src}
                    alt={part}
                    fill
                    sizes="72px"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => {
                        setSrc("/images/rewardItems/21.png");
                        setIsImageLoading(false);
                    }}
                    className="absolute inset-0 rounded-xl"
                />
                <div
                    className={`${owned ? "bg-black/0" : "bg-black/80"} temaChoose`}
                ></div>

                <div className="absolute top-1 right-1 flex-col items-center">
                    {selected && (
                        <span className="bg-gray1000 flex h-4.5 w-4.5 items-center justify-center rounded-full dark:bg-white">
                            <Check
                                className="dark:text-gray1000 text-white"
                                size={12}
                            />
                        </span>
                    )}
                </div>

                {!owned && (
                    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                        <Lock size={18} className="mb-1 text-white" />
                        <p className="text-xs text-white">{price}P</p>
                    </div>
                )}
                <p className="absolute bottom-1 left-1 h-fit w-fit rounded-sm bg-white p-1 text-xs text-black opacity-0 group-hover:opacity-100">
                    {name}
                </p>
            </div>
        </>
    );
}
