"use client";

import { useEffect, useRef, useState } from "react";
import AppTemaList from "./list/AppTemaList";
import StudyRoomList from "./list/StudyRoomList";
import MyAvatarList from "./list/MyAvatarList";
import Button from "@/components/common/Button";
import ChannelSlideBar from "@/components/common/ChannelSlideBar";
import { useAuthStore } from "@/stores/authStore";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";
import { useOwnItemStore } from "@/stores/ownItemStore";
import { useMutation } from "@tanstack/react-query";
import { changeOwnItems, saveImage } from "@/api/item";

export default function ProfileTemaTabs({ id }: { id: string }) {
    const tabs = ["앱 테마", "스터디룸", "아바타"];
    const [isTab, setTab] = useState("앱 테마");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { myInfo } = useAuthStore();
    const router = useRouter();
    const {
        fetchItemsOwn,
        groupedOwnItems,
        ownId,
        ownName,
        avatarName,
        avatarState,
        avatarItemId,
        avatarOwnId,
    } = useOwnItemStore();

    const mutation = useMutation({
        mutationFn: async ({ ownItemId }: { ownItemId: number }) =>
            await changeOwnItems(ownItemId),
        onSuccess: async (response) => {
            await fetchItemsOwn();
            console.log(response);
        },
        onError(err) {
            console.log(err);
        },
    });

    useEffect(() => {
        if (myInfo && myInfo.id !== Number(id)) {
            customAlert({ message: "❗ 잘못된 경로의 접근입니다!" });
            router.replace("/");
        }
    }, [myInfo, id, router]);

    useEffect(() => {
        fetchItemsOwn();
    }, [fetchItemsOwn]);

    const clickHandler = async () => {
        if (avatarState) {
            const avatarIds = Object.values(avatarOwnId);
            const avatarChg = avatarIds.map((ownId) => changeOwnItems(ownId));
            try {
                const results = await Promise.all(avatarChg);
                await fetchItemsOwn();
                const isAllNull = results.every((res) => res === null);

                if (!isAllNull) {
                    console.log("변경된 이미지" + results[3].image);
                    customAlert({
                        message: "아바타가 적용되었습니다!",
                        linkLabel: "닫기",
                        onClick: () => {},
                    });
                    return;
                }

                const canvas = canvasRef.current;
                if (!canvas) return;

                canvas.toBlob(async (blob) => {
                    if (!blob) return;

                    const clothesRequest: Clothes = {
                        clothes: [
                            {
                                name: avatarName.FACE,
                                category: "FACE",
                                itemId: [avatarItemId.FACE],
                            },
                            {
                                name: avatarName.HAT,
                                category: "HAT",
                                itemId: [avatarItemId.HAT],
                            },
                            {
                                name: avatarName.HAIR,
                                category: "HAIR",
                                itemId: [avatarItemId.HAIR],
                            },
                            {
                                name: avatarName.TOP,
                                category: "TOP",
                                itemId: [avatarItemId.TOP],
                            },
                        ],
                    };

                    await saveImage(blob, clothesRequest);
                    const avatarIds = Object.values(avatarOwnId);
                    const avatarChg = avatarIds.map((ownId) =>
                        changeOwnItems(ownId),
                    );
                    const results = await Promise.all(avatarChg);

                    console.log("변경된 이미지" + results[3].image);

                    customAlert({
                        message: "새롭게 아바타가 적용되었습니다!",
                        linkLabel: "닫기",
                        onClick: () => {},
                    });
                }, "image/png");
            } catch (e) {
                console.error(e);
                customAlert({
                    message: "오류가 발생했습니다!\n다시 시도해주세요.",
                    linkLabel: "닫기",
                    onClick: () => {},
                });
            }
        } else {
            mutation.mutate({ ownItemId: ownId });
            customAlert({
                message: `${ownName}(을)를 적용했습니다!`,
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };

    return (
        <>
            <div className="relative">
                <ChannelSlideBar
                    channels={tabs}
                    channel={isTab}
                    setChannel={setTab}
                />

                <div
                    className="h-[calc(100vh-112px)] overflow-y-auto py-6"
                    style={{ scrollPaddingBottom: "62px" }}
                >
                    {isTab === "앱 테마" && (
                        <AppTemaList ownData={groupedOwnItems.THEME} />
                    )}
                    {isTab === "스터디룸" && (
                        <StudyRoomList ownData={groupedOwnItems.BACKGROUND} />
                    )}
                    {isTab === "아바타" && (
                        <MyAvatarList
                            faceData={groupedOwnItems.FACE}
                            hatData={groupedOwnItems.HAT}
                            hairData={groupedOwnItems.HAIR}
                            topData={groupedOwnItems.TOP}
                            canvasRef={canvasRef}
                        />
                    )}
                </div>
                <canvas
                    ref={canvasRef}
                    width={128}
                    height={128}
                    className="hidden"
                />
                <div className="absolute right-0 bottom-0 left-0 z-10 bg-white p-5">
                    <Button onClick={clickHandler}>적용하기</Button>
                </div>
            </div>
        </>
    );
}
