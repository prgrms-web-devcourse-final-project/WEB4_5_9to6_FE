"use client";

import { Ghost } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { customAlert } from "@/utils/customAlert";
import { getValidAvatar } from "@/utils/studyDataMap";
import { useOwnItemStore } from "@/stores/ownItemStore";

export default function MyInfoCard({ id }: { id: string }) {
    const { myInfo, refetch } = useAuthStore();
    const { resetItemsOwn } = useOwnItemStore();
    const router = useRouter();

    useEffect(() => {
        if (myInfo && myInfo.id !== Number(id)) {
            customAlert({ message: "❗ 잘못된 경로의 접근입니다!" });
            router.replace("/");
        }
    }, [myInfo, id, router]);

    useEffect(() => {
        if (myInfo?.avatarInfo.avatarImage) {
            const fetchAvatarData = async () => {
                try {
                    refetch();
                    resetItemsOwn();
                } catch (err) {
                    console.error(err);
                }
            };

            fetchAvatarData();
        }
    }, [myInfo?.avatarInfo.avatarImage, refetch, resetItemsOwn]);

    const isLoading =
        !myInfo || !myInfo.avatarInfo || !myInfo.avatarInfo.avatarImage;

    if (isLoading) {
        return (
            <div className="flex animate-pulse flex-col items-center justify-center gap-5 pt-4 pb-12">
                <div className="bg-gray300 dark:bg-gray800 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <div className="bg-gray200 dark:bg-gray700 h-12 w-12 rounded-full" />
                </div>
                <div className="bg-gray200 dark:bg-gray700 h-6 w-26 rounded-2xl font-bold"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 pt-4 pb-12">
                <span className="dark:bg-gray900 bg-gray200 relative flex h-26 w-26 items-center justify-center rounded-[40px]">
                    <Image
                        src={getValidAvatar(myInfo?.avatarInfo.avatarImage)}
                        alt="프로필"
                        className="h-12 w-12 object-fill p-3"
                        sizes="48px"
                        fill
                    />
                    <span
                        onClick={() => router.push(`/profile/${id}/theme`)}
                        className="bg-gray700 absolute right-0 bottom-0 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full dark:border-2 dark:border-[#222222] dark:bg-[#454545]"
                    >
                        <Ghost size={16} className="text-white" />
                    </span>
                </span>
                <p className="text-gray1000 text-2xl font-bold dark:text-white">
                    {myInfo?.nickname}
                </p>
            </div>
        </>
    );
}
