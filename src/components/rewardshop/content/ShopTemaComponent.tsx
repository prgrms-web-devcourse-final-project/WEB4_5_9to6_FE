"use client";

import { useShopModalStore } from "@/stores/shopModalStore";
import { gradientColors } from "@/utils/appTemaGradientColor";
import { Check, Lock } from "lucide-react";

export default function ShopTemaComponent({
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
    const { openModal, idChange, nameChange, priceChange } =
        useShopModalStore();

    const clickHandler = () => {
        if (!owned) {
            idChange(id);
            nameChange(name + " 테마");
            priceChange(price || 0);
            openModal(
                <div className="relative aspect-[148/204] h-51">
                    <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientColors.find((v) => v.id === id)?.gradient}`}
                    ></div>
                    <p className="c2 absolute right-3 bottom-3 text-white/40">
                        Studium
                    </p>
                </div>,
            );
        }
    };
    return (
        <>
            <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-1">
                    <h6 className="text-gray1000">{name}</h6>
                    {selected && (
                        <span className="bg-gray1000 flex h-4.5 w-4.5 items-center justify-center rounded-full">
                            <Check className="text-white" size={12} />
                        </span>
                    )}
                </div>

                <div
                    onClick={clickHandler}
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

                    {!owned && (
                        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                            <Lock size={18} className="mb-1 text-white" />
                            <p className="h6 text-white">
                                {price.toLocaleString()}P
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
