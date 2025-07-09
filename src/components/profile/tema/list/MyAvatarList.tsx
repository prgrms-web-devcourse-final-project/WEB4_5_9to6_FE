"use client";

import { useState } from "react";
import AvatarComponent from "../content/AvatarComponent";
import Image from "next/image";
import avatarImg from "../../../../assets/images/avatar.png";

export default function MyAvatarList() {
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
            <div className="mb-[90px]">
                <div className="mt-[-24px] mb-6 flex h-[150px] flex-col items-center justify-center bg-gradient-to-b from-[#EBEBEB] to-[#EFEFEF]">
                    <Image
                        src={avatarImg}
                        alt="내 아바타"
                        className="h-18 w-18"
                    />
                    <p className="b2 text-gray700 mt-[10px]">내 아바타</p>
                </div>
                <div className="mx-5 flex flex-col gap-6">
                    <div>
                        <h6 className="text-gray1000 mb-[10px]">얼굴</h6>
                        <div className="overflow-x-auto">
                            <div className="flex w-max gap-2">
                                {["평범", "웃음", "무표정", "안경", "초롱"].map(
                                    (v, i) => (
                                        <AvatarComponent
                                            key={v}
                                            name={v}
                                            part="face"
                                            index={i}
                                            selected={avatar.face === i}
                                            avatarHandler={() =>
                                                avatarHandler("face", i)
                                            }
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-gray1000 mb-[10px]">모자</h6>
                        <div className="overflow-x-auto">
                            <div className="flex w-max gap-2">
                                {[
                                    "리본",
                                    "끈리본",
                                    "학사모",
                                    "둥근모",
                                    "사각모",
                                    "스냅백",
                                    "월계관",
                                    "금계관",
                                    "개나리",
                                    "토끼귀",
                                ].map((v, i) => (
                                    <AvatarComponent
                                        key={v}
                                        name={v}
                                        part="hat"
                                        index={i}
                                        selected={avatar.hat === i}
                                        avatarHandler={() =>
                                            avatarHandler("hat", i)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-gray1000 mb-[10px]">머리</h6>
                        <div className="overflow-x-auto">
                            <div className="flex w-max gap-2">
                                {[
                                    "반듯한",
                                    "단발",
                                    "투블럭",
                                    "긴머리",
                                    "헤어컬",
                                    "양머리",
                                    "한묶음",
                                    "두묶음",
                                    "대머리",
                                ].map((v, i) => (
                                    <AvatarComponent
                                        key={v}
                                        name={v}
                                        part="hair"
                                        index={i}
                                        selected={avatar.hair === i}
                                        avatarHandler={() =>
                                            avatarHandler("hair", i)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-gray1000 mb-[10px]">의상</h6>
                        <div className="overflow-x-auto">
                            <div className="flex w-max gap-2">
                                {["남자", "여자"].map((v, i) => (
                                    <AvatarComponent
                                        key={v}
                                        name={v}
                                        part="basic"
                                        index={i}
                                        selected={avatar.clothes === i}
                                        avatarHandler={() =>
                                            avatarHandler("clothes", i)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
