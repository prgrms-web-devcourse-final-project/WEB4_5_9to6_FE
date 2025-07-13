"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ShopAvatarComponent from "../content/ShopAvatarComponent";
import "swiper/css";

export default function ShopAvatarList() {
    const [avatar, setAvatar] = useState({
        face: 0,
        hat: 0,
        hair: 0,
        clothes: 0,
    });

    const avatarHandler = (
        part: "face" | "hat" | "hair" | "clothes",
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
                        {["평범", "웃음", "무표정", "안경", "초롱"].map(
                            (v, i) => (
                                <SwiperSlide
                                    key={v}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ShopAvatarComponent
                                        name={v}
                                        part="face"
                                        index={i}
                                        selected={avatar.face === i}
                                        avatarHandler={() =>
                                            avatarHandler("face", i)
                                        }
                                    />
                                </SwiperSlide>
                            ),
                        )}
                    </Swiper>
                </div>
                <div>
                    <h6 className="text-gray1000 mb-[10px]">모자</h6>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        className="mb-6"
                    >
                        {[
                            "리본",
                            "끈리본",
                            "학사모",
                            "둥근모",
                            "사각모",
                            "스냅백",
                            "화관",
                            "금계관",
                            "들꽃",
                            "토끼귀",
                        ].map((v, i) => (
                            <SwiperSlide
                                key={v}
                                style={{
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ShopAvatarComponent
                                    name={v}
                                    part="hat"
                                    index={i}
                                    selected={avatar.hat === i}
                                    avatarHandler={() =>
                                        avatarHandler("hat", i)
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
                        {[
                            "반듯한",
                            "단발",
                            "투블럭",
                            "긴머리",
                            "웨이브",
                            "트윈번",
                            "포니테일",
                            "트윈테일",
                            "대머리",
                        ].map((v, i) => (
                            <SwiperSlide
                                key={v}
                                style={{
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ShopAvatarComponent
                                    name={v}
                                    part="hair"
                                    index={i}
                                    selected={avatar.hair === i}
                                    avatarHandler={() =>
                                        avatarHandler("hair", i)
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
                        {["남자", "여자"].map((v, i) => (
                            <SwiperSlide
                                key={v}
                                style={{
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ShopAvatarComponent
                                    name={v}
                                    part="basic"
                                    index={i}
                                    selected={avatar.clothes === i}
                                    avatarHandler={() =>
                                        avatarHandler("clothes", i)
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
