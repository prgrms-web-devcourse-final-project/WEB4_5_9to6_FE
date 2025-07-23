"use client";

import { useEffect, useState } from "react";
import AvatarComponent from "../content/AvatarComponent";
import Image from "next/image";
import avatarImg from "../../../../assets/images/avatar.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MyAvatarList({
    faceData,
    hatData,
    hairData,
    topData,
}: {
    faceData: OwnItems[];
    hatData: OwnItems[];
    hairData: OwnItems[];
    topData: OwnItems[];
}) {
    const [isFace, setFace] = useState(21);
    const [isHat, setHat] = useState(31);
    const [isHair, setHair] = useState(52);
    const [isTop, setTop] = useState(61);

    const selectHandler = (type: string, id: number) => {
        if (type === "FACE") {
            setFace(id);
        } else if (type === "HAT") {
            setHat(id);
        } else if (type === "HAIR") {
            setHair(id);
        } else if (type === "TOP") {
            setTop(id);
        } else {
            return;
        }
    };

    useEffect(() => {
        const selectedFace = faceData?.find((v) => v.used)?.itemId;
        setFace(selectedFace || 21);
        const selectedHat = hatData?.find((v) => v.used)?.itemId;
        setHat(selectedHat || 31);
        const selectedHair = hairData?.find((v) => v.used)?.itemId;
        setHair(selectedHair || 52);
        const selectedTop = topData?.find((v) => v.used)?.itemId;
        setTop(selectedTop || 61);
    }, [faceData, hatData, hairData, topData]);

    return (
        <>
            <div className="mb-[90px]">
                <div className="mt-[-24px] mb-6 flex h-[150px] flex-col items-center justify-center bg-gradient-to-b from-[#EBEBEB] to-[#EFEFEF]">
                    <Image
                        src={avatarImg}
                        alt="내 아바타"
                        className="h-18 w-18"
                    />
                    <p className="b2 text-gray700 mt-[10px]">내 아바타</p>
                </div>
                <div className="mx-5">
                    <div>
                        <h6 className="text-gray1000 mb-[10px]">얼굴</h6>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={"auto"}
                            className="mb-6"
                        >
                            {(faceData || []).map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AvatarComponent
                                        id={v.itemId}
                                        ownId={v.ownItemId}
                                        name={v.name}
                                        part="FACE"
                                        selected={isFace === v.itemId}
                                        onSelect={() =>
                                            selectHandler("FACE", v.itemId)
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
                            {(hatData || []).map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AvatarComponent
                                        id={v.itemId}
                                        ownId={v.ownItemId}
                                        name={v.name}
                                        part="HAT"
                                        selected={isHat === v.itemId}
                                        onSelect={() =>
                                            selectHandler("HAT", v.itemId)
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
                            {(hairData || []).map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AvatarComponent
                                        id={v.itemId}
                                        ownId={v.ownItemId}
                                        name={v.name}
                                        part="HAIR"
                                        selected={isHair === v.itemId}
                                        onSelect={() =>
                                            selectHandler("HAIR", v.itemId)
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
                            {(topData || []).map((v, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        width: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AvatarComponent
                                        id={v.itemId}
                                        ownId={v.ownItemId}
                                        name={v.name}
                                        part="TOP"
                                        selected={isTop === v.itemId}
                                        onSelect={() =>
                                            selectHandler("TOP", v.itemId)
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
}
