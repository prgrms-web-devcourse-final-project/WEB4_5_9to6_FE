"use client";

import { useEffect } from "react";
import AvatarComponent from "../content/AvatarComponent";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useOwnItemStore } from "@/stores/ownItemStore";

export default function MyAvatarList({
    faceData,
    hatData,
    hairData,
    topData,
    canvasRef,
}: {
    faceData: OwnItems[];
    hatData: OwnItems[];
    hairData: OwnItems[];
    topData: OwnItems[];
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
    const { avatarItemId, changeAvatarItemId, changeAvatarOwnId } =
        useOwnItemStore();

    const selectHandler = (
        type: "FACE" | "HAT" | "HAIR" | "TOP",
        id: number,
    ) => {
        changeAvatarItemId(type, id);
    };

    useEffect(() => {
        const selectedFace = faceData?.find((v) => v.used)?.itemId;
        const ownedFace = faceData?.find((v) => v.used)?.ownItemId;
        changeAvatarItemId("FACE", selectedFace || 21);
        changeAvatarOwnId("FACE", ownedFace || 0);
        const selectedHat = hatData?.find((v) => v.used)?.itemId;
        const ownedHat = hatData?.find((v) => v.used)?.ownItemId;
        changeAvatarItemId("HAT", selectedHat || 31);
        changeAvatarOwnId("HAT", ownedHat || 0);

        const selectedHair = hairData?.find((v) => v.used)?.itemId;
        const ownedHair = hairData?.find((v) => v.used)?.ownItemId;
        changeAvatarItemId("HAIR", selectedHair || 52);
        changeAvatarOwnId("HAIR", ownedHair || 0);

        const selectedTop = topData?.find((v) => v.used)?.itemId;
        const ownedTop = topData?.find((v) => v.used)?.ownItemId;
        changeAvatarItemId("TOP", selectedTop || 61);
        changeAvatarOwnId("TOP", ownedTop || 0);
    }, [
        faceData,
        hatData,
        hairData,
        topData,
        changeAvatarItemId,
        changeAvatarOwnId,
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const orderedIds = [
            avatarItemId.FACE,
            avatarItemId.HAIR,
            avatarItemId.HAT,
            avatarItemId.TOP,
        ];

        const imagePromises = orderedIds.map(
            (id) =>
                new Promise<HTMLImageElement>((res) => {
                    const img = new window.Image();
                    img.src = `/images/changeAvatars/${id}.png`;
                    img.onload = () => res(img);
                }),
        );

        Promise.all(imagePromises).then((images) => {
            context.clearRect(0, 0, 128, 128);
            images.forEach((img) => {
                context.drawImage(img, 0, 0, 128, 128);
            });
        });
    }, [avatarItemId, canvasRef]);

    return (
        <>
            <div className="mb-[90px]">
                <div className="relative mt-[-24px] mb-6 flex h-50 flex-col items-center justify-center bg-gradient-to-b from-[#EBEBEB] to-[#EFEFEF]">
                    <Image
                        src={`/images/changeAvatars/${avatarItemId.FACE}.png`}
                        alt="face"
                        width={128}
                        height={128}
                        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* 머리 */}
                    <Image
                        src={`/images/changeAvatars/${avatarItemId.HAIR}.png`}
                        alt="hair"
                        width={128}
                        height={128}
                        className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* 모자 */}
                    <Image
                        src={`/images/changeAvatars/${avatarItemId.HAT}.png`}
                        alt="hat"
                        width={128}
                        height={128}
                        className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* 옷 */}
                    <Image
                        src={`/images/changeAvatars/${avatarItemId.TOP}.png`}
                        alt="top"
                        width={128}
                        height={128}
                        className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
                    />
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
                                        selected={
                                            avatarItemId.FACE === v.itemId
                                        }
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
                                        selected={avatarItemId.HAT === v.itemId}
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
                                        selected={
                                            avatarItemId.HAIR === v.itemId
                                        }
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
                                        selected={avatarItemId.TOP === v.itemId}
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
