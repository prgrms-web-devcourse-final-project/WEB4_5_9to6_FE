"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarType {
    name: string;
    part: string;
    index: number;
    selected: boolean;
    avatarHandler: () => void;
}

export default function AvatarComponent({
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
    return (
        <>
            <div
                onClick={avatarHandler}
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
