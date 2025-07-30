"use client";

import { useShopModalStore } from "@/stores/shopModalStore";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShopRoomComponent({
    id,
    name,
    price,
    owned,
    selected,
}: {
    id: number;
    name: string;
    price: number;
    owned: boolean;
    selected: boolean;
}) {
    const [src, setSrc] = useState(`/images/rewardItems/11.png`);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setSrc(`/images/rewardItems/${id}.png`);
        setIsImageLoading(true);
    }, [id]);

    const { openModal, idChange, nameChange, priceChange } =
        useShopModalStore();

    const clickHandler = () => {
        if (!owned) {
            idChange(id);
            nameChange(name);
            priceChange(price);
            openModal(
                <div className="relative aspect-[80/45] h-40">
                    <Image
                        src={src}
                        alt="스터디룸"
                        fill
                        className="absolute inset-0 rounded-xl"
                    />
                </div>,
            );
        }
    };

    return (
        <>
            <div>
                <div className="mb-1 flex items-center gap-1">
                    <h6 className="text-gray1000 dark:text-white">{name}</h6>
                    {selected && (
                        <span className="bg-gray1000 flex h-4.5 w-4.5 items-center justify-center rounded-full dark:bg-white">
                            <Check
                                className="dark:text-gray1000 text-white"
                                size={12}
                            />
                        </span>
                    )}
                </div>
                <div
                    onClick={clickHandler}
                    className="relative aspect-[80/45] cursor-pointer"
                    style={{ minHeight: "120px" }}
                >
                    {isImageLoading && (
                        <div className="bg-gray300 dark:bg-gray800 absolute inset-0 z-10 flex animate-pulse items-center justify-center rounded-xl">
                            <div className="border-t-main500 border-gray500 h-6 w-6 animate-spin rounded-full border-2" />
                        </div>
                    )}

                    <Image
                        src={src}
                        alt="스터디룸"
                        fill
                        sizes="100%"
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => {
                            setSrc("/images/rewardItems/11.png");
                            setIsImageLoading(false);
                        }}
                        className="absolute inset-0 rounded-xl object-cover"
                    />
                    <div
                        className={`${owned ? "bg-black/0" : "bg-black/50"} temaChoose`}
                    ></div>
                    {!owned && (
                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                            <Lock size={18} className="mb-1 text-white" />
                            <p className="h6 text-white">{price}P</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
