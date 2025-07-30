"use client";

import { purchaseRewardItems } from "@/api/item";
import Button from "@/components/common/Button";
import { useProfileStore } from "@/stores/memberStore";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import { useOwnItemStore } from "@/stores/ownItemStore";
import { useShopModalStore } from "@/stores/shopModalStore";
import { customAlert } from "@/utils/customAlert";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShopPurchaseModal({ id }: { id: string }) {
    const {
        isOpen,
        closeModal,
        goodsId,
        goodsName,
        goodsPrice,
        goodsType,
        content,
    } = useShopModalStore();
    const [type, setType] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const { animationClass, changeClass } = useAnimationStore();
    const { data, fetch } = useProfileStore();
    const router = useRouter();
    const { fetchItemsOwn } = useOwnItemStore();

    const mutation = useMutation({
        mutationFn: async ({ itemId }: { itemId: number }) =>
            await purchaseRewardItems(itemId),
        onSuccess: async (response) => {
            await fetchItemsOwn();
            await fetch(Number(id));
            console.log(response);
        },
        onError(err) {
            console.log(err);
        },
    });

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            changeClass("animate-modalFadeIn");
        } else {
            changeClass("animate-modalFadeOut");
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 200);
            return () => clearTimeout(timer);
        }
        if (goodsType === "앱 테마") {
            setType("테마");
        } else if (goodsType === "스터디룸") {
            setType("스터디룸");
        } else {
            setType("아바타");
        }
    }, [isOpen, goodsType, changeClass]);

    if (!isVisible) return null;

    const clickHandler = () => {
        mutation.mutate({ itemId: goodsId });
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            closeModal();
        }, 200);
        customAlert({
            message: `${goodsName}(을)를 구매했어요!\n테마변경 페이지에서 바로 적용해보세요.`,
            linkLabel: "이동하기",
            onClick: () => router.push(`/profile/${id}/theme`),
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
                <div
                    className={`${animationClass} mx-[10px] mb-5 flex w-full flex-col rounded-xl bg-white dark:bg-[#222222]`}
                >
                    <div className="mx-5 flex h-16 items-center justify-between">
                        <h3 className="text-gray1000 dark:text-white">
                            {type} 구매
                        </h3>
                        <X
                            size={24}
                            onClick={() => {
                                changeClass("animate-modalFadeOut");
                                setTimeout(() => {
                                    closeModal();
                                }, 200);
                            }}
                            className="text-gray1000 cursor-pointer dark:text-white"
                        />
                    </div>
                    <div className="mx-5 mb-[30px] flex items-center justify-center bg-white px-20 dark:bg-[#222222]">
                        {content}
                    </div>
                    <div className="bg-gray100 dark:bg-gray1000 mx-5 mb-[10px] rounded-xl p-4">
                        <div className="mb-1.5 flex items-center justify-between">
                            <p className="b2 text-gray1000 dark:text-white">
                                내 리워드
                            </p>
                            <h6 className="text-gray1000 dark:text-white">
                                {data?.rewardPoints.toLocaleString() || 0}P
                            </h6>
                        </div>
                        <div className="mb-3.5 flex items-center justify-between">
                            <p className="b2 text-gray1000 dark:text-white">
                                {goodsName}
                            </p>
                            <h6 className="text-main500 dark:text-main400">
                                - {goodsPrice.toLocaleString()}P
                            </h6>
                        </div>
                        <hr className="text-gray200 dark:text-gray800 mb-3.5" />
                        <div className="flex items-center justify-between">
                            <p className="b2 text-gray1000 dark:text-white">
                                구매 후 리워드
                            </p>
                            <h6
                                className={`${(data?.rewardPoints || 0) - goodsPrice >= 0 ? "text-gray1000 dark:text-white" : "font-bold text-red-600"}`}
                            >
                                {`${((data?.rewardPoints || 0) - goodsPrice).toLocaleString()}P`}
                            </h6>
                        </div>
                    </div>
                    <div className="z-10 rounded-xl bg-white p-5 dark:bg-[#222222]">
                        {(data?.rewardPoints || 0) - goodsPrice >= 0 ? (
                            <Button onClick={clickHandler}>구매하기</Button>
                        ) : (
                            <Button disabled>구매불가</Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
