"use client";

import { useState } from "react";
import ShopTemaList from "./list/ShopTemaList";
import ShopRoomList from "./list/ShopRoomList";
import ShopAvatarList from "./list/ShopAvatarList";
import ChannelSlideBar from "../common/ChannelSlideBar";
import { useGroupedItems } from "@/utils/useGroupedItems";
import { useGroupedOwnItems } from "@/utils/useGroupedOwnItems";

export default function ShopTabs() {
    const tabs = ["앱 테마", "스터디룸", "아바타"];
    const [isTab, setTab] = useState("앱 테마");
    const { groupedItems } = useGroupedItems();
    const { groupedOwnItems } = useGroupedOwnItems();

    return (
        <>
            <div className="relative">
                <ChannelSlideBar
                    channels={tabs}
                    channel={isTab}
                    setChannel={setTab}
                />

                <div
                    className="h-[calc(100vh-200px)] overflow-y-auto py-6"
                    style={{ scrollPaddingBottom: "200px" }}
                >
                    {isTab === "앱 테마" && (
                        <ShopTemaList
                            data={groupedItems.THEME}
                            ownData={groupedOwnItems.THEME}
                        />
                    )}
                    {isTab === "스터디룸" && (
                        <ShopRoomList
                            data={groupedItems.BACKGROUND}
                            ownData={groupedOwnItems.BACKGROUND}
                        />
                    )}
                    {isTab === "아바타" && (
                        <ShopAvatarList
                            faceData={groupedItems.FACE}
                            hatData={groupedItems.HAT}
                            hairData={groupedItems.HAIR}
                            topData={groupedItems.TOP}
                            ownData={[
                                ...(groupedOwnItems.FACE ?? []),
                                ...(groupedOwnItems.HAT ?? []),
                                ...(groupedOwnItems.HAIR ?? []),
                                ...(groupedOwnItems.TOP ?? []),
                            ]}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
