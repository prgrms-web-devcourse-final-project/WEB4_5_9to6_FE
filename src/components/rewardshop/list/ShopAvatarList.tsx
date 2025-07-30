"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import ShopAvatarComponent from "../content/ShopAvatarComponent";
import "swiper/css";
import { useMemo } from "react";

export default function ShopAvatarList({
    faceData,
    hatData,
    hairData,
    topData,
    ownData,
}: {
    faceData: RewardItems[];
    hatData: RewardItems[];
    hairData: RewardItems[];
    topData: RewardItems[];
    ownData: OwnItems[];
}) {
    const selectedItemMap = useMemo(() => {
        const map: Record<string, number> = {
            FACE: 0,
            HAT: 0,
            HAIR: 0,
            TOP: 0,
        };
        ownData?.forEach((v) => {
            if (v.used) {
                map[v.type] = v.itemId;
            }
        });
        return map;
    }, [ownData]);
    const ownedItemIds = new Set(ownData?.map((v) => v.itemId));

    return (
        <>
            <div className="mx-5 mb-[90px]">
                <div>
                    <h6 className="text-gray1000 mb-[10px] dark:text-white">
                        얼굴
                    </h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(faceData || [])
                            .filter((v) => v.name !== "빈 얼굴")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ShopAvatarComponent
                                        id={v.itemId}
                                        name={v.name}
                                        price={v.price}
                                        part="FACE"
                                        owned={ownedItemIds.has(v.itemId)}
                                        selected={
                                            v.itemId === selectedItemMap["FACE"]
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px] dark:text-white">
                        모자
                    </h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(hatData || [])
                            .filter(
                                (v) =>
                                    v.name !== "빈 모자" &&
                                    ![48, 49, 50].includes(v.itemId),
                            )
                            .map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ShopAvatarComponent
                                        id={v.itemId}
                                        name={v.name}
                                        price={v.price}
                                        part="HAT"
                                        owned={ownedItemIds.has(v.itemId)}
                                        selected={
                                            v.itemId === selectedItemMap["HAT"]
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px] dark:text-white">
                        머리
                    </h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(hairData || [])
                            .filter((v) => v.name !== "빈 머리")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ShopAvatarComponent
                                        id={v.itemId}
                                        name={v.name}
                                        price={v.price}
                                        part="HAIR"
                                        owned={ownedItemIds.has(v.itemId)}
                                        selected={
                                            v.itemId === selectedItemMap["HAIR"]
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px] dark:text-white">
                        의상
                    </h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(topData || [])
                            .filter((v) => v.name !== "빈 상의")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ShopAvatarComponent
                                        id={v.itemId}
                                        name={v.name}
                                        price={v.price}
                                        part="TOP"
                                        owned={ownedItemIds.has(v.itemId)}
                                        selected={
                                            v.itemId === selectedItemMap["TOP"]
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
