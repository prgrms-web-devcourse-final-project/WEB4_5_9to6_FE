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
        if (!data) fetch(Number(id));
    }, [id, data, fetch]);

    return (
        <>
            <div className="flex flex-col p-5">
                <div className="mb-1.5 flex items-center">
                    <Image src={medal} alt="리워드" className="h-4.5 w-4.5" />
                    <h6 className="text-gray1000 mr-1">내 리워드</h6>
                    <ToolTip>
                        <h5 className="mb-1">❓ 이게 무엇인가요?</h5>
                        <span className="b2 whitespace-pre-line">
                            {`이것은 해당 플랫폼에서 
                                사용할 수 있는 포인트에요!`}
                        </span>
                        <h5 className="mt-2 mb-1">🤑 어떻게 얻을 수 있죠?</h5>
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
                <p className="text-gray1000 text-[26px] font-bold">
                    {data?.rewardPoints || 0}P
                </p>
            </div>
        </>
    );
}
