"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudyRoomComponent({
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
    const [src, setSrc] = useState(`/images/roomImgs/room0.png`);

    useEffect(() => {
        setSrc(`/images/roomImgs/room${index}.png`);
    }, [index]); // 클라이언트에서 동작하게끔 구성
    return (
        <>
            <div>
                <h6 className="text-gray1000 mb-[10px]">{name}</h6>
                <div
                    onClick={onSelect}
                    className="relative aspect-[80/45] cursor-pointer"
                >
                    <Image
                        src={src}
                        alt="스터디룸"
                        fill
                        className="absolute inset-0 rounded-xl"
                    />
                    <div
                        className={`${selected ? "bg-black/50" : "bg-black/0"} temaChoose`}
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
