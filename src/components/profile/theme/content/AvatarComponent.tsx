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

    useEffect(() => {
        setSrc(`/images/rewardItems/${id}.png`);
    }, [id]);

    return (
        <>
            <div
                onClick={() => {
                    onSelect();
                    changeOwnId(ownId);
                    changeAvatarName(part, name);
                    changeAvatarState(true);
                    changeAvatarOwnId(part, ownId);
                }}
                className="bg-gray200 relative h-18 w-18 shrink-0 cursor-pointer rounded-xl"
            >
                <Image
                    src={src}
                    alt={part}
                    fill
                    sizes="72px"
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
