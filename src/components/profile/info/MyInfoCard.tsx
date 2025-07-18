"use client";

import { Ghost } from "lucide-react";
import Image from "next/image";
import avatar from "../../../assets/images/avatar.png";
import { useEffect, useState } from "react";

export default function MyInfoCard({ data }: { data: MemberInfo }) {
    const [userInfo, setUserInfo] = useState<MemberInfo | null>(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                setUserInfo(data);
            } catch (e) {
                console.error(e);
            }
        };
        getProfile();
    }, [data]);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 pt-4 pb-12">
                <span className="not-only:bg-gray200 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <Image
                        src={userInfo?.avatarImage || avatar}
                        alt="프로필"
                        className="h-15 w-15 object-fill"
                    />
                    <span className="bg-gray700 absolute right-0 bottom-0 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full">
                        <Ghost size={16} className="text-white" />
                    </span>
                </span>
                <p className="text-gray1000 text-2xl font-bold">
                    {userInfo?.nickname}
                </p>
            </div>
        </>
    );
}
