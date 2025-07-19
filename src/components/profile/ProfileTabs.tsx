"use client";

import { useEffect, useState } from "react";
import MyStudyList from "./MyStudyList";
import MyLogList from "./MyLogList";
import ChannelSlideBar from "../common/ChannelSlideBar";
import { useProfileStore } from "@/stores/memberStore";

export default function ProfileTabs() {
    const { data } = useProfileStore();
    const tabs = [`내 스터디 ${data?.joinedStudyCount}`, "활동로그"];
    const [isTab, setTab] = useState<string>("");

    useEffect(() => {
        if (data) {
            setTab(`내 스터디 ${data?.joinedStudyCount}`);
        }
    }, [data]);

    if (!data || !isTab) return null;

    return (
        <>
            <ChannelSlideBar
                channels={tabs}
                channel={isTab}
                setChannel={setTab}
            />
            <div
                className="max-h-[calc(100vh-330px)] overflow-y-auto px-5 py-6"
                style={{ scrollPaddingBottom: "136px" }}
            >
                {isTab === `내 스터디 ${data?.joinedStudyCount || 0}` && (
                    <MyStudyList />
                )}
                {isTab === "활동로그" && <MyLogList />}
            </div>
        </>
    );
}
