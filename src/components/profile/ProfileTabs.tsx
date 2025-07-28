"use client";

import { useEffect, useState } from "react";
import MyStudyList from "./MyStudyList";
import MyLogList from "./MyLogList";
import ChannelSlideBar from "../common/ChannelSlideBar";
import { useProfileStore } from "@/stores/memberStore";
import StudyCardSkeleton from "../common/StudyCardSkeleton";

export default function ProfileTabs({ id }: { id: string }) {
    const { data, loading } = useProfileStore();
    const tabs = [`내 스터디 ${data?.joinedStudyCount}`, "활동로그"];
    const [isTab, setTab] = useState<string>("");

    useEffect(() => {
        if (data) {
            setTab(`내 스터디 ${data?.joinedStudyCount}`);
        }
    }, [data]);

    if (!isTab || !data) return null;

    if (loading) {
        return (
            <>
                <div className="relative mt-0.5 flex h-[50px] w-full items-center justify-center gap-4 px-5">
                    <div className="flex w-full justify-center">
                        <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                            <h5 className="text-gray1000 whitespace-nowrap">
                                내 스터디
                            </h5>
                        </button>
                    </div>
                    <div className="flex w-full justify-center">
                        <button className="relative flex h-full w-[calc(50%-8px)] items-center justify-center">
                            <h5 className="text-gray1000 whitespace-nowrap">
                                활동로그
                            </h5>
                        </button>
                    </div>
                    <div className="border-b-gray400 absolute right-5 bottom-0 left-5 border-b">
                        <div className="bg-gray1000 h-[2px] w-[calc(50%-8px)]" />
                    </div>
                </div>
                <div className="max-h-[calc(100vh-330px)] overflow-y-auto px-5 py-6">
                    <StudyCardSkeleton />
                    <StudyCardSkeleton />
                </div>
            </>
        );
    }

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
                {isTab === "활동로그" && <MyLogList id={id} />}
            </div>
        </>
    );
}
