"use client";

import { Ghost } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";

export default function MyInfoCard() {
    const { myInfo } = useAuthStore();

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 pt-4 pb-12">
                <span className="not-only:bg-gray200 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <Image
                        src={
                            myInfo?.avatarInfo.avatarImage ||
                            "/images/avatarImgs/basic1.png"
                        }
                        alt="프로필"
                        className="h-12 w-12 object-fill"
                        fill
                    />
                    <span className="bg-gray700 absolute right-0 bottom-0 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full">
                        <Ghost size={16} className="text-white" />
                    </span>
                </span>
                <p className="text-gray1000 text-2xl font-bold">
                    {myInfo?.nickname}
                </p>
            </div>
        </>
    );
}
