"use client";

import Image from "next/image";
import medal from "../../assets/images/medal.png";
import ToolTip from "../common/ToolTip";
import { useProfileStore } from "@/stores/memberStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { customAlert } from "@/utils/customAlert";

export default function ShopCard({ id }: { id: string }) {
    const { myInfo } = useAuthStore();
    const { data, fetch } = useProfileStore();
    const router = useRouter();

    useEffect(() => {
        if (myInfo && myInfo.id !== Number(id)) {
            customAlert({ message: "❗ 잘못된 경로의 접근입니다!" });
            router.replace("/");
        }
    }, [myInfo, id, router]);

    useEffect(() => {
        fetch(Number(id));
    }, [id, fetch]);

    return (
        <>
            <div className="flex flex-col p-5">
                <div className="mb-1.5 flex items-center">
                    <Image src={medal} alt="리워드" className="h-4.5 w-4.5" />
                    <h6 className="text-gray1000 mr-1">내 리워드</h6>
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
                <p className="text-gray1000 text-[26px] font-bold">
                    {data?.rewardPoints || 0}P
                </p>
            </div>
        </>
    );
}
