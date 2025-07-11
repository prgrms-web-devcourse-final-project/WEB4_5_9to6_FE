"use client";

import Button from "@/components/common/Button";
import { useShopModalStore } from "@/stores/shopModalStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShopPurchaseModal() {
    const { isOpen, closeModal, goodsName, goodsPrice, goodsType, content } =
        useShopModalStore();
    const [type, setType] = useState("");

    useEffect(() => {
        if (goodsType === "app") {
            setType("테마");
        } else if (goodsType === "room") {
            setType("스터디룸");
        } else {
            setType("아바타");
        }
    }, [goodsType]);

    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
                <div className="mx-[10px] mb-5 flex w-full flex-col rounded-3xl bg-white">
                    <div className="mx-5 flex h-16 items-center justify-between">
                        <h3 className="text-gray1000">{type} 구매</h3>
                        <X
                            size={24}
                            onClick={closeModal}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="mx-5 mb-[30px] flex items-center justify-center bg-white px-20">
                        {content}
                    </div>
                    <div className="bg-gray100 mx-5 mb-[10px] rounded-xl p-4">
                        <div className="mb-1.5 flex items-center justify-between">
                            <p className="b2 text-gray1000">내 리워드</p>
                            <h6 className="text-gray1000">5,600P</h6>
                        </div>
                        <div className="mb-3.5 flex items-center justify-between">
                            <p className="b2 text-gray1000">{goodsName}</p>
                            <h6 className="text-main500">
                                - {goodsPrice.toLocaleString()}P
                            </h6>
                        </div>
                        <hr className="text-gray200 mb-3.5" />
                        <div className="flex items-center justify-between">
                            <p className="b2 text-gray1000">구매 후 리워드</p>
                            <h6 className="text-gray1000">
                                {(5600 - goodsPrice).toLocaleString()}P
                            </h6>
                        </div>
                    </div>
                    <div className="z-10 rounded-xl bg-white p-5">
                        <Button onClick={closeModal}>구매하기</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
