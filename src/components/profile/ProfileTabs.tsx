"use client";

import { useState } from "react";
import MyStudyList from "./MyStudyList";
import MyLogList from "./MyLogList";

export default function ProfileTabs() {
    const [isTab, setTab] = useState<"study" | "log">("study");
    return (
        <>
            <div className="border-b-gray500 flex gap-4 border-b px-5">
                <div
                    onClick={() => setTab("study")}
                    className={`${isTab === "study" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                >
                    <h5>내 스터디 3</h5>
                </div>
                <div
                    onClick={() => setTab("log")}
                    className={`${isTab === "log" ? "text-gray1000 border-b-gray1000 border-b-2" : "text-gray500"} tabChoose`}
                >
                    <h5>활동로그</h5>
                </div>
            </div>
            <div
                className="max-h-[calc(100vh-330px)] overflow-y-auto px-5 py-6"
                style={{ scrollPaddingBottom: "136px" }}
            >
                {isTab === "study" && <MyStudyList />}
                {isTab === "log" && <MyLogList />}
            </div>
        </>
    );
}
