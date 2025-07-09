"use client";

import { useState } from "react";
import AppTemaList from "./AppTemaList";
import StudyRoomList from "./StudyRoomList";
import MyAvatarList from "./MyAvatarList";

export default function ProfileTemaTabs() {
    const [isTab, setTab] = useState<"app" | "room" | "avatar">("app");
    return (
        <>
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

            {isTab == "app" && <AppTemaList />}
            {isTab == "room" && <StudyRoomList />}
            {isTab == "avatar" && <MyAvatarList />}
        </>
    );
}
