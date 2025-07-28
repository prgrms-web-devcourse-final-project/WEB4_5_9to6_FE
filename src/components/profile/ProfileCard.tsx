"use client";

import Image from "next/image";
import ToolTip from "../common/ToolTip";
import { useEffect } from "react";
import { useProfileStore } from "@/stores/memberStore";
import { getValidAvatar } from "@/utils/studyDataMap";

export default function ProfileCard({ id }: { id: string }) {
    const { data, data2, data3, memberId, fetch, loading } = useProfileStore();

    useEffect(() => {
        if (memberId !== Number(id)) fetch(Number(id));
        if (!data || !data2 || !data3) fetch(Number(id));
    }, [id, data, data2, data3, memberId, fetch]);

    useEffect(() => {
        if (data2?.avatarImage) {
            const fetchAvatarData = async () => {
                try {
                    fetch(Number(id));
                } catch (err) {
                    console.error(err);
                }
            };

            fetchAvatarData();
        }
    }, [data2?.avatarImage, fetch, id]);

    if (loading || !data || !data2 || !data3) {
        return (
            <div className="flex w-full animate-pulse items-center justify-between p-6">
                <div className="flex flex-col gap-1">
                    <div className="bg-gray200 h-6 w-32 rounded" />
                    <div className="bg-gray200 mb-4 h-4 w-40 rounded" />
                    <div className="bg-gray300 h-5 w-30 rounded" />
                </div>
                <span className="bg-gray300 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <div className="bg-gray200 h-12 w-12 rounded-full" />
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="flex w-full items-center justify-between p-6">
                <div className="flex flex-col gap-1">
                    <p className="text-gray1000 text-2xl font-bold">
                        {data?.nickname}
                    </p>
                    <p className="text-gray700 b2 mb-4">
                        가입된 스터디 {data?.joinedStudyCount}개
                    </p>
                    <div className="relative flex items-center gap-1">
                        <Image
                            src="/images/medal.png"
                            alt="리워드"
                            width={24}
                            height={24}
                            style={{ height: "auto" }}
                            priority
                        />
                        <h2 className="text-gray1000">
                            {data?.rewardPoints.toLocaleString() || 0}P
                        </h2>
                        <ToolTip>
                            <div className="c2 mb-4 whitespace-pre-line">
                                {`리워드는 출석체크와 주간 미션, 
                            그리고! 서바이벌 스터디를 통해 
                            리워드를 얻을 수 있어요! 🥰`}
                            </div>
                            <div className="c2 whitespace-pre-line">
                                {`획득한 리워드로 
                            아바타와 앱 테마, 스터디 배경을 꾸며보세요!`}
                            </div>
                        </ToolTip>
                    </div>
                </div>
                <span className="bg-gray200 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <Image
                        src={getValidAvatar(data2?.avatarImage)}
                        alt="프로필"
                        className="h-12 w-12 object-fill p-3"
                        sizes="48px"
                        fill
                    />
                </span>
            </div>
        </>
    );
}
