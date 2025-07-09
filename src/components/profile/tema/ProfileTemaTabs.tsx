"use client";

import { useState } from "react";
import AppTemaList from "./list/AppTemaList";
import StudyRoomList from "./list/StudyRoomList";
import MyAvatarList from "./list/MyAvatarList";
import Button from "@/components/common/Button";

export default function ProfileTemaTabs() {
    const [isTab, setTab] = useState<"app" | "room" | "avatar">("app");
    return (
        <>
            <div className="relative">
                <div className="border-b-gray500 flex gap-4 border-b px-5">
                    <div
                        onClick={() => setTab("app")}
                        className={`${isTab === "app" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                    >
                        <h5>앱 테마</h5>
                    </div>
                    <div
                        onClick={() => setTab("room")}
                        className={`${isTab === "room" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                    >
                        <h5>스터디룸</h5>
                    </div>
                    <div
                        onClick={() => setTab("avatar")}
                        className={`${isTab === "avatar" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                    >
                        <h5>아바타</h5>
                    </div>
                </div>

                <div
                    className="h-[calc(100vh-50px)] overflow-y-auto px-5 py-6"
                    style={{ scrollPaddingBottom: "120px" }}
                >
                    {isTab === "app" && <AppTemaList />}
                    {isTab === "room" && <StudyRoomList />}
                    {isTab === "avatar" && <MyAvatarList />}
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-10 bg-white p-5">
                    <Button>적용하기</Button>
                </div>
            </div>
        </>
    );
}
