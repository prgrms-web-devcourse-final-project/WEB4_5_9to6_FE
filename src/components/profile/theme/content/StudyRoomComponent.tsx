"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useOwnItemStore } from "@/stores/ownItemStore";

export default function StudyRoomComponent({
    id,
    ownId,
    name,
    selected,
    onSelect,
}: {
    id: number;
    ownId: number;
    name: string;
    selected: boolean;
    onSelect: () => void;
}) {
    const { changeOwnId, changeOwnName, changeItemId, changeAvatarState } =
        useOwnItemStore();
    const [src, setSrc] = useState(`/images/rewardItems/11.png`);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setSrc(`/images/rewardItems/${id}.png`);
        setIsImageLoading(true);
    }, [id]);

    return (
        <>
            <div>
                <h6 className="text-gray1000 mb-[10px]">{name}</h6>
                <div
                    onClick={() => {
                        onSelect();
                        changeOwnId(ownId);
                        changeItemId(id);
                        changeAvatarState(false);
                        changeOwnName(name + " 배경");
                    }}
                    className="relative aspect-[80/45] cursor-pointer"
                >
                    {isImageLoading && (
                        <div className="bg-gray300 absolute inset-0 z-10 flex animate-pulse items-center justify-center rounded-xl">
                            <div className="border-t-main500 border-gray500 h-6 w-6 animate-spin rounded-full border-2" />
                        </div>
                    )}
                    <Image
                        src={src}
                        alt="스터디룸"
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => {
                            setSrc("/images/rewardItems/11.png");
                            setIsImageLoading(false);
                        }}
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
