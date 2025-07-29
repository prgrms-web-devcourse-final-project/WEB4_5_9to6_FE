"use client";

import { useOwnItemStore } from "@/stores/ownItemStore";
import { gradientColors } from "@/utils/appTemaGradientColor";
import { CircleCheck } from "lucide-react";

export default function AppTemaComponent({
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
    return (
        <>
            <div className="flex flex-col gap-[10px]">
                <h6 className="text-gray1000 dark:text-white">{name}</h6>
                <div
                    onClick={() => {
                        onSelect();
                        changeOwnId(ownId);
                        changeItemId(id);
                        changeAvatarState(false);
                        changeOwnName(name + " 테마");
                    }}
                    className="relative aspect-[31/57] cursor-pointer"
                >
                    <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientColors.find((v) => v.id === id)?.gradient}`}
                    ></div>
                    <p className="c2 absolute right-3 bottom-3 text-white/40">
                        Studium
                    </p>
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
