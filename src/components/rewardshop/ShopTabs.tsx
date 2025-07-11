"use client";

import { useState } from "react";
import { useShopModalStore } from "@/stores/shopModalStore";
import ShopTemaList from "./list/ShopTemaList";
import ShopRoomList from "./list/ShopRoomList";
import ShopAvatarList from "./list/ShopAvatarList";

export default function ShopTabs() {
    const [isTab, setTab] = useState<"app" | "room" | "avatar">("app");
    const { typeChange } = useShopModalStore();

    return (
        <>
            <div className="relative">
                <div className="border-b-gray500 flex gap-4 border-b px-5">
                    <div
                        onClick={() => {
                            setTab("app");
                            typeChange("app");
                        }}
                        className={`${isTab === "app" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                    >
                        <h5>앱 테마</h5>
                    </div>
                    <div
                        onClick={() => {
                            setTab("room");
                            typeChange("room");
                        }}
                        className={`${isTab === "room" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                    >
                        <h5>스터디룸</h5>
                    </div>
                    <div
                        onClick={() => {
                            setTab("avatar");
                            typeChange("avatar");
                        }}
                        className={`${isTab === "avatar" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                    >
                        <h5>아바타</h5>
                    </div>
                </div>

                <div
                    className="h-[calc(100vh-184px)] overflow-y-auto py-6"
                    style={{ scrollPaddingBottom: "134px" }}
                >
                    {isTab === "app" && <ShopTemaList />}
                    {isTab === "room" && <ShopRoomList />}
                    {isTab === "avatar" && <ShopAvatarList />}
                </div>
            </div>
        </>
    );
}
