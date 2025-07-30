"use client";

import { useOwnItemStore } from "@/stores/ownItemStore";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarType {
    id: number;
    ownId: number;
    name: string;
    part: "FACE" | "HAT" | "HAIR" | "TOP";
    selected: boolean;
    onSelect: () => void;
}

export default function AvatarComponent({
    id,
    ownId,
    name,
    part,
    selected,
    onSelect,
}: AvatarType) {
    const {
        changeOwnId,
        changeAvatarState,
        changeAvatarOwnId,
        changeAvatarName,
    } = useOwnItemStore();
    const [src, setSrc] = useState(`/images/rewardItems/21.png`);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setSrc(`/images/rewardItems/${id}.png`);
        setIsImageLoading(true);
    }, [id]);

    return (
        <>
            <div
                onClick={() => {
                    onSelect();
                    changeAvatarState(true);
                    changeOwnId(ownId);
                    changeAvatarName(part, name);
                    changeAvatarOwnId(part, ownId);
                }}
                className="bg-gray200 dark:bg-gray1000 relative h-18 w-18 shrink-0 cursor-pointer rounded-xl"
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
                    className={`${selected ? "bg-black/70" : "bg-black/0"} temaChoose`}
                ></div>
                {selected && (
                    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                        <CircleCheck size={18} className="mb-1 text-white" />
                        <p className="text-xs text-white">{name}</p>
                    </div>
                )}
            </div>
        </>
    );
}
