"use client";
import ChannelSlideBar from "@/components/common/ChannelSlideBar";
import StudyHomeInfo from "@/components/studyHome/StudyHomeInfo";
import StudyUsers from "@/components/studyRecruit/StudyUsers";
import { useState } from "react";

export default function Page() {
    const [channel, setChannel] = useState("정보");
    return (
        <>
            <div className="mt-[62px]">
                <div className="min-h-screen min-w-[360px]">
                    {/* 채널(정보/팀원현황) */}
                    <ChannelSlideBar
                        channels={["정보", "팀원 현황"]}
                        channel={channel}
                        setChannel={setChannel}
                    />
                    {/* 정보 */}
                    {channel === "정보" && <StudyHomeInfo />}
                    {/* 팀원현황 */}
                    {channel === "팀원 현황" && <StudyUsers />}
                </div>
            </div>
        </>
    );
}
