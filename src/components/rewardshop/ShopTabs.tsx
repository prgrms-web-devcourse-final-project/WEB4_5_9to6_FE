"use client";

import { useEffect, useState } from "react";
import ShopTemaList from "./list/ShopTemaList";
import ShopRoomList from "./list/ShopRoomList";
import ShopAvatarList from "./list/ShopAvatarList";
import ChannelSlideBar from "../common/ChannelSlideBar";
import { useRewardItemStore } from "@/stores/rewardItemStore";
import { useOwnItemStore } from "@/stores/ownItemStore";
import ProfileTeamLoading from "../profile/theme/ProfileTeamLoading";

export default function ShopTabs() {
    const tabs = ["앱 테마", "스터디룸", "아바타"];
    const [isTab, setTab] = useState("앱 테마");
    const { fetchItems, groupedItems } = useRewardItemStore();
    const { fetchItemsOwn, groupedOwnItems } = useOwnItemStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            setIsLoading(true);
            await Promise.all([fetchItems(), fetchItemsOwn()]);
            setIsLoading(false);
        };

        fetchAll();
    }, [fetchItems, fetchItemsOwn]);

    if (isLoading) {
        return (
            <>
                <ProfileTeamLoading />
            </>
        );
    }

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
                    {isTab === "앱 테마" && groupedItems.THEME && (
                        <ShopTemaList
                            data={groupedItems.THEME}
                            ownData={groupedOwnItems.THEME}
                        />
                    )}
                    {isTab === "스터디룸" && groupedItems.BACKGROUND && (
                        <ShopRoomList
                            data={groupedItems.BACKGROUND}
                            ownData={groupedOwnItems.BACKGROUND}
                        />
                    )}
                    {isTab === "아바타" &&
                        groupedItems.FACE &&
                        groupedItems.HAT &&
                        groupedItems.HAIR &&
                        groupedItems.TOP && (
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
