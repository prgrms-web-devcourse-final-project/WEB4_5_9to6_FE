"use client";

import { useState } from "react";
import MyStudyList from "./MyStudyList";
import MyLogList from "./MyLogList";
import ChannelSlideBar from "../common/ChannelSlideBar";

export default function ProfileTabs() {
    const myStudyLength = 3;
    const tabs = [`내 스터디 ${myStudyLength}`, "활동로그"];
    const [isTab, setTab] = useState(`내 스터디 ${myStudyLength}`);
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
                {isTab === `내 스터디 ${myStudyLength}` && <MyStudyList />}
                {isTab === "활동로그" && <MyLogList />}
            </div>
        </>
    );
}
