"use client";

import { useEffect, useState } from "react";
import AppTemaList from "./list/AppTemaList";
import StudyRoomList from "./list/StudyRoomList";
import MyAvatarList from "./list/MyAvatarList";
import Button from "@/components/common/Button";
import ChannelSlideBar from "@/components/common/ChannelSlideBar";
import { useAuthStore } from "@/stores/authStore";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";

export default function ProfileTemaTabs({ id }: { id: string }) {
    const tabs = ["앱 테마", "스터디룸", "아바타"];
    const [isTab, setTab] = useState("앱 테마");
    const { myInfo } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (myInfo && myInfo.id !== Number(id)) {
            customAlert({ message: "❗ 잘못된 경로의 접근입니다!" });
            router.replace("/");
        }
    }, [myInfo, id, router]);

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
                    {isTab === "앱 테마" && <AppTemaList />}
                    {isTab === "스터디룸" && <StudyRoomList />}
                    {isTab === "아바타" && <MyAvatarList />}
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-10 bg-white p-5">
                    <Button>적용하기</Button>
                </div>
            </div>
        </>
    );
}
