"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ShopAvatarComponent from "../content/ShopAvatarComponent";
import "swiper/css";

export default function ShopAvatarList({
    faceData,
    hatData,
    hairData,
    topData,
    ownData,
}: {
    faceData: rewardItems[];
    hatData: rewardItems[];
    hairData: rewardItems[];
    topData: rewardItems[];
    ownData: ownItems[];
}) {
    const ownedItemIds = new Set(ownData?.map((v) => v.item_id));
    const [avatar, setAvatar] = useState({
        FACE: 0,
        HAT: 0,
        HAIR: 0,
        TOP: 0,
    });

    const avatarHandler = (
        part: "FACE" | "HAT" | "HAIR" | "TOP",
        index: number,
    ) => {
        setAvatar((v) => ({ ...v, [part]: index }));
    };

    return (
        <>
            <div className="mx-5 mb-[90px]">
                <div>
                    <h6 className="text-gray1000 mb-[10px]">얼굴</h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(faceData || [])
                            .filter((v) => v.name !== "빈 얼굴")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={v.itemId}
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
                                        selected={avatar.FACE === i}
                                        avatarHandler={() =>
                                            avatarHandler("FACE", i)
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px]">모자</h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(hatData || [])
                            .filter((v) => v.name !== "빈 모자")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={v.itemId}
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
                                        selected={avatar.HAT === i}
                                        avatarHandler={() =>
                                            avatarHandler("HAT", i)
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px]">머리</h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(hairData || [])
                            .filter((v) => v.name !== "빈 머리")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={v.itemId}
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
                                        selected={avatar.HAIR === i}
                                        avatarHandler={() =>
                                            avatarHandler("HAIR", i)
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px]">의상</h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {(topData || [])
                            .filter((v) => v.name !== "빈 상의")
                            .map((v, i) => (
                                <SwiperSlide
                                    key={v.itemId}
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
                                        selected={avatar.TOP === i}
                                        avatarHandler={() =>
                                            avatarHandler("TOP", i)
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
