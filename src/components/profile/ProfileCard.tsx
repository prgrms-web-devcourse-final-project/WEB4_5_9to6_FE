"use client";

import Image from "next/image";
import medal from "../../assets/images/medal.png";
import avatar from "../../assets/images/avatar.png";
import ToolTip from "../common/ToolTip";
import { useEffect, useState } from "react";
import { fetchMemeberInfo, fetchMemeberPage } from "@/api/member";

export default function ProfileCard({ id }: { id: string }) {
    const [user, setUser] = useState<MemberProfile | null>(null);
    const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await fetchMemeberPage(Number(id));
                setUser(data);
                const { data2 } = await fetchMemeberInfo(Number(id));
                setUserInfo(data2);
            } catch (e) {
                console.error(e);
            }
        };
        getProfile();
    }, [id]);

    return (
        <>
            <div className="flex w-full items-center justify-between p-6">
                <div className="flex flex-col gap-1">
                    <p className="text-gray1000 text-2xl font-bold">
                        {user?.nickname}
                    </p>
                    <p className="text-gray700 b2 mb-4">
                        가입된 스터디 {user?.userStudies.length}개
                    </p>
                    <div className="flex items-center gap-1">
                        <Image
                            src={medal}
                            alt="리워드"
                            className="h-auto w-6"
                        />
                        <h2 className="text-gray1000">{user?.rewardPoints}P</h2>
                        <ToolTip>
                            <h5 className="mb-1">❓ 이게 무엇인가요?</h5>
                            <span className="b2 whitespace-pre-line">
                                {`이것은 해당 플랫폼에서 
                                    사용할 수 있는 포인트에요!`}
                            </span>
                            <h5 className="mt-2 mb-1">
                                🤑 어떻게 얻을 수 있죠?
                            </h5>
                            <span className="b2 mb-1 whitespace-pre-line">
                                {`매일 출석 체크를 하거나
                                    스터디의 목표를 달성 해보세요!
                                    그리고.. 서바이벌 스터디를 우승하면
                                    많은 리워드가 지급된다는 소문이?`}
                            </span>
                            <h5 className="mt-2 mb-1">😋 어디서 사용하나요?</h5>
                            <span className="b2 mb-1 whitespace-pre-line">
                                {`리워드 상점에서 다양한 테마, 배경, 
                                    아바타 장식을 구매해 보세요!`}
                            </span>
                        </ToolTip>
                    </div>
                </div>
                <span className="bg-gray200 flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <Image
                        src={userInfo?.avatarImage || avatar}
                        alt="프로필"
                        className="h-15 w-15 object-fill"
                    />
                </span>
            </div>
        </>
    );
}
